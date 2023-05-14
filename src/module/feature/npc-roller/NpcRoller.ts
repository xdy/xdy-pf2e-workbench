import { MODULENAME } from "../../xdy-pf2e-workbench";
import { SCALE_APP_DATA } from "../NPCScaleData";
import { CanvasPF2e, TokenPF2e } from "@module/canvas";

export async function registerNpcRollerHandlebarsTemplates() {
    await loadTemplates([
        `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/table.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs`,
    ]);

    Handlebars.registerPartial("rollAppTable", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/table.hbs"}}`);
    Handlebars.registerPartial("rollAppCell", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs"}}`);
}

export async function setupNpcRoller() {
    Hooks.on("renderJournalDirectory", enableNpcRollerButton);

    await registerNpcRollerHandlebarsTemplates();
}

export function enableNpcRollerButton(_app, html: JQuery) {
    const button = $(
        `<button><i class="fa fa-dice"></i> ${game.i18n.localize(`${MODULENAME}.npcRoller.button-label`)}</button>`
    );
    button.on("click", () => {
        new NpcRoller().render(true);
    });

    const footer = html.find(".directory-footer.action-buttons");
    if (footer.length > 0) {
        footer.append(button);
    }
}

class NpcRoller extends Application {
    public constructor(options?: ApplicationOptions) {
        super(options);

        Hooks.on("controlToken", this.#onControlToken.bind(this));
    }

    static override get defaultOptions(): ApplicationOptions {
        const options = super.defaultOptions;
        return {
            ...options,
            title: game.i18n.localize(`${MODULENAME}.npcRoller.title`),
            template: `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
            tabs: [
                {
                    navSelector: `.roll-app-nav`,
                    contentSelector: `.roll-app-body`,
                    initial: `.roll-app-attacks`,
                },
            ],
            width: 800,
            height: "auto",
            resizable: true,
        };
    }

    override getData(options?: any): any {
        const data = super.getData(options);

        data["data"] = {
            levels: deepClone(SCALE_APP_DATA),
        };

        data["data"]["selected"] = canvas.tokens?.controlled.map(
            (token: TokenPF2e) => token.actor?.system["details"].level.value
        );

        return data;
    }

    override activateListeners(html: JQuery<HTMLElement>): void {
        super.activateListeners(html);

        html.find("button.rollable").on("click", this.#handleRollButtonClick);
    }

    #onControlToken() {
        setTimeout(this.render.bind(this), 0);
    }

    async #handleRollButtonClick(event): Promise<void> {
        const target = $(event.target);
        const rollName = target.data("rollname") as string;
        const token = (canvas as CanvasPF2e).tokens?.controlled[0];
        const formula = target.data("formula") as string | number | undefined;
        const secret = <boolean>game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);

        if (formula) {
            const formulaString = formula.toString();

            await new Roll(formulaString).toMessage(
                {
                    speaker: ChatMessage.getSpeaker({ token: <any>token?.document }),
                    flavor: rollName,
                    whisper: ChatMessage.getWhisperRecipients("GM").map((u) => u.id),
                },
                {
                    rollMode: secret ? CONST.DICE_ROLL_MODES.PRIVATE : game.settings.get("core", "rollMode"),
                    create: true,
                }
            );
        }
    }

    override close(): Promise<void> {
        Hooks.off("controlToken", this.#onControlToken.bind(this));

        return super.close();
    }
}
