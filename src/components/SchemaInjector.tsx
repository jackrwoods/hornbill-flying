interface SchemaInjectorProps {
  schema: Record<string, unknown>;
  id?: string;
}

/**
 * Renders a JSON-LD script tag. Pass a single schema object (use
 * buildSchemaGraph from @/lib/schema to combine multiple entities).
 */
export function SchemaInjector({ schema, id }: SchemaInjectorProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
