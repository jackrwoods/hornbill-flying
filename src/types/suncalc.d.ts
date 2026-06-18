declare module "suncalc" {
  export interface GetTimesResult {
    sunrise: Date;
    sunset: Date;
    dawn: Date;
    dusk: Date;
    solarNoon: Date;
    nadir: Date;
    nightEnd: Date;
    night: Date;
    goldenHourEnd: Date;
    goldenHour: Date;
  }

  export function getTimes(
    date: Date,
    latitude: number,
    longitude: number
  ): GetTimesResult;
}
