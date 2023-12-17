/** Implementation of travel speed https://2e.aonprd.com/Rules.aspx?ID=470 */
export interface ExplorationOptions {
    practicedDefender: boolean;
    swiftSneak: boolean;
    legendarySneak: boolean;
    expeditiousSearch: boolean;
    expeditiousSearchLegendary: boolean;
}
/**
 * Travel speed can be affected by limiting exploration activities:
 *
 * Maximum feet speed:
 * * Detect Magic https://2e.aonprd.com/Actions.aspx?ID=513
 * * Search https://2e.aonprd.com/Actions.aspx?ID=519
 * Half speed:
 * * Search https://2e.aonprd.com/Actions.aspx?ID=519
 * * Cover Tracks https://2e.aonprd.com/Actions.aspx?ID=65
 * * Repeat a Spell https://2e.aonprd.com/Actions.aspx?ID=517
 * * Defend https://2e.aonprd.com/Actions.aspx?ID=512
 * * Scout https://2e.aonprd.com/Actions.aspx?ID=518
 * * Track https://2e.aonprd.com/Actions.aspx?ID=66
 * * Avoid Notice https://2e.aonprd.com/Actions.aspx?ID=511
 *
 * Feats that increase speed:
 * * Swift Sneak https://2e.aonprd.com/Feats.aspx?ID=850
 * * Legendary Sneak https://2e.aonprd.com/Feats.aspx?ID=807
 * * Expeditious Search https://2e.aonprd.com/Feats.aspx?ID=777
 * * Practiced Defender https://2e.aonprd.com/Feats.aspx?ID=2257
 *
 * Note: Hustle https://2e.aonprd.com/Actions.aspx?ID=515 does not
 * give you any information in what time frame this works and
 * hexploration specifically excludes hustling from overland
 * travel https://2e.aonprd.com/Rules.aspx?ID=1275
 */
export declare enum ExplorationActivities {
    NONE = 0,
    HALF_SPEED = 1,
    AVOID_NOTICE = 2,
    DEFEND = 3,
    DETECT_MAGIC = 4,
    SCOUT = 5,
    SEARCH = 6
}
export declare enum DetectionMode {
    NONE = 0,
    DETECT_EVERYTHING = 1,
    DETECT_BEFORE_WALKING_INTO_IT = 2
}
interface Fraction {
    numerator: number;
    denominator: number;
}
export declare function calculateNormalizedCharacterSpeed(defaultSpeedInFeet: number, activity: ExplorationActivities, detectionMode: DetectionMode, explorationOptions: ExplorationOptions): number;
export declare enum LengthUnit {
    MILES = 0,
    FEET = 1
}
export interface Distance {
    value: number;
    unit: LengthUnit;
}
export declare enum TimeUnit {
    MINUTE = 0,
    HOUR = 1
}
interface Velocity {
    distance: Distance;
    time: TimeUnit;
}
declare function speedToVelocity(speedInFeet: number): Velocity;
export declare enum Terrain {
    NORMAL = 0,
    DIFFICULT = 1,
    GREATER_DIFFICULT = 2
}
export interface TerrainSlowdown {
    normal: Fraction;
    difficult: Fraction;
    greaterDifficult: Fraction;
}
export interface Trip {
    terrain: Terrain;
    distance: Distance;
    terrainSlowdown: TerrainSlowdown;
}
export interface TravelDuration {
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
}
declare function calculateTravelDuration({ journey, velocity, hustleDurationInMinutes, hoursPerDay, }: {
    journey: Trip[];
    velocity: Velocity;
    hustleDurationInMinutes?: number;
    hoursPerDay?: number;
}): TravelDuration;
export { calculateTravelDuration, speedToVelocity };
export type { Fraction, Velocity };
