import { ABCItemPF2e } from "../abc";
import { BackgroundData } from "./data";
export declare class BackgroundPF2e extends ABCItemPF2e {
    static get schema(): typeof BackgroundData;
    /** Set a skill feat granted by a GrantItem RE as one of this background's configured items */
    prepareSiblingData(this: Embedded<BackgroundPF2e>): void;
    prepareActorData(this: Embedded<BackgroundPF2e>): void;
}
export interface BackgroundPF2e {
    readonly data: BackgroundData;
}
