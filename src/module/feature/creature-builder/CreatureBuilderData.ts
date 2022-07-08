export const CREATURE_LEVEL_FIELD = "data.details.level.value";

export enum AdjustableStatistics {
    str = "Strength",
    dex = "Dexterity",
    con = "Constitution",
    int = "Intelligence",
    wis = "Wisdom",
    cha = "Charisma",
    per = "Perception",
    ac = "Armor Class",
    hp = "Hit Points",
    fort = "Fortitude",
    ref = "Reflex",
    wil = "Will",
    acrobatics = "Acrobatics",
    arcana = "Arcana",
    athletics = "Athletics",
    crafting = "Crafting",
    deception = "Deception",
    diplomacy = "Diplomacy",
    intimidation = "Intimidation",
    medicine = "Medicine",
    nature = "Nature",
    occultism = "Occultism",
    performance = "Performance",
    religion = "Religion",
    society = "Society",
    stealth = "Stealth",
    survival = "Survival",
    thievery = "Thievery",
    strikeBonus = "Strike Attack Bonus",
    strikeDamage = "Strike Damage",
    spellcasting = "Spellcasting",
}

export enum StatisticOptions {
    extreme = "extreme",
    high = "high",
    moderate = "moderate",
    low = "low",
    terrible = "terrible",
    abysmal = "abysmal",
    none = "none", // Required for values that would allow for a null option
}

export class CreatureStatisticEntry {
    name?: string; // Overrides values from the parent category
    descriptor?: string; // Overrides values from the parent category
    actorField: string;
    defaultValue: StatisticOptions;
}

export class CreatureStatisticCategory {
    name: string;
    descriptor: string;
    availableOptions: StatisticOptions[];
    statisticEntries: CreatureStatisticEntry[];
}

// See [aon](http://2e.aonprd.com/Rules.aspx?ID=995)
export class Roadmap {
    name: string;
    tooltip: string;
    defaultValues: Map<string, StatisticOptions>;
}

