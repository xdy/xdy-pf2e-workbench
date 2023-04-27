import { camelize, Flag } from "./utils";
import { ActionType, SKILL_ACTIONS_DATA, SkillActionData, SkillActionDataParameters } from "./skill-actions-data";
import { VariantsCollection } from "./variants";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ItemPF2e } from "@item";
import { ActionsIndex } from "./actions-index";
import { ItemSummaryData } from "@item/data";
import { CharacterSkill } from "@actor/character/types";
import { logWarn } from "../../utils";

const ACTION_ICONS: Record<ActionType, string> = {
    A: "OneAction",
    D: "TwoActions",
    T: "ThreeActions",
    F: "FreeAction",
    R: "Reaction",
    "": "Passive",
};

export interface ActorSkillAction {
    visible: boolean;
}

export class SkillAction {
    data: SkillActionData | SkillActionDataParameters;
    variants: VariantsCollection;

    constructor(data: SkillActionDataParameters) {
        data.actionKey ??= camelize(data.actionSlug);
        data.actionType ??= "A";

        switch (game.settings.get(MODULENAME, "skillActionsIconStyle")) {
            case "actionCostIcon": {
                data.icon = `systems/pf2e/icons/actions/${ACTION_ICONS[data.actionType]}.webp`;
                data.actionType = "";
                break;
            }
            default: {
                data.icon = data.icon
                    ? `systems/pf2e/icons/spells/${data.icon}.webp`
                    : `systems/pf2e/icons/actions/${ACTION_ICONS[data.actionType]}.webp`;
                break;
            }
        }
        this.data = data;

        this.variants = new VariantsCollection();
        data.variants.forEach(function (variantData) {
            this.buildVariants(variantData);
        }, this);
    }

    get actor() {
        return this.data.actor;
    }

    get key() {
        return this.data.actionKey;
    }

    get label() {
        return this.pf2eItem.name;
    }

    get visible() {
        return this.actorData?.visible ?? true;
    }

    get pf2eItem(): ItemPF2e {
        return <ItemPF2e>ActionsIndex.instance.get(this.data.actionSlug);
    }

    isDisplayed(filter: string, allVisible: boolean) {
        if (filter) {
            return this.label.toLowerCase().includes(filter) || this.variants.matchFilter(filter);
        } else {
            return this.visible || allVisible;
        }
    }

    hasTrait(trait: string) {
        const traits = (<any>this.pf2eItem)?.system.traits;
        return traits ? (traits["value"] ? (<string[]>traits["value"]).includes(trait) : undefined) : false;
    }

    getData({ allVisible }: { allVisible: boolean }) {
        const enabled =
            this.variants.length > 0 && ((<ItemPF2e>(<unknown>this.pf2eItem)).type !== "feat" || this.actorHasItem());

        return {
            ...this.data,
            enabled: enabled,
            visible: this.visible,
            displayed: this.isDisplayed("", allVisible),
            label: this.label,
            variants: this.variants,
        };
    }

    private get actorData(): ActorSkillAction | undefined {
        // @ts-ignore
        return <ActorSkillAction>Flag.get(this.actor, `actions.${this.key}`);
    }

    async update(data: ActorSkillAction) {
        // @ts-ignore
        await Flag.set(this.actor, `actions.${this.key}`, data);
    }

    async toggleVisibility(visible = !this.visible) {
        this.update({ visible: visible }).then();
    }

