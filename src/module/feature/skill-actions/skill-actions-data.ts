import { PartialBy } from "./utils";
import { Rank } from "./globals";
import { CharacterPF2e } from "@actor";

export type ActionType = "A" | "D" | "T" | "F" | "R" | "";

export interface VariantData {
    label?: string;
    proficiencyKey: string;
    extra?: Record<string, unknown>;
    requiredRank?: Rank;
    requiredItem?: string;
}

export interface SkillActionData {
    // Used for flag and to get ActionMacro, defaults to camelize(actionSlug)
    actionKey: string;
    // Slug of the action, used to get the action from the compendium
    actionSlug: string;
    // Action macro, used to get the action macro from the compendium, defaults to actionKey
    actionMacro: string;
    // Id of the action in the compendium
    compendiumId: string;
    // Icon to show next to the action name
    icon: string;
    // Action type, used to determine the action glyph (TODO change to use numeric instead of string)
    actionType: ActionType;
    // Roll variants, used to determine the skill to use, MAP, assurance.
    variants: VariantData[];
    // Actor. TODO Not sure why this is stored here, but it is used in skill-actions.ts
    actor: CharacterPF2e;
}

export type SkillActionDataParameters = PartialBy<
    SkillActionData,
    "actionKey" | "actionMacro" | "actionType" | "icon" | "compendiumId"
>;

