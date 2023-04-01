import { ActorPF2e, CharacterPF2e } from "@actor";
import { TokenDocumentPF2e } from "@scene";
import { PartySource, PartySystemData } from "./data";
declare class PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    /** Friendship lives in our hearts */
    get canAct(): false;
    get members(): (CharacterPF2e | null)[];
    /** Our bond is unbreakable */
    isAffectedBy(): false;
}
interface PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: PartySource;
    readonly abilities?: never;
    system: PartySystemData;
}
export { PartyPF2e };
