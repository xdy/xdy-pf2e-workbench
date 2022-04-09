import { DateTime, HourNumbers, MinuteNumbers, SecondNumbers } from "luxon";
declare enum TimeChangeMode {
    ADVANCE = 0,
    RETRACT = 1
}
declare class TimeOfDay {
    readonly hour: HourNumbers;
    readonly minute: MinuteNumbers;
    readonly second: SecondNumbers;
    constructor(hour: HourNumbers, minute: MinuteNumbers, second: SecondNumbers);
    static DAWN: TimeOfDay;
    static NOON: TimeOfDay;
    static DUSK: TimeOfDay;
    static MIDNIGHT: TimeOfDay;
    /**
     * Returns positive or negative number of seconds to add to current
     * game time advance function https://foundryvtt.com/api/GameTime.html#advance
     * @param worldTime the current time as luxon DateTime
     * @param mode whether to go back to that point in time or to advance
     */
    diffSeconds(worldTime: DateTime, mode: TimeChangeMode): number;
    private static diffDays;
}
export { TimeChangeMode, TimeOfDay };