// TODO Add basic actions, default to filtering them out (really intended for Basic Action Macros replacement)
// TODO Add exploration actions/activities, default to filtering them out (really intended for Basic Action Macros replacement)
export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, "actor">[] = [
    {
        actionSlug: "administer-first-aid",
        actionType: "D",
        compendiumId: "MHLuKy4nQO2Z4Am1",
        variants: [
            {
                extra: { variant: "stabilize" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.administerFirstAid.stabilize",
                proficiencyKey: "medicine",
            },
            {
                extra: { variant: "stop-bleeding" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.administerFirstAid.stopBleeding",
                proficiencyKey: "medicine",
            },
            {
                extra: { variant: "stabilize" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.administerFirstAid.stabilizeChirurgeon",
                proficiencyKey: "crafting",
                requiredItem: "chirurgeon",
            },
            {
                extra: { variant: "stop-bleeding" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.administerFirstAid.stopBleedingChirurgeon",
                proficiencyKey: "crafting",
                requiredItem: "chirurgeon",
            },
        ],
    },
    {
        actionSlug: "balance",
        compendiumId: "M76ycLAqHoAgbcej",
        icon: "freedom-of-movement",
        variants: [{ proficiencyKey: "acrobatics" }],
    },
    {
        actionSlug: "battle-medicine",
        compendiumId: "wYerMk6F1RZb0Fwt",
        variants: [
            { proficiencyKey: "medicine", requiredRank: 1 },
            { proficiencyKey: "crafting", requiredRank: 1, requiredItem: "chirurgeon" },
        ],
    },
    {
        actionSlug: "battle-prayer",
        actionType: "A",
        compendiumId: "nBlzWZnmYuFHrMyV",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        actionSlug: "bon-mot",
        compendiumId: "0GF2j54roPFIDmXf",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        actionSlug: "borrow-an-arcane-spell",
        actionType: "",
        compendiumId: "OizxuPb44g3eHPFh",
        variants: [{ proficiencyKey: "arcana", requiredRank: 1 }],
    },
    {
        actionSlug: "chromotherapy",
        actionType: "D",
        compendiumId: "RlFZ648UR0Q0YECL",
        variants: [
            { proficiencyKey: "medicine", requiredRank: 2 },
            { proficiencyKey: "crafting", requiredRank: 2, requiredItem: "chirurgeon" },
        ],
    },
    {
        actionSlug: "climb",
        compendiumId: "pprgrYQ1QnIDGZiy",
        icon: "heroic-feat",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "coerce",
        actionType: "",
        compendiumId: "tHCqgwjtQtzNqVvd",
        variants: [{ proficiencyKey: "intimidation" }],
    },
    {
        actionSlug: "command-an-animal",
        compendiumId: "q9nbyIF0PEBqMtYe",
        variants: [{ proficiencyKey: "nature" }],
    },
    {
        actionSlug: "conceal-an-object",
        compendiumId: "qVNVSmsgpKFGk9hV",
        variants: [{ proficiencyKey: "stealth" }],
    },
    {
        actionSlug: "cover-tracks",
        actionType: "",
        compendiumId: "SB7cMECVtE06kByk",
        variants: [{ proficiencyKey: "survival", requiredRank: 1 }],
    },
    {
        actionSlug: "craft",
        actionType: "",
        compendiumId: "rmwa3OyhTZ2i2AHl",
        variants: [{ proficiencyKey: "crafting", requiredRank: 1 }],
    },
    {
        actionSlug: "create-a-diversion",
        compendiumId: "GkmbTGfg8KcgynOA",
        variants: [
            {
                extra: { variant: "distracting-words" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.distractingWords",
                proficiencyKey: "deception",
            },
            {
                extra: { variant: "gesture" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.gesture",
                proficiencyKey: "deception",
            },
            {
                extra: { variant: "trick" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.trick",
                proficiencyKey: "deception",
            },
        ],
    },
    {
        actionSlug: "create-forgery",
        actionType: "",
        compendiumId: "ftG89SjTSa9DYDOD",
        variants: [{ proficiencyKey: "society", requiredRank: 1 }],
    },
    {
        actionSlug: "decipher-writing",
        actionType: "",
        compendiumId: "d9gbpiQjChYDYA2L",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
            { proficiencyKey: "society", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "demoralize",
        compendiumId: "2u915NdUyQan6uKF",
        icon: "blind-ambition",
        variants: [{ proficiencyKey: "intimidation" }],
    },
    {
        actionSlug: "diabolic-certitude",
        actionType: "F",
        compendiumId: "WxL8NMW9JQ5igu0C",
        variants: [{ proficiencyKey: "religion", requiredRank: 1 }],
    },
    {
        actionSlug: "disable-device",
        actionType: "D",
        compendiumId: "cYdz2grcOcRt4jk6",
        variants: [{ proficiencyKey: "thievery", requiredRank: 1 }],
    },
    {
        actionSlug: "disarm",
        compendiumId: "Dt6B1slsBy8ipJu9",
        icon: "perfect-strike",
        variants: [{ proficiencyKey: "athletics", requiredRank: 1 }],
    },
    {
        actionSlug: "disturbing-knowledge",
        actionType: "D",
        compendiumId: "hkSuxXOc9qBleJbd",
        variants: [{ proficiencyKey: "occultism", requiredRank: 3 }],
    },
    {
        actionSlug: "earn-income",
        actionType: "",
        compendiumId: "QyzlsLrqM0EEwd7j",
        variants: [
            { proficiencyKey: "crafting", requiredRank: 1 },
            { proficiencyKey: "lore", requiredRank: 1 },
            { proficiencyKey: "performance", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "encouraging-words",
        actionType: "A",
        compendiumId: "dUnT3HWMFD3d2eBJ",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 1 }],
    },
    {
        actionSlug: "escape",
        compendiumId: "SkZAQRkLLkmBQNB9",
        icon: "agile-feet",
        variants: [{ proficiencyKey: "highest" }],
    },
    {
        actionSlug: "evangelize",
        actionType: "A",
        compendiumId: "YgbcLfAEdi4xxvX5",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 3 }],
    },
    {
        actionSlug: "eye-for-numbers",
        actionType: "A",
        compendiumId: "0N8TtGSk5enoLBZ8",
        variants: [{ proficiencyKey: "society", requiredRank: 1 }],
    },
    {
        actionSlug: "eye-of-the-arclords",
        actionType: "A",
        compendiumId: "OtV7esAwza1U6Kwr",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "feint",
        compendiumId: "QNAVeNKtHA0EUw4X",
        icon: "delay-consequence",
        variants: [{ proficiencyKey: "deception", requiredRank: 1 }],
    },
    {
        actionSlug: "force-open",
        compendiumId: "SjmKHgI7a5Z9JzBx",
        icon: "indestructibility",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "gather-information",
        actionType: "",
        compendiumId: "plBGdZhqq5JBl1D8",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        actionSlug: "grapple",
        compendiumId: "PMbdMWc2QroouFGD",
        icon: "remove-fear",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "hide",
        compendiumId: "XMcnh4cSI32tljXa",
        icon: "zealous-conviction",
        variants: [{ proficiencyKey: "stealth" }],
    },
    {
        actionSlug: "high-jump",
        actionType: "D",
        compendiumId: "2HJ4yuEFY1Cast4h",
        icon: "jump",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "identify-alchemy",
        actionType: "",
        compendiumId: "Q4kdWVOf2ztIBFg1",
        variants: [{ proficiencyKey: "crafting", requiredRank: 1 }],
    },
    {
        actionSlug: "identify-magic",
        actionType: "",
        compendiumId: "eReSHVEPCsdkSL4G",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "impersonate",
        actionType: "",
        compendiumId: "AJstokjdG6iDjVjE",
        variants: [{ proficiencyKey: "deception" }],
    },
    {
        actionSlug: "juggle",
        actionType: "A",
        compendiumId: "AYb8PmGJ37HwIMwj",
        variants: [{ proficiencyKey: "performance", requiredRank: 1 }],
    },
    {
        actionSlug: "learn-a-spell",
        actionType: "",
        compendiumId: "Q5iIYCFdqJFM31GW",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "legendary-negotiation",
        actionType: "T",
        compendiumId: "A0TNeMNvyY8QpmLz",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 4 }],
    },
    {
        actionSlug: "lie",
        actionType: "",
        compendiumId: "ewwCglB7XOPLUz72",
        variants: [{ proficiencyKey: "deception" }],
    },
    {
        actionSlug: "long-jump",
        actionType: "D",
        compendiumId: "JUvAvruz7yRQXfz2",
        icon: "longstrider",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "make-an-impression",
        actionType: "",
        compendiumId: "OX4fy22hQgUHDr0q",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        actionSlug: "maneuver-in-flight",
        compendiumId: "Qf1ylAbdVi1rkc8M",
        icon: "fleet-step",
        variants: [{ proficiencyKey: "acrobatics", requiredRank: 1 }],
    },
    {
        actionSlug: "no-cause-for-alarm",
        actionType: "T",
        compendiumId: "6ON8DjFXSMITZleX",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 1 }],
    },
    {
        actionSlug: "palm-an-object",
        compendiumId: "ijZ0DDFpMkWqaShd",
        variants: [{ proficiencyKey: "thievery" }],
    },
    {
        actionSlug: "perform",
        compendiumId: "EEDElIyin4z60PXx",
        variants: [
            {
                extra: { variant: "acting" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.acting",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "comedy" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.comedy",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "dance" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.dance",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "keyboards" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.keyboards",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "oratory" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.oratory",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "percussion" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.percussion",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "singing" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.singing",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "strings" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.strings",
                proficiencyKey: "performance",
            },
            {
                extra: { variant: "winds" },
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.perform.winds",
                proficiencyKey: "performance",
            },
        ],
    },
    {
        actionSlug: "pick-a-lock",
        actionType: "D",
        compendiumId: "2EE4aF4SZpYf0R6H",
        icon: "ward-domain",
        variants: [{ proficiencyKey: "thievery", requiredRank: 1 }],
    },
    {
        actionSlug: "quick-mount",
        actionType: "A",
        compendiumId: "G9l2g7sDpPVbZJza",
        variants: [{ proficiencyKey: "nature", requiredRank: 2 }],
    },
    {
        actionSlug: "recall-knowledge",
        compendiumId: "1OagaWtBpVXExToo",
        variants: [
            { proficiencyKey: "arcana" },
            { proficiencyKey: "crafting" },
            { proficiencyKey: "lore" },
            { proficiencyKey: "nature" },
            { proficiencyKey: "occultism" },
            { proficiencyKey: "religion" },
            { proficiencyKey: "society" },
        ],
    },
    {
        actionSlug: "repair",
        actionType: "",
        compendiumId: "bT3skovyLUtP22ME",
        variants: [{ proficiencyKey: "crafting" }],
    },
    {
        actionSlug: "request",
        compendiumId: "DCb62iCBrJXy0Ik6",
        icon: "cackle",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        actionSlug: "reveal-true-name",
        actionType: "D",
        compendiumId: "5s8FqK4YZTVOvP0v",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "sacred-defense",
        actionType: "A",
        compendiumId: "gHBdjbEnIK8clK8u",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        actionSlug: "sanctify-water",
        actionType: "A",
        compendiumId: "P9dVBWB8nYZt4AFA",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        actionSlug: "scare-to-death",
        actionType: "A",
        compendiumId: "mZttsiWl1ql5NvrH",
        variants: [{ proficiencyKey: "intimidation", requiredRank: 4 }],
    },
    {
        actionSlug: "sense-direction",
        actionType: "",
        compendiumId: "fJImDBQfqfjKJOhk",
        variants: [{ proficiencyKey: "survival" }],
    },
    {
        actionSlug: "shove",
        compendiumId: "7blmbDrQFNfdT731",
        icon: "ki-strike",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "sneak",
        compendiumId: "VMozDqMMuK5kpoX4",
        icon: "invisibility",
        variants: [{ proficiencyKey: "stealth" }],
    },
    {
        actionSlug: "squeeze",
        actionType: "",
        compendiumId: "kMcV8e5EZUxa6evt",
        variants: [{ proficiencyKey: "acrobatics", requiredRank: 1 }],
    },
    {
        actionSlug: "steal",
        compendiumId: "RDXXE7wMrSPCLv5k",
        variants: [{ proficiencyKey: "thievery" }],
    },
    {
        actionSlug: "subsist",
        actionType: "",
        compendiumId: "49y9Ec4bDii8pcD3",
        variants: [{ proficiencyKey: "society" }, { proficiencyKey: "survival" }],
    },
    {
        actionSlug: "swim",
        compendiumId: "c8TGiZ48ygoSPofx",
        icon: "waters-of-prediction",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "tap-ley-line",
        actionType: "A",
        compendiumId: "gxtq81VAhpmNvEgA",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "track",
        actionType: "",
        compendiumId: "EA5vuSgJfiHH7plD",
        variants: [{ proficiencyKey: "survival", requiredRank: 1 }],
    },
    {
        actionSlug: "treat-condition",
        actionType: "D",
        compendiumId: "rfnEcjxIFqwlJwJT",
        variants: [{ proficiencyKey: "medicine" }, { proficiencyKey: "crafting", requiredItem: "chirurgeon" }],
    },
    {
        actionSlug: "treat-disease",
        actionType: "",
        compendiumId: "TC7OcDa7JlWbqMaN",
        variants: [
            { proficiencyKey: "medicine", requiredRank: 1 },
            { proficiencyKey: "crafting", requiredRank: 1, requiredItem: "chirurgeon" },
        ],
    },
    {
        actionSlug: "treat-poison",
        compendiumId: "KjoCEEmPGTeFE4hh",
        variants: [
            { proficiencyKey: "medicine", requiredRank: 1 },
            { proficiencyKey: "crafting", requiredRank: 1, requiredItem: "chirurgeon" },
        ],
    },
    {
        actionSlug: "treat-wounds",
        actionType: "",
        compendiumId: "1kGNdIIhuglAjIp9",
        variants: [
            { proficiencyKey: "medicine", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1, requiredItem: "natural-medicine" },
            { proficiencyKey: "crafting", requiredRank: 1, requiredItem: "chirurgeon" },
        ],
    },
    {
        actionSlug: "trick-magic-item",
        actionType: "A",
        compendiumId: "uR62fVC9FyQAMCO1",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        actionSlug: "trip",
        compendiumId: "ge56Lu1xXVFYUnLP",
        icon: "natures-enmity",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        actionSlug: "tumble-through",
        compendiumId: "21WIfSu7Xd7uKqV8",
        icon: "unimpeded-stride",
        variants: [{ proficiencyKey: "acrobatics" }],
    },
];
