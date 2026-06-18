export const meta = {
  name: 'implement-all-plans',
  description: 'Implement every plan in thoughts/shared/plans in dependency order and verify the build',
  phases: [
    { title: 'Summarize plans', detail: 'Read each plan and extract structured scope/dependencies' },
    { title: 'Implement in dependency order', detail: 'Topologically sort plans and implement one wave at a time' },
    { title: 'Final build and verify', detail: 'Install dependencies, build, lint, and report status' },
  ],
}

const SUMMARY_SCHEMA = {
  type: 'object',
  properties: {
    ticketId: { type: 'string', description: 'Ticket ID, e.g. TICKET-001' },
    title: { type: 'string' },
    newFiles: { type: 'array', items: { type: 'string' }, description: 'Exact relative file paths the plan says to create' },
    modifiedFiles: { type: 'array', items: { type: 'string' }, description: 'Exact relative file paths the plan says to modify' },
    hardPrerequisites: { type: 'array', items: { type: 'string' }, description: 'Ticket IDs that must be implemented first' },
    softPrerequisites: { type: 'array', items: { type: 'string' }, description: 'Ticket IDs that are nice to have first but not blocking' },
    createsSharedComponents: { type: 'boolean', description: 'Does the plan create components used by other tickets?' },
    estimatedEffort: { type: 'string', enum: ['small', 'medium', 'large'] },
    notes: { type: 'string' },
  },
  required: [
    'ticketId',
    'title',
    'newFiles',
    'modifiedFiles',
    'hardPrerequisites',
    'softPrerequisites',
    'createsSharedComponents',
    'estimatedEffort',
  ],
  additionalProperties: false,
}

function extractTicketRefs(arr) {
  const refs = new Set()
  for (const text of arr || []) {
    const matches = text.match(/TICKET-\d+/g)
    if (matches) matches.forEach((m) => refs.add(m))
  }
  return Array.from(refs)
}

function sortTopologically(summaries, planFiles) {
  const byId = new Map()
  for (const s of summaries) byId.set(s.ticketId, s)

  const fileById = new Map()
  for (const path of planFiles) {
    const match = path.match(/(TICKET-\d+)/)
    if (match) fileById.set(match[1], path)
  }

  const visited = new Set()
  const ordered = []

  function visit(id, stack) {
    if (stack.has(id)) return
    if (visited.has(id)) return
    stack.add(id)
    const s = byId.get(id)
    if (s) {
      const deps = extractTicketRefs([...(s.hardPrerequisites || []), ...(s.softPrerequisites || [])])
      for (const dep of deps) {
        if (dep !== id) visit(dep, stack)
      }
    }
    stack.delete(id)
    visited.add(id)
    if (s) ordered.push(s)
  }

  for (const s of summaries) visit(s.ticketId, new Set())
  return { ordered, fileById }
}

phase('Summarize plans')
const planFiles = args.planFiles
const designDocs = args.designDocs
const repoRoot = args.repoRoot

log(`Summarizing ${planFiles.length} plans...`)

const summaries = await parallel(
  planFiles.map((path) => async () => {
    const absPath = `${repoRoot}/${path}`
    return agent(
      `Read the implementation plan at ${absPath}. Also read the design docs at ${designDocs.join(', ')} so you understand the visual/brand constraints. ` +
        `Return a structured summary of the plan: ticket ID, title, exact new files to create, files to modify, hard prerequisites, soft prerequisites, ` +
        `whether it creates shared components, estimated effort (small/medium/large), and any notes. ` +
        `Extract ticket IDs like TICKET-001 from prerequisite text. Do not edit any files.`,
      { label: `summarize:${path}`, schema: SUMMARY_SCHEMA }
    )
  })
)

const validSummaries = summaries.filter(Boolean)
log(`Received ${validSummaries.length} summaries`)

phase('Implement in dependency order')
const { ordered, fileById } = sortTopologically(validSummaries, planFiles)

log(`Implementation order: ${ordered.map((s) => s.ticketId).join(' -> ')}`)

for (const plan of ordered) {
  const planFile = fileById.get(plan.ticketId)
  if (!planFile) {
    log(`Could not find plan file for ${plan.ticketId}; skipping`)
    continue
  }
  const absPath = `${repoRoot}/${planFile}`
  log(`Implementing ${plan.ticketId}: ${plan.title}`)
  await agent(
    `Implement the plan at ${absPath} completely and correctly. ` +
      `Read the plan itself, the design docs at ${designDocs.join(', ')}, and any existing code in ${repoRoot}. ` +
      `This ticket is being implemented in dependency order, so its prerequisites should already exist. ` +
      `Create every new file listed in the plan, modify existing files exactly as specified, and match the component/file conventions in the codebase. ` +
      `If a prerequisite is genuinely missing or you are blocked on a non-code issue, report the blocker clearly and stop. ` +
      `Do not run npm install or long builds here. Report the files you created or modified.`,
    { label: `implement:${plan.ticketId}` }
  )
}

phase('Final build and verify')
await agent(
  `In ${repoRoot}, run the following and report the results: ` +
    `1) npm install if node_modules is missing, ` +
    `2) npm run build, ` +
    `3) npm run lint if available, ` +
    `4) tsc --noEmit if tsconfig.json exists. ` +
    `Fix any critical build errors that prevent static export. Report the final build status, any remaining warnings, and the list of generated dist/out files.`,
  { label: 'verify:build' }
)

log('Workflow complete')
