import { WorldClock } from "./app.ts";
/** Animate the increase or decrease of the scene darkness level in the syncDarkness setting is enabled */
export declare function animateDarkness(this: WorldClock, timeDiff: number): Promise<void>;
