import { ActorPF2e, PartyPF2e } from "@actor";
export declare class ActorsPF2e<TActor extends ActorPF2e<null>> extends Actors<TActor> {
    /** The world's active party, if one exists */
    get party(): PartyPF2e<null> | null;
    /** Overrwriten to omit actors in parties, which are rendered separately */
    _getVisibleTreeContents(): TActor[];
}