    async rollSkillAction(event) {
        const variant = this.variants[parseInt(event.currentTarget.dataset.variant)];

        if (variant.assuranceTotal) {
            await this.toChat(variant.assuranceTotal);
        } else {
            const rollAction = game.pf2e.actions[<string>this.key];

            // @ts-ignore
            if (Array.from(game.pf2e.actions).filter((x) => x[0] === <string>this.key)) {
                const action = game.pf2e.actions[<string>this.key];
                if (!["earnIncome"].includes(<string>this.key)) {
                    if (action) {
                        action({
                            event,
                            modifiers: variant.modifiers,
                            actors: [this.actor],
                            ...variant.extra,
                            skill: variant.skill.slug,
                        });
                    }
                    return;
                }
            }

            if (rollAction) {
                if (!["earnIncome", "escape"].includes(<string>this.key)) {
                    rollAction({
                        event,
                        modifiers: variant.modifiers,
                        actors: [this.actor],
                        ...variant.extra,
                        skill: variant.skill.slug,
                    });
                } else if (this.key === "earnIncome") {
                    // Ugly earnIncome fix.
                    const pack = game.packs.get("pf2e.pf2e-macros");
                    pack?.getIndex()
                        .then((index) => {
                            const id: any = index.find((e) => e.name.includes("Earn Income"))?._id;
                            if (id) {
                                (<Promise<Macro>>pack?.getDocument(id)).then((e) => e.execute());
                            }
                        })
                        .then();
                } else if (this.key === "escape") {
                    // Ugly escape fix.
                    const pack: any = game.packs.get("pf2e.action-macros");
                    pack?.getIndex()
                        .then((index) => {
                            const id = index.find((e) => e.name.includes("Escape"))?._id;
                            if (id) {
                                (<Promise<Macro>>pack?.getDocument(id)).then((e) => e.execute());
                            }
                        })
                        .then();
                }
            } else {
                if (game.settings.get(MODULENAME, "skillActionsDescription")) {
                    await this.toChat();
                }
                variant.skill
                    .roll({
                        event,
                        // @ts-ignore
                        modifiers: variant.modifiers,
                        // @ts-ignore
                        options: [`action:${this.data.actionSlug}`],
                    })
                    .then();
            }
        }
    }

    async toChat(assurance?: number) {
        const constructor = this.pf2eItem.constructor;
        // @ts-ignore
        const ownedItem = new constructor(this.pf2eItem.toJSON(), { parent: this.actor });
        if (assurance) {
            const assuranceLabel = game.i18n.localize(`${MODULENAME}.skillActions.assuranceLabel`);
            // ownedItem.name = `${ownedItem.name} (${assuranceLabel}: ${assurance})`;
            ownedItem.system.description.value =
                ownedItem.system.description.value + `<hr /> <p><strong>${assuranceLabel}</strong> : ${assurance}</p>`;
        }
        await ownedItem.toMessage();
    }

    async toggleItemSummary($li: JQuery) {
        // Toggle summary
        if ($li.hasClass("expanded")) {
            const $summary = $li.children(".item-summary");
            $summary.slideUp(200, () => $summary.remove());
        } else {
            const $summary = $('<div class="item-summary">');
            const chatData = await (<ItemPF2e>(<unknown>this.pf2eItem)).getChatData(
                { secrets: this.actor.isOwner },
                $li.data()
            );
            // @ts-ignore
            this.renderItemSummary($summary, this.pf2eItem, chatData);
            $li.children(".item-name, .item-controls, .action-header").last().after($summary);
            $summary.hide().slideDown(200, () => {
                // nothing to do
            });
        }
        $li.toggleClass("expanded");
    }

    /**
     * Called when an item summary is expanded and needs to be filled out.
     */
    renderItemSummary($div: JQuery, _item, chatData: ItemSummaryData) {
        // append traits (only style the tags if they contain description data)
        const traitTags = Array.isArray(chatData.traits)
            ? chatData.traits
                  .filter((trait) => !trait.excluded)
                  .map((trait) => {
                      const label: string = game.i18n.localize(trait.label);
                      const $trait = $(`<span class="tag">${label}</span>`);
                      if (trait.description) {
                          const description = game.i18n.localize(trait.description);
                          $trait
                              .attr({ title: description })
                              .tooltipster({ maxWidth: 400, theme: "crb-hover", contentAsHTML: true });
                      }
                      return $trait;
                  })
            : [];

        const allTags = [...traitTags].filter((tag): tag is JQuery => !!tag);
        const $properties = $('<div class="item-properties tags"></div>').append(...allTags);
        $div.append($properties, `<div class="item-description">${chatData.description?.value}</div>`);
    }