export const DefaultCreatureStatistics: CreatureStatisticCategory[] = [
    {
        name: "Abilities",
        descriptor: "abilityScore",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
            StatisticOptions.terrible,
            StatisticOptions.abysmal,
        ],
        statisticEntries: [
            {
                name: AdjustableStatistics.str,
                actorField: "data.abilities.str.mod",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.dex,
                actorField: "data.abilities.dex.mod",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.con,
                actorField: "data.abilities.con.mod",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.int,
                actorField: "data.abilities.int.mod",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.wis,
                actorField: "data.abilities.wis.mod",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.cha,
                actorField: "data.abilities.cha.mod",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: AdjustableStatistics.per,
        descriptor: "perception",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
            StatisticOptions.terrible,
        ],
        statisticEntries: [
            {
                actorField: "data.attributes.perception.value",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: AdjustableStatistics.ac,
        descriptor: "armorClass",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
        ],
        statisticEntries: [
            {
                actorField: "data.attributes.ac.value",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: AdjustableStatistics.hp,
        descriptor: "hitPoints",
        availableOptions: [StatisticOptions.high, StatisticOptions.moderate, StatisticOptions.low],
        statisticEntries: [
            {
                actorField: "data.attributes.hp.value,data.attributes.hp.max",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: "Saving Throws",
        descriptor: "savingThrow",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
            StatisticOptions.terrible,
        ],
        statisticEntries: [
            {
                name: AdjustableStatistics.fort,
                actorField: "data.saves.fortitude.value",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.ref,
                actorField: "data.saves.reflex.value",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.wil,
                actorField: "data.saves.will.value",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: "Skills",
        descriptor: "skill",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
            StatisticOptions.none,
        ],
        statisticEntries: [
            {
                name: AdjustableStatistics.acrobatics,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.arcana,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.athletics,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.crafting,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.deception,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.diplomacy,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.intimidation,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.medicine,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.nature,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.occultism,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.performance,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.religion,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.society,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.stealth,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.survival,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
            {
                name: AdjustableStatistics.thievery,
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
        ],
    },
    {
        name: "Strike",
        descriptor: "strike",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.low,
        ],
        statisticEntries: [
            {
                name: AdjustableStatistics.strikeBonus,
                actorField: "none",
                descriptor: "strikeAttack",
                defaultValue: StatisticOptions.moderate,
            },
            {
                name: AdjustableStatistics.strikeDamage,
                actorField: "none",
                descriptor: "strikeDamage",
                defaultValue: StatisticOptions.moderate,
            },
        ],
    },
    {
        name: AdjustableStatistics.spellcasting,
        descriptor: "spellcasting",
        availableOptions: [
            StatisticOptions.extreme,
            StatisticOptions.high,
            StatisticOptions.moderate,
            StatisticOptions.none,
        ],
        statisticEntries: [
            {
                actorField: "none",
                defaultValue: StatisticOptions.none,
            },
        ],
    },
];

export const ROADMAPS: Roadmap[] = [
    {
        name: "Average Joe/Jane",
        tooltip: "Set all values to moderate, no spellcasting, no skills",
        defaultValues: new Map([]),
    },
    {
        name: "Brute",
        tooltip:
            "low Perception; high or extreme Str modifier, high to moderate Con modifier, low or lower Dex and mental modifiers; moderate or low AC; high Fortitude, low Reflex or Will or both; high HP; high attack bonus and high damage or moderate attack bonus and extreme damage",
        defaultValues: new Map([
            [AdjustableStatistics.per, StatisticOptions.low],
            [AdjustableStatistics.str, StatisticOptions.high],
            [AdjustableStatistics.con, StatisticOptions.high],
            [AdjustableStatistics.dex, StatisticOptions.low],
            [AdjustableStatistics.int, StatisticOptions.low],
            [AdjustableStatistics.wis, StatisticOptions.low],
            [AdjustableStatistics.cha, StatisticOptions.low],
            [AdjustableStatistics.ac, StatisticOptions.moderate],
            [AdjustableStatistics.fort, StatisticOptions.high],
            [AdjustableStatistics.wil, StatisticOptions.low],
            [AdjustableStatistics.ref, StatisticOptions.low],
            [AdjustableStatistics.hp, StatisticOptions.high],
            [AdjustableStatistics.strikeBonus, StatisticOptions.high],
            [AdjustableStatistics.strikeDamage, StatisticOptions.high],
        ]),
    },
    {
        name: "Magical Striker",
        tooltip:
            "high attack and high damage; moderate to high spell DCs; either a scattering of innate spells or prepared or spontaneous spells up to half the creature’s level (rounded up) minus 1",
        defaultValues: new Map([
            [AdjustableStatistics.spellcasting, StatisticOptions.moderate],
            [AdjustableStatistics.strikeBonus, StatisticOptions.high],
            [AdjustableStatistics.strikeDamage, StatisticOptions.high],
        ]),
    },
    {
        name: "Skirmisher",
        tooltip: "high Dex modifier; low Fortitude, high Reflex; higher Speed than typical",
        defaultValues: new Map([
            [AdjustableStatistics.dex, StatisticOptions.high],
            [AdjustableStatistics.fort, StatisticOptions.low],
            [AdjustableStatistics.ref, StatisticOptions.high],
        ]),
    },
    {
        name: "Sniper",
        tooltip:
            "high Perception; high Dex modifier; low Fortitude, high Reflex; moderate to low HP; ranged Strikes have high attack bonus and damage or moderate attack bonus and extreme damage (melee Strikes are weaker)",
        defaultValues: new Map([
            [AdjustableStatistics.per, StatisticOptions.high],
            [AdjustableStatistics.dex, StatisticOptions.high],
            [AdjustableStatistics.ac, StatisticOptions.moderate],
            [AdjustableStatistics.fort, StatisticOptions.low],
            [AdjustableStatistics.ref, StatisticOptions.high],
            [AdjustableStatistics.hp, StatisticOptions.moderate],
            [AdjustableStatistics.strikeBonus, StatisticOptions.high],
            [AdjustableStatistics.strikeDamage, StatisticOptions.high],
        ]),
    },
    {
        name: "Soldier",
        tooltip:
            "high Str modifier; high to extreme AC; high Fortitude; high attack bonus and high damage; Attack of Opportunity or other tactical abilities",
        defaultValues: new Map([
            [AdjustableStatistics.str, StatisticOptions.high],
            [AdjustableStatistics.ac, StatisticOptions.high],
            [AdjustableStatistics.fort, StatisticOptions.high],
            [AdjustableStatistics.strikeBonus, StatisticOptions.high],
            [AdjustableStatistics.strikeDamage, StatisticOptions.high],
        ]),
    },
    {
        name: "Spellcaster",
        tooltip:
            "high or extreme modifier for the corresponding mental ability; low Fortitude, high Will; low HP; low attack bonus and moderate or low damage; high or extreme spell DCs; prepared or spontaneous spells up to half the creature’s level (rounded up)",
        defaultValues: new Map([
            [AdjustableStatistics.int, StatisticOptions.high],
            [AdjustableStatistics.fort, StatisticOptions.low],
            [AdjustableStatistics.wil, StatisticOptions.high],
            [AdjustableStatistics.hp, StatisticOptions.low],
            [AdjustableStatistics.strikeBonus, StatisticOptions.low],
            [AdjustableStatistics.strikeDamage, StatisticOptions.low],
            [AdjustableStatistics.spellcasting, StatisticOptions.high],
        ]),
    },
];
