import { StrikeAttackTraits } from "@actor/creature/helpers.ts";
import { ModifierPF2e } from "@actor/modifiers.ts";
import { ArmorPF2e, WeaponPF2e } from "@item";
import { ItemCarryType } from "@item/physical/index.ts";
import { ZeroToThree, ZeroToTwo } from "@module/data.ts";
import { ActorPF2e } from "@module/documents.ts";
import { SheetOptions } from "@module/sheet/helpers.ts";
import type { CharacterPF2e } from "./document.ts";
/** Handle weapon traits that introduce modifiers or add other weapon traits */
declare class PCStrikeAttackTraits extends StrikeAttackTraits {
    static adjustWeapon(weapon: WeaponPF2e): void;
    static createAttackModifiers({ weapon, domains }: CreateAttackModifiersParams): ModifierPF2e[];
}
interface AuxiliaryInteractParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "Interact";
    purpose: "Draw" | "Grip" | "Modular" | "PickUp" | "Retrieve" | "Sheathe";
    hands?: ZeroToTwo;
}
interface AuxiliaryReleaseParams {
    weapon: WeaponPF2e<CharacterPF2e>;
    action: "Release";
    purpose: "Grip" | "Drop";
    hands: 0 | 1;
}
type AuxiliaryActionParams = AuxiliaryInteractParams | AuxiliaryReleaseParams;
type AuxiliaryActionPurpose = AuxiliaryActionParams["purpose"];
/** Create an "auxiliary" action, an Interact or Release action using a weapon */
declare class WeaponAuxiliaryAction {
    readonly weapon: WeaponPF2e<CharacterPF2e>;
    readonly action: "Interact" | "Release";
    readonly actions: ZeroToThree;
    readonly carryType: ItemCarryType | null;
    readonly hands: ZeroToThree | null;
    readonly purpose: AuxiliaryActionPurpose;
    /** A "full purpose" reflects the options to draw, sheathe, etc. a weapon */
    readonly fullPurpose: string;
    constructor({ weapon, action, purpose, hands }: AuxiliaryActionParams);
    get actor(): CharacterPF2e;
    get label(): string;
    get glyph(): string;
    get options(): SheetOptions | null;
    execute({ selection }?: {
        selection?: string | null;
    }): Promise<void>;
}
/** Make a PC Clumsy 1 when wielding an oversized weapon */
declare function imposeOversizedWeaponCondition(actor: CharacterPF2e): void;
interface CreateAttackModifiersParams {
    weapon: WeaponPF2e;
    domains: string[];
}
/** Create a penalty for attempting to Force Open without a crowbar or equivalent tool */
declare function createForceOpenPenalty(actor: CharacterPF2e, domains: string[]): ModifierPF2e;
declare function createShoddyPenalty(actor: ActorPF2e, item: WeaponPF2e | ArmorPF2e | null, domains: string[]): ModifierPF2e | null;
/**
 * Create a penalty for wearing armor with the "ponderous" trait
 * "You take a –5 penalty to all your Speeds (to a minimum of a 5-foot Speed). This is separate from and in addition to
 * the armor's Speed penalty, and affects you even if your Strength or an ability lets you reduce or ignore the armor's
 * Speed penalty."
 */
declare function createHinderingPenalty(actor: CharacterPF2e): ModifierPF2e | null;
/**
 * Create a penalty for wearing armor with the "ponderous" trait
 * "While wearing the armor, you take a –1 penalty to initiative checks. If you don't meet the armor's required Strength
 * score, this penalty increases to be equal to the armor's check penalty if it's worse."
 */
declare function createPonderousPenalty(actor: CharacterPF2e): ModifierPF2e | null;
export { PCStrikeAttackTraits, WeaponAuxiliaryAction, createForceOpenPenalty, createHinderingPenalty, createPonderousPenalty, createShoddyPenalty, imposeOversizedWeaponCondition, };
