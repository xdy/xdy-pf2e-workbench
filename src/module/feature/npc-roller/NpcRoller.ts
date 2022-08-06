import { MODULENAME } from "../../../module/xdy-pf2e-workbench";
import { SCALE_APP_DATA } from "../NPCScaleData";

async function registerHandlebarsTemplates() {
    await loadTemplates([
        `modules/${MODULENAME}/templates/feature/npc-roller/index.html`,
        `modules/${MODULENAME}/templates/feature/npc-roller/table.html`,
        `modules/${MODULENAME}/templates/feature/npc-roller/cell.html`,
    ]);

    Handlebars.registerPartial("rollAppTable", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/table.html"}}`);
    Handlebars.registerPartial("rollAppCell", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/cell.html"}}`);
}

function registerHandlebarsHelpers() {
    Handlebars.registerHelper("includes", function (array: any[], value: any, options: any) {
        if (array.includes(value)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("ifeq", function (v1, v2, options) {
        if (v1 === v2) return options.fn(this);
        else return options.inverse(this);
    });
    Handlebars.registerHelper("ifne", function (v1, v2, options) {
        if (v1 !== v2) return options.fn(this);
        else return options.inverse(this);
    });
    Handlebars.registerHelper("ifgt", function (v1, v2, options) {
        if (v1 > v2) return options.fn(this);
        else return options.inverse(this);
    });
    Handlebars.registerHelper("iflt", function (v1, v2, options) {
        if (v1 < v2) return options.fn(this);
        else return options.inverse(this);
    });

    Handlebars.registerHelper("isNaN", function (context, options) {
        if (isNaN(context) && !(typeof context === "string")) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("undefined", function () {
        return undefined;
    });
    Handlebars.registerHelper("commas", function (context) {
        return context.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    Handlebars.registerHelper("hasKey", function (context, key) {
        for (const prop of context) {
            if (Object.getOwnPropertyDescriptor(prop, key)) {
                return true;
            }
        }
        return false;
    });
}

export async function setupNpcRoller() {
    Hooks.on("renderJournalDirectory", enableNpcRollerButton);

    await registerHandlebarsTemplates();
    registerHandlebarsHelpers();
}

function enableNpcRollerButton(app: Application, html: JQuery) {
    const button = $(
        `<button><i class="fa fa-dice"></i> ${game.i18n.localize(`${MODULENAME}.npc-roller.button-label`)}</button>`
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

    static get defaultOptions(): ApplicationOptions {
        const options = super.defaultOptions;
        return {
            ...options,
            title: game.i18n.localize(`${MODULENAME}.npc-roller.title`),
            template: `modules/${MODULENAME}/templates/feature/npc-roller/index.html`,
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

    getData(options?: any): any {
        const data = super.getData(options);

        data["data"] = {
            levels: duplicate(SCALE_APP_DATA),
        };

        data["data"]["selected"] = canvas.tokens?.controlled.map((token: Token) =>
            parseInt(token.actor?.system["details"].level.value)
        );

        return data;
    }

    activateListeners(html: JQuery<HTMLElement>): void {
        super.activateListeners(html);

        html.find("button.rollable").on("click", this.#handleRollButtonClick);
    }

    #onControlToken() {
        setTimeout(this.render.bind(this), 0);
    }

    async #handleRollButtonClick(event): Promise<void> {
        const target = $(event.target);
        const rollName = target.data("rollname") as string;
        const token = (canvas as Canvas).tokens?.controlled[0];
        const formula = target.data("formula") as string | number | undefined;
        const secret = <boolean>game?.keyboard?.isModifierActive(KeyboardManager.MODIFIER_KEYS.CONTROL);

        if (formula) {
            const formulaString = formula.toString();

            await new Roll(formulaString).toMessage(
                {
                    speaker: ChatMessage.getSpeaker({ token: token?.document }),
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

    close(): Promise<void> {
        Hooks.off("controlToken", this.#onControlToken.bind(this));

        return super.close();
    }
}
