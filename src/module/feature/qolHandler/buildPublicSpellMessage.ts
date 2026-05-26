import { SpellPF2e } from "foundry-pf2e";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

const I18N_RECALL_KNOWLEDGE = "PF2E.RecallKnowledge.Label";
const I18N_TRAIT_PREFIX = "PF2E.Trait";

export const TRADITION_SKILLS: Record<string, string> = {
    arcane: "arcana",
    divine: "religion",
    occult: "occultism",
    primal: "nature",
};

export function buildSpellMessage(
    originSpell: SpellPF2e | null,
    tokenName: string,
    type: string,
    tradition: string,
    spellUuid: string,
    originalContent: string,
    isBasicSave: boolean | undefined,
    showTraits: boolean,
    traitsBlocklist: string,
): string {
    if (!originSpell) {
        return game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartNoRK`);
    }

    let content = buildSpellHeader(tokenName, type, tradition, spellUuid);

    if (showTraits) {
        content += buildTraitsSection(originSpell, traitsBlocklist);
    }

    content += buildRecallKnowledgeSection(originSpell, tradition);
    content += buildSaveButtonSection(originalContent, originSpell, isBasicSave);

    return content;
}

function buildSpellHeader(tokenName: string, type: string, tradition: string, spellUuid: string): string {
    const localizedTradition = localizeTrait(tradition);
    return game.i18n.localize(
        game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.firstPart`, {
            tokenName,
            type,
            traditionString: localizedTradition,
            spellUUID: spellUuid,
        }),
    );
}

function buildTraitsSection(originSpell: SpellPF2e, blocklistRaw: string): string {
    const blocklist = blocklistRaw
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

    const traits = Object.values(originSpell.system.traits.value)
        .map((trait) => String(trait))
        .filter((trait) => !blocklist.includes(trait))
        .map((trait) => localizeTrait(trait))
        .sort()
        .join(", ");

    return game.i18n.localize(
        game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessageShowTraits.traitPart`, { traits }),
    );
}

function buildRecallKnowledgeSection(originSpell: SpellPF2e, tradition: string): string {
    const level = originSpell.system.level.value;
    const dcRK = getDcRkForSpellRank(level) + getDcRkForRarity(originSpell.system.traits?.rarity ?? "common");
    const skill = TRADITION_SKILLS[tradition] ?? "";

    return game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.secondPartRK`, {
        skill,
        dcRK,
        rk: `&#123;${game.i18n.localize(I18N_RECALL_KNOWLEDGE)}\t&#125;`,
    });
}

function buildSaveButtonSection(
    originalContent: string,
    originSpell: SpellPF2e,
    isBasicSave: boolean | undefined,
): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalContent;

    const saveButtons = tempDiv.querySelectorAll('button[data-action="spell-save"]');
    if (saveButtons.length !== 1) return "";

    const saveButton = saveButtons[0];
    const dataSave = saveButton.getAttribute("data-save") ?? "";
    const targetHelperActive = game.modules.find((s) => s.id === "pf2e-target-helper")?.active;

    if (targetHelperActive) {
        return game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.noButtonSavePart`, {
            dataSave,
            basic: isBasicSave
                ? game.i18n.localize(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.basic`)
                : "",
        });
    }

    const dataDC = saveButton.getAttribute("data-dc") ?? "";
    return buildFullSavePart(dataSave, dataDC, originSpell, isBasicSave);
}

function buildFullSavePart(
    dataSave: string,
    dataDC: string,
    originSpell: SpellPF2e,
    isBasicSave: boolean | undefined,
): string {
    const traits = Object.values(originSpell.system.traits.value)
        .map((trait) => game.pf2e.system.sluggify(String(trait)))
        .sort()
        .join(",");

    return game.i18n.format(`${MODULENAME}.SETTINGS.castPrivateSpellWithPublicMessage.savePart`, {
        dataSave,
        dataDC,
        traits,
        basic: isBasicSave ? "|basic:true" : "",
    });
}

function getDcRkForSpellRank(rank: number): number {
    const rankToDc: Record<number, number> = {
        1: 15,
        2: 18,
        3: 20,
        4: 23,
        5: 26,
        6: 28,
        7: 31,
        8: 34,
        9: 36,
        10: 39,
    };
    return rankToDc[rank] ?? 0;
}

function getDcRkForRarity(rarity: string): number {
    const rarityMapping: Record<string, number> = {
        uncommon: 2,
        rare: 5,
        unique: 10,
        common: 0,
    };
    return rarityMapping[rarity] ?? 0;
}

export function localizeTrait(trait: string): string {
    if (!trait) return trait;
    return game.i18n.localize(`${I18N_TRAIT_PREFIX}${trait.charAt(0).toUpperCase() + trait.slice(1)}`);
}