    private actorHasItem(slug = this.data.actionSlug) {
        // @ts-ignore
        return !!this.actor.items.find((item) => item.slug === slug);
    }

    private getSkills(proficiencyKey: string): CharacterSkill[] {
        // @ts-ignore
        const skills = this.actor.skills;
        if (proficiencyKey === "highest") {
            proficiencyKey = "acrobatics"; // TODO Actually figure out which is highest. For now, meh.
        }
        if (proficiencyKey === "lore") {
            // @ts-ignore
            return Object.values(skills).filter((skill) => skill.lore);
        } else {
            return [skills[proficiencyKey]].filter((s): s is CharacterSkill => !!s);
        }
    }

    buildVariants(data) {
        const assurances = this.actor.items.filter((x: any) => x.slug === "assurance");
        for (const skill of this.getSkills(data.proficiencyKey)) {
            if (
                (skill.rank >= (data.requiredRank ?? 0) && !data.requiredItem) ||
                (skill.rank >= (data.requiredRank ?? 0) && this.actorHasItem(data.requiredItem)) ||
                ((data.requiredRank ?? 0) === 1 && this.actorHasItem("clever-improviser"))
            ) {
                this.variants.addBasicVariant(
                    skill,
                    data.extra,
                    data.proficiencyKey === "highest" ? "highest" : data.label
                );

                // if (this.hasTrait("attack") && this.key !== "escape") {
                //     this.variants.addMapVariant(skill, data.extra, -5);
                //     this.variants.addMapVariant(skill, data.extra, -10);
                // }

                if (assurances.filter((x: any) => x.flags.pf2e.rulesSelections.assurance === skill.slug)?.length > 0) {
                    this.variants.addAssuranceVariant(skill, data.extra);
                }
            } else {
                return;
            }
        }
    }
}

export class SkillActionCollection extends foundry.utils.Collection<SkillAction> {
    static allActionsFor(actor): SkillAction[] {
        const allActions = deepClone(SKILL_ACTIONS_DATA);
        const actions = allActions.filter((x) => !x.replacedWith);

        // @ts-ignore
        const newActionList: any[] = Array.from(game.pf2e.actions).filter((x) =>
            allActions.find((y) => y.replacedWith === x[0])
        );

        const actionList = newActionList.map((x) => {
            return {
                actionSlug: x[0],
                icon:
                    x[1].img ??
                    allActions.find((y) => y.replacedWith === x[0])?.icon ??
                    "systems/pf2e/icons/default-icons/mystery-man.webp",
                variants: [{ proficiencyKey: x[1].statistic }], // TODO Handle variants in the action
                actionType: <ActionType>(x[1].cost === 1 ? "A" : "D"), // TODO Handle all action costs
            };
        });

        actions.push(...actionList);
        actions.sort((a, b) => a.actionSlug.localeCompare(b.actionSlug, game.i18n.lang));

        return actions.map((row) => {
            return new SkillAction({ ...row, actor: actor });
        });
    }

    add(action: SkillAction) {
        if (!action.key) {
            return;
        }
        if (this.get(action.key)) {
            logWarn("Overwriting existing skill action", action.key);
        }
        this.set(action.key, action);
    }

    fromElement(el: HTMLElement) {
        return this.get(el.dataset.actionId, { strict: true });
    }

    fromEvent(e: JQuery.TriggeredEvent) {
        return this.fromElement(e.delegateTarget);
    }

    toggleVisibility() {
        const visible = !this.some((action) => action.visible);
        this.forEach((action) => action.toggleVisibility(visible));
    }
}
