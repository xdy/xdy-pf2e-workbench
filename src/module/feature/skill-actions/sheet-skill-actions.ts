import { ActionsIndex } from "./actions-index";
import { SkillActionCollection } from "./skill-actions";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { Flag } from "./utils";

let templates: Handlebars.TemplateDelegate[];

export async function setupSkillActions() {
    // @ts-ignore
    templates = await loadTemplates([`modules/${MODULENAME}/templates/feature/skill-actions/skill-actions.hbs`]);
}

export async function loadSkillActions() {
    await ActionsIndex.instance.loadCompendium("pf2e.feats-srd");
    await ActionsIndex.instance.loadCompendium("pf2e.actionspf2e");
}

export async function loadSkillActionsBabele() {
    await ActionsIndex.instance.loadCompendium("pf2e.feats-srd");
    await ActionsIndex.instance.loadCompendium("pf2e.actionspf2e");
}

function renderActionsList(skillActions: SkillActionCollection, actor: Actor) {
    const skillData = skillActions
        .map((action) => action.getData({ allVisible: <boolean>Flag.get(actor, "allVisible") }))
        .sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });

    const $skillActions = $(templates[0]({ skills: skillData, allVisible: <boolean>Flag.get(actor, "allVisible") }));
    const $items = $skillActions.find("li.item");

    $skillActions.on("click", ".toggle-hidden-actions", function (e) {
        if (e.altKey) {
            skillActions.toggleVisibility();
        } else {
            Flag.set(actor, "allVisible", !Flag.get(actor, "allVisible")).then();
        }
    });

    $skillActions.on("input", 'input[name="filter"]', function (e) {
        const filter = e.currentTarget.value.toLowerCase();
        $items.each(function () {
            const action = skillActions.fromElement(this);
            $(this).toggle(action.isDisplayed(filter, <boolean>Flag.get(actor, "allVisible")));
        });
    });

    $items.on("click", ".skill-action.tag.variant-strike", function (e) {
        skillActions.fromEvent(e).rollSkillAction(e);
    });

    $items.on("click", ".item-image", function (e) {
        skillActions.fromEvent(e).toChat();
    });

    $items.on("click", ".item-toggle-equip", function (e) {
        e.stopPropagation();
        skillActions.fromEvent(e).toggleVisibility();
    });

    $items.on("click", ".action-name", function (e) {
        skillActions.fromEvent(e).toggleItemSummary($(e.delegateTarget));
    });

    return $skillActions;
}

export function renderSheetSkillActions(app: ActorSheet, html: JQuery<HTMLElement>) {
    if (app.actor.type !== "character") {
        return;
    }

    const encounterActions = new SkillActionCollection();
    const explorationActions = new SkillActionCollection();
    const downtimeActions = new SkillActionCollection();

    for (const action of SkillActionCollection.allActionsFor(app.actor)) {
        if (action.hasTrait("downtime")) {
            downtimeActions.add(action);
        } else {
            if (action.hasTrait("exploration")) {
                explorationActions.add(action);
            } else {
                encounterActions.add(action);
            }
        }
    }

    const $encounter = renderActionsList(encounterActions, app.actor);
    const $exploration = renderActionsList(explorationActions, app.actor);
    const $downtime = renderActionsList(downtimeActions, app.actor);

    const skillActions = game.settings.get(MODULENAME, "skillActions");
    if (skillActions !== "disabled") {
        switch (skillActions) {
            case "top": {
                const explorationTop = html
                    .find('[data-tab="exploration"] .actions-list.item-list.directory-list')
                    .prev();
                const downtimeTop = html.find('[data-tab="downtime"] .actions-list.item-list.directory-list').prev();
                const encounterTop = html.find(
                    '[data-tab="encounter"] .actions-list.item-list.directory-list.strikes-list'
                );
                encounterTop.after($encounter);
                explorationTop.before($exploration);
                downtimeTop.before($downtime);

                break;
            }
            case "bottom": {
                const encounterBottom = html
                    .find('[data-tab="encounter"]  .actions-list.item-list.directory-list')
                    .last();
                const explorationBottom = html.find('[data-tab="exploration"] .actions-list.item-list.directory-list');
                const downtimeBottom = html.find('[data-tab="downtime"] .actions-list.item-list.directory-list');
                encounterBottom.after($encounter);
                explorationBottom.after($exploration);
                downtimeBottom.after($downtime);

                break;
            }
        }
    }
}
