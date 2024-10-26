/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="jquery" resolution-mode="require"/>
/// <reference types="tooltipster" />
import { DateTime } from "luxon";
import { animateDarkness } from "./animate-darkness.ts";

interface WorldClockData {
    date: string;
    time: string;
    options?: object;
    user: User;
    sign: "+" | "-";
}
export declare class WorldClock extends Application {
    /** Is the ctrl key currently held down? */
    private ctrlKeyDown;
    readonly animateDarkness: typeof animateDarkness;
    constructor();
    /** Setting: the date theme (Imperial Calendar not yet supported) */
    get dateTheme(): "AR" | "IC" | "AD" | "CE";
    /** Setting: display either a 24-hour or 12-hour clock */
    get timeConvention(): 24 | 12;
    /** Setting: whether to keep the scene's darkness level synchronized with the world time */
    get syncDarkness(): boolean;
    /** Setting: Date and time of the Foundry world's creation date */
    get worldCreatedOn(): DateTime;
    /** The current date and time of the game world */
    get worldTime(): DateTime;
    static get defaultOptions(): ApplicationOptions;
    /** The era in the game */
    private get era();
    /** The year in the game */
    private get year();
    /** The month in the game */
    private get month();
    /** The day of the week in the game */
    private get weekday();
    getData(options?: ApplicationOptions): WorldClockData;
    protected _getHeaderButtons(): ApplicationHeaderButton[];
    private static calculateIncrement;
    /** Advance the world time by a static or input value */
    activateListeners($html: JQuery): void;
    close(options?: {
        force?: boolean;
    }): Promise<void>;
    /** Create a message informing the user that scene darkness is synced to world time */
    static createSyncedMessage(): HTMLSpanElement;
}
export {};
