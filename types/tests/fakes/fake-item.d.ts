import type { ActorPF2e } from "@actor";
import type { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/data";
export declare class FakeItem {
    options: DocumentConstructionContext<ItemPF2e>;
    _data: ItemSourcePF2e;
    parent: ActorPF2e | null;
    constructor(data: ItemSourcePF2e, options?: DocumentConstructionContext<ItemPF2e>);
    get id(): string;
    get data(): import("@item/data").ArmorSource | import("@item/data").BookSource | import("@item/data").ConsumableSource | import("../../src/module/item/container/data").ContainerSource | import("@item/data").EquipmentSource | import("../../src/module/item/treasure/data").TreasureSource | import("@item/data").WeaponSource | import("@item/data").ActionSource | import("@item/data").AncestrySource | import("@item/data").BackgroundSource | import("../../src/module/item/class/data").ClassSource | import("@item/data").ConditionSource | import("@item/data").DeitySource | import("@item/data").EffectSource | import("@item/data").FeatSource | import("../../src/module/item/heritage/data").HeritageSource | import("@item/data").KitSource | import("@item/data").LoreSource | import("@item/data").MeleeSource | import("@item/data").SpellcastingEntrySource | import("@item/data").SpellSource;
    get name(): string;
    get level(): number | null;
    get traits(): Set<string>;
    get isMagical(): boolean;
    get isAlchemical(): boolean;
    static updateDocuments(updates?: DocumentUpdateData<ItemPF2e>[], _context?: DocumentModificationContext): Promise<ItemPF2e[]>;
    update(changes: object): void;
    toObject(source?: boolean): import("@item/data").ArmorSource | import("@item/data").BookSource | import("@item/data").ConsumableSource | import("../../src/module/item/container/data").ContainerSource | import("@item/data").EquipmentSource | import("../../src/module/item/treasure/data").TreasureSource | import("@item/data").WeaponSource | import("@item/data").ActionSource | import("@item/data").AncestrySource | import("@item/data").BackgroundSource | import("../../src/module/item/class/data").ClassSource | import("@item/data").ConditionSource | import("@item/data").DeitySource | import("@item/data").EffectSource | import("@item/data").FeatSource | import("../../src/module/item/heritage/data").HeritageSource | import("@item/data").KitSource | import("@item/data").LoreSource | import("@item/data").MeleeSource | import("@item/data").SpellcastingEntrySource | import("@item/data").SpellSource;
}
