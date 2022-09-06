import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
export declare class FakeItem {
    options: DocumentConstructionContext<ItemPF2e>;
    _data: ItemSourcePF2e;
    parent: ActorPF2e | null;
    constructor(data: ItemSourcePF2e, options?: DocumentConstructionContext<ItemPF2e>);
    get id(): string;
    get data(): import("../../src/module/item/ancestry/data").AncestrySource | import("../../src/module/item/background/data").BackgroundSource | import("../../src/module/item/class/data").ClassSource | import("../../src/module/item/armor/data").ArmorSource | import("../../src/module/item/book/data").BookSource | import("../../src/module/item/consumable/data").ConsumableSource | import("../../src/module/item/container/data").ContainerSource | import("../../src/module/item/equipment/data").EquipmentSource | import("../../src/module/item/treasure/data").TreasureSource | import("../../src/module/item/weapon/data/types").WeaponSource | import("../../src/module/item/action/data").ActionItemSource | import("../../src/module/item/condition/data").ConditionSource | import("../../src/module/item/deity/data").DeitySource | import("../../src/module/item/effect/data").EffectSource | import("../../src/module/item/feat/data").FeatSource | import("../../src/module/item/heritage/data").HeritageSource | import("../../src/module/item/kit/data").KitSource | import("../../src/module/item/lore/data").LoreSource | import("../../src/module/item/melee/data").MeleeSource | import("../../src/module/item/spellcasting-entry/data/types").SpellcastingEntrySource | import("../../src/module/item/spell/data/types").SpellSource;
    get name(): string;
    get level(): number | null;
    get traits(): Set<string>;
    get isMagical(): boolean;
    get isAlchemical(): boolean;
    static updateDocuments(updates?: DocumentUpdateData<ItemPF2e>[], _context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    update(changes: object): void;
    toObject(source?: boolean): import("../../src/module/item/ancestry/data").AncestrySource | import("../../src/module/item/background/data").BackgroundSource | import("../../src/module/item/class/data").ClassSource | import("../../src/module/item/armor/data").ArmorSource | import("../../src/module/item/book/data").BookSource | import("../../src/module/item/consumable/data").ConsumableSource | import("../../src/module/item/container/data").ContainerSource | import("../../src/module/item/equipment/data").EquipmentSource | import("../../src/module/item/treasure/data").TreasureSource | import("../../src/module/item/weapon/data/types").WeaponSource | import("../../src/module/item/action/data").ActionItemSource | import("../../src/module/item/condition/data").ConditionSource | import("../../src/module/item/deity/data").DeitySource | import("../../src/module/item/effect/data").EffectSource | import("../../src/module/item/feat/data").FeatSource | import("../../src/module/item/heritage/data").HeritageSource | import("../../src/module/item/kit/data").KitSource | import("../../src/module/item/lore/data").LoreSource | import("../../src/module/item/melee/data").MeleeSource | import("../../src/module/item/spellcasting-entry/data/types").SpellcastingEntrySource | import("../../src/module/item/spell/data/types").SpellSource;
}
