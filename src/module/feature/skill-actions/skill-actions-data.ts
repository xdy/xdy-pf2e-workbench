import { PartialBy } from "./utils";
import { Rank } from "./globals";
import { CharacterPF2e } from "@actor";

export type ActionType = "A" | "D" | "T" | "F" | "R" | "";

export interface VariantData {
    label?: string;
    proficiencyKey: string;
    extra?: Record<string, unknown>;
    requiredRank?: Rank;
}

export interface SkillActionData {
    key: string;
    slug: string;
    compendiumId: string;
    icon: string;
    actionType: ActionType;
    variants: VariantData[];
    actor: CharacterPF2e;
    translation?: string;
}

export type SkillActionDataParameters = PartialBy<SkillActionData, "key" | "actionType" | "icon" | "compendiumId">;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, "actor">[] = [
    // Acrobatics
    {
        slug: "balance",
        compendiumId: "M76ycLAqHoAgbcej",
        icon: "freedom-of-movement",
        variants: [{ proficiencyKey: "acrobatics" }],
    },
    {
        slug: "escape",
        compendiumId: "SkZAQRkLLkmBQNB9",
        icon: "agile-feet",
        variants: [{ proficiencyKey: "acrobatics" }, { proficiencyKey: "athletics" }],
    },
    {
        slug: "squeeze",
        compendiumId: "kMcV8e5EZUxa6evt",
        actionType: "",
        variants: [{ proficiencyKey: "acrobatics", requiredRank: 1 }],
    },
    {
        slug: "tumble-through",
        compendiumId: "21WIfSu7Xd7uKqV8",
        icon: "unimpeded-stride",
        variants: [{ proficiencyKey: "acrobatics" }],
    },
    {
        slug: "maneuver-in-flight",
        compendiumId: "Qf1ylAbdVi1rkc8M",
        icon: "fleet-step",
        variants: [{ proficiencyKey: "acrobatics", requiredRank: 1 }],
    },
    // Arcana
    {
        slug: "borrow-an-arcane-spell",
        compendiumId: "OizxuPb44g3eHPFh",
        actionType: "",
        variants: [{ proficiencyKey: "arcana", requiredRank: 1 }],
    },
    {
        slug: "decipher-writing",
        compendiumId: "d9gbpiQjChYDYA2L",
        actionType: "",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
            { proficiencyKey: "society", requiredRank: 1 },
        ],
    },
    {
        slug: "identify-magic",
        compendiumId: "eReSHVEPCsdkSL4G",
        actionType: "",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        slug: "learn-a-spell",
        compendiumId: "Q5iIYCFdqJFM31GW",
        actionType: "",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        slug: "recall-knowledge",
        compendiumId: "1OagaWtBpVXExToo",
        variants: [
            { proficiencyKey: "arcana" },
            { proficiencyKey: "crafting" },
            { proficiencyKey: "nature" },
            { proficiencyKey: "occultism" },
            { proficiencyKey: "religion" },
            { proficiencyKey: "society" },
            { proficiencyKey: "lore" },
        ],
    },
    {
        slug: "tap-ley-line",
        compendiumId: "gxtq81VAhpmNvEgA",
        actionType: "A",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    // Athletics
    {
        slug: "climb",
        compendiumId: "pprgrYQ1QnIDGZiy",
        icon: "heroic-feat",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "force-open",
        compendiumId: "SjmKHgI7a5Z9JzBx",
        icon: "indestructibility",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "disarm",
        compendiumId: "Dt6B1slsBy8ipJu9",
        icon: "perfect-strike",
        variants: [{ proficiencyKey: "athletics", requiredRank: 1 }],
    },
    {
        slug: "grapple",
        compendiumId: "PMbdMWc2QroouFGD",
        icon: "remove-fear",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "high-jump",
        compendiumId: "2HJ4yuEFY1Cast4h",
        actionType: "D",
        icon: "jump",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "long-jump",
        compendiumId: "JUvAvruz7yRQXfz2",
        actionType: "D",
        icon: "longstrider",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "shove",
        compendiumId: "7blmbDrQFNfdT731",
        icon: "ki-strike",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "swim",
        compendiumId: "c8TGiZ48ygoSPofx",
        icon: "waters-of-prediction",
        variants: [{ proficiencyKey: "athletics" }],
    },
    {
        slug: "trip",
        compendiumId: "ge56Lu1xXVFYUnLP",
        icon: "natures-enmity",
        variants: [{ proficiencyKey: "athletics" }],
    },
    // Crafting
    {
        slug: "craft",
        compendiumId: "rmwa3OyhTZ2i2AHl",
        actionType: "",
        variants: [{ proficiencyKey: "crafting", requiredRank: 1 }],
    },
    {
        slug: "earn-income",
        compendiumId: "QyzlsLrqM0EEwd7j",
        actionType: "",
        variants: [
            { proficiencyKey: "crafting", requiredRank: 1 },
            { proficiencyKey: "lore", requiredRank: 1 },
            { proficiencyKey: "performance", requiredRank: 1 },
        ],
    },
    {
        slug: "identify-alchemy",
        compendiumId: "Q4kdWVOf2ztIBFg1",
        actionType: "",
        variants: [{ proficiencyKey: "crafting", requiredRank: 1 }],
    },
    {
        slug: "repair",
        compendiumId: "bT3skovyLUtP22ME",
        actionType: "",
        variants: [{ proficiencyKey: "crafting" }],
    },
    // Deception
    {
        slug: "create-a-diversion",
        compendiumId: "GkmbTGfg8KcgynOA",
        variants: [
            {
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.distractingWords",
                proficiencyKey: "deception",
                extra: { variant: "distracting-words" },
            },
            {
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.gesture",
                proficiencyKey: "deception",
                extra: { variant: "gesture" },
            },
            {
                label: "xdy-pf2e-workbench.skillActions.Settings.variants.createADiversion.trick",
                proficiencyKey: "deception",
                extra: { variant: "trick" },
            },
        ],
    },
    {
        slug: "feint",
        compendiumId: "QNAVeNKtHA0EUw4X",
        icon: "delay-consequence",
        variants: [{ proficiencyKey: "deception", requiredRank: 1 }],
    },
    {
        slug: "impersonate",
        compendiumId: "AJstokjdG6iDjVjE",
        actionType: "",
        variants: [{ proficiencyKey: "deception" }],
    },
    {
        slug: "lie",
        compendiumId: "ewwCglB7XOPLUz72",
        actionType: "",
        variants: [{ proficiencyKey: "deception" }],
    },
    // Diplomacy
    {
        slug: "gather-information",
        compendiumId: "plBGdZhqq5JBl1D8",
        actionType: "",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        slug: "make-an-impression",
        compendiumId: "OX4fy22hQgUHDr0q",
        actionType: "",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        slug: "request",
        compendiumId: "DCb62iCBrJXy0Ik6",
        icon: "cackle",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    // Intimidation
    {
        slug: "coerce",
        compendiumId: "tHCqgwjtQtzNqVvd",
        actionType: "",
        variants: [{ proficiencyKey: "intimidation" }],
    },
    {
        slug: "demoralize",
        compendiumId: "2u915NdUyQan6uKF",
        icon: "blind-ambition",
        variants: [{ proficiencyKey: "intimidation" }],
    },
    // Lore
    // Medicine
    {
        slug: "administer-first-aid",
        compendiumId: "MHLuKy4nQO2Z4Am1",
        actionType: "D",
        variants: [{ proficiencyKey: "medicine" }],
    },
    {
        slug: "treat-disease",
        compendiumId: "TC7OcDa7JlWbqMaN",
        actionType: "",
        variants: [{ proficiencyKey: "medicine", requiredRank: 1 }],
    },
    {
        slug: "treat-poison",
        compendiumId: "KjoCEEmPGTeFE4hh",
        variants: [{ proficiencyKey: "medicine", requiredRank: 1 }],
    },
    {
        slug: "treat-wounds",
        compendiumId: "1kGNdIIhuglAjIp9",
        actionType: "",
        variants: [{ proficiencyKey: "medicine", requiredRank: 1 }],
    },
    // Nature
    {
        slug: "command-an-animal",
        compendiumId: "q9nbyIF0PEBqMtYe",
        variants: [{ proficiencyKey: "nature" }],
    },
    // Occultism
    // Performance
    {
        slug: "perform",
        compendiumId: "EEDElIyin4z60PXx",
        variants: [{ proficiencyKey: "performance" }],
    },
    // Religion
    // Society
    {
        slug: "create-forgery",
        compendiumId: "ftG89SjTSa9DYDOD",
        actionType: "",
        variants: [{ proficiencyKey: "society", requiredRank: 1 }],
    },
    {
        slug: "subsist",
        compendiumId: "49y9Ec4bDii8pcD3",
        actionType: "",
        variants: [{ proficiencyKey: "society" }, { proficiencyKey: "survival" }],
    },
    // Stealth
    {
        slug: "conceal-an-object",
        compendiumId: "qVNVSmsgpKFGk9hV",
        variants: [{ proficiencyKey: "stealth" }],
    },
    {
        slug: "hide",
        compendiumId: "XMcnh4cSI32tljXa",
        icon: "zealous-conviction",
        variants: [{ proficiencyKey: "stealth" }],
    },
    {
        slug: "sneak",
        compendiumId: "VMozDqMMuK5kpoX4",
        icon: "invisibility",
        variants: [{ proficiencyKey: "stealth" }],
    },
    // Survival
    {
        slug: "cover-tracks",
        compendiumId: "SB7cMECVtE06kByk",
        actionType: "",
        variants: [{ proficiencyKey: "survival", requiredRank: 1 }],
    },
    {
        slug: "sense-direction",
        compendiumId: "fJImDBQfqfjKJOhk",
        actionType: "",
        variants: [{ proficiencyKey: "survival" }],
    },
    {
        slug: "track",
        compendiumId: "EA5vuSgJfiHH7plD",
        actionType: "",
        variants: [{ proficiencyKey: "survival", requiredRank: 1 }],
    },
    // Thievery
    {
        slug: "disable-device",
        compendiumId: "cYdz2grcOcRt4jk6",
        actionType: "D",
        variants: [{ proficiencyKey: "thievery", requiredRank: 1 }],
    },
    {
        slug: "palm-an-object",
        compendiumId: "ijZ0DDFpMkWqaShd",
        variants: [{ proficiencyKey: "thievery" }],
    },
    {
        slug: "pick-a-lock",
        compendiumId: "2EE4aF4SZpYf0R6H",
        actionType: "D",
        icon: "ward-domain",
        variants: [{ proficiencyKey: "thievery", requiredRank: 1 }],
    },
    {
        slug: "steal",
        compendiumId: "RDXXE7wMrSPCLv5k",
        variants: [{ proficiencyKey: "thievery" }],
    },
    // Feat based
    {
        slug: "battle-medicine",
        compendiumId: "wYerMk6F1RZb0Fwt",
        variants: [{ proficiencyKey: "medicine", requiredRank: 1 }],
    },
    {
        slug: "battle-prayer",
        actionType: "A",
        compendiumId: "nBlzWZnmYuFHrMyV",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        slug: "bon-mot",
        compendiumId: "0GF2j54roPFIDmXf",
        variants: [{ proficiencyKey: "diplomacy" }],
    },
    {
        slug: "chromotherapy",
        actionType: "D",
        compendiumId: "RlFZ648UR0Q0YECL",
        variants: [{ proficiencyKey: "medicine", requiredRank: 2 }],
    },
    {
        slug: "diabolic-certitude",
        actionType: "F",
        compendiumId: "WxL8NMW9JQ5igu0C",
        variants: [{ proficiencyKey: "religion", requiredRank: 1 }],
    },
    {
        slug: "disturbing-knowledge",
        actionType: "D",
        compendiumId: "hkSuxXOc9qBleJbd",
        variants: [{ proficiencyKey: "occultism", requiredRank: 3 }],
    },
    {
        slug: "encouraging-words",
        actionType: "A",
        compendiumId: "dUnT3HWMFD3d2eBJ",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 1 }],
    },
    {
        slug: "evangelize",
        actionType: "A",
        compendiumId: "YgbcLfAEdi4xxvX5",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 3 }],
    },
    {
        slug: "eye-for-numbers",
        actionType: "A",
        compendiumId: "0N8TtGSk5enoLBZ8",
        variants: [{ proficiencyKey: "society", requiredRank: 1 }],
    },
    {
        slug: "juggle",
        actionType: "A",
        compendiumId: "AYb8PmGJ37HwIMwj",
        variants: [{ proficiencyKey: "performance", requiredRank: 1 }],
    },
    {
        slug: "legendary-negotiation",
        compendiumId: "A0TNeMNvyY8QpmLz",
        actionType: "T",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 4 }],
    },
    {
        slug: "no-cause-for-alarm",
        compendiumId: "6ON8DjFXSMITZleX",
        actionType: "T",
        variants: [{ proficiencyKey: "diplomacy", requiredRank: 1 }],
    },
    {
        slug: "quick-mount",
        compendiumId: "G9l2g7sDpPVbZJza",
        actionType: "A",
        variants: [{ proficiencyKey: "nature", requiredRank: 2 }],
    },
    {
        slug: "reveal-true-name",
        compendiumId: "5s8FqK4YZTVOvP0v",
        actionType: "D",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        slug: "sacred-defense",
        actionType: "A",
        compendiumId: "gHBdjbEnIK8clK8u",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        slug: "sanctify-water",
        actionType: "A",
        compendiumId: "P9dVBWB8nYZt4AFA",
        variants: [{ proficiencyKey: "religion", requiredRank: 3 }],
    },
    {
        slug: "scare-to-death",
        compendiumId: "mZttsiWl1ql5NvrH",
        actionType: "A",
        variants: [{ proficiencyKey: "intimidation", requiredRank: 4 }],
    },
    {
        slug: "treat-condition",
        actionType: "D",
        compendiumId: "rfnEcjxIFqwlJwJT",
        variants: [{ proficiencyKey: "medicine" }],
    },
    {
        slug: "trick-magic-item",
        compendiumId: "uR62fVC9FyQAMCO1",
        actionType: "A",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
    {
        slug: "eye-of-the-arclords",
        compendiumId: "OtV7esAwza1U6Kwr",
        actionType: "A",
        variants: [
            { proficiencyKey: "arcana", requiredRank: 1 },
            { proficiencyKey: "nature", requiredRank: 1 },
            { proficiencyKey: "occultism", requiredRank: 1 },
            { proficiencyKey: "religion", requiredRank: 1 },
        ],
    },
];
