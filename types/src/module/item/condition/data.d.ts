import { CONDITION_SLUGS } from "@actor/data/values";
import { ItemSystemData } from "@item/data/base";
import { BaseNonPhysicalItemData, BaseNonPhysicalItemSource } from "@item/data/non-physical";
import { ConditionPF2e } from "./index";

export declare type ConditionSource = BaseNonPhysicalItemSource<"condition", ConditionSystemData>;
export declare class ConditionData extends BaseNonPhysicalItemData<ConditionPF2e> {
    static DEFAULT_ICON: ImagePath;
}
export interface ConditionData extends Omit<ConditionSource, "effects" | "flags"> {
    type: ConditionSource["type"];
    data: ConditionSource["data"];
    readonly _source: ConditionSource;
}
export interface ConditionSystemData extends ItemSystemData {
    slug: ConditionSlug;
    active: boolean;
    removable: boolean;
    references: {
        parent?: {
            id: string;
            type: "status" | "condition" | "feat" | "weapon" | "armor" | "consumable" | "equipment" | "spell";
        };
        children: {
            id: string;
            type: "condition";
        }[];
        overriddenBy: {
            id: string;
            type: "condition";
        }[];
        overrides: {
            id: string;
            type: "condition";
        }[];
        /**
         * This status is immune, and thereby inactive, from the following list.
         */
        immunityFrom: {
            id: string;
            type: "status" | "condition" | "feat" | "weapon" | "armor" | "consumable" | "equipment" | "spell";
        }[];
    };
    hud: {
        statusName: string;
        img: {
            useStatusName: boolean;
            value: ImagePath;
        };
        selectable: boolean;
    };
    duration: {
        perpetual: boolean;
        value: number;
        text: string;
    };
    modifiers: [
        {
            type: "ability" | "proficiency" | "status" | "circumstance" | "item" | "untyped";
            name: string;
            group: string;
            value?: number;
        }
    ];
    base: string;
    group: string;
    value: ConditionValueData;
    sources: {
        hud: boolean;
    };
    alsoApplies: {
        linked: [
            {
                condition: string;
                value?: number;
            }
        ];
        unlinked: [
            {
                condition: string;
                value?: number;
            }
        ];
    };
    overrides: string[];
}
declare type ConditionValueData = {
    isValued: true;
    immutable: boolean;
    value: number;
    modifiers: [
        {
            value: number;
            source: string;
        }
    ];
} | {
    isValued: false;
    immutable: boolean;
    value: null;
    modifiers: [
        {
            value: number;
            source: string;
        }
    ];
};
export declare type ConditionSlug = SetElement<typeof CONDITION_SLUGS>;
export {};
