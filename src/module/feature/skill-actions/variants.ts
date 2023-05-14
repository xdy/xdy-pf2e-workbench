import { CharacterSkill } from "@actor/character/types.js";
import { MODULENAME } from "../../xdy-pf2e-workbench.js";

export class VariantsCollection extends Array<Variant> {
    addBasicVariant(skill: CharacterSkill, extra: Record<string, unknown> | undefined, label: string | undefined) {
        const modifier = label === "highest" ? " ?" : (skill.check.mod >= 0 ? " +" : " ") + skill.check.mod;
        label = label ? game.i18n.localize(label) : skill.label;
        this.push(new Variant(`${label}${modifier}`, skill, extra));
    }

    addMapVariant(skill: CharacterSkill, extra: Record<string, unknown> | undefined, map: number) {
        const modifier = new game.pf2e.Modifier({
            label: game.i18n.localize("PF2E.MultipleAttackPenalty"),
            modifier: map,
            type: "untyped",
            rollOptions: {},
        });
        const label = game.i18n.format("PF2E.MAPAbbreviationLabel", { penalty: map });
        this.push(new Variant(label, skill, extra, [modifier]));
    }

    addAssuranceVariant(skill: CharacterSkill, extra: Record<string, unknown> | undefined) {
        const proficiency = skill.modifiers.find((m) => m.type === "proficiency");
        const assuranceTotal = 10 + (proficiency?.modifier || 0);
        const assuranceLabel = game.i18n.localize(`${MODULENAME}.skillActions.assuranceLabel`);
        this.push(new Variant(assuranceLabel + " : " + assuranceTotal, skill, extra, [], assuranceTotal));
    }

    matchFilter(filter: string) {
        return this.some((variant) => variant.label.toLowerCase().includes(filter));
    }
}

export class Variant {
    label: string;
    skill: CharacterSkill;
    extra?: Record<string, unknown>;
    modifiers: (typeof game.pf2e.Modifier)[];
    assuranceTotal: number;

    constructor(
        label: string,
        skill: CharacterSkill,
        extra: Record<string, unknown> | undefined,
        modifiers: (typeof game.pf2e.Modifier)[] = [],
        assuranceTotal = 0
    ) {
        this.label = label;
        this.skill = skill;
        this.extra = extra;
        this.modifiers = modifiers;
        this.assuranceTotal = assuranceTotal;
    }
}
