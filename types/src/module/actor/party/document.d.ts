import { ActorPF2e, CharacterPF2e } from "@actor";
import { PartyData } from "./data";
declare class PartyPF2e extends ActorPF2e {
    /** Friendship lives in our hearts */
    get canAct(): false;
    get members(): (CharacterPF2e | null)[];
    /** Our bond is unbreakable */
    isAffectedBy(): false;
}
interface PartyPF2e extends ActorPF2e {
    readonly data: PartyData;
}
export { PartyPF2e };
