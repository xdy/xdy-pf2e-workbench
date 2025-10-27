import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { SCALE_APP_DATA } from "../NPCScaleData.js";

export async function registerNpcRollerHandlebarsTemplates() {
    if (foundry.utils.isNewerVersion(game.version, 13)) {
        await foundry.applications.handlebars.loadTemplates([
            `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
            `modules/${MODULENAME}/templates/feature/npc-roller/table.hbs`,
            `modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs`,
        ]);
    } else {
        // v12 remove later
        // @ts-expect-error
        await loadTemplates([
            `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
            `modules/${MODULENAME}/templates/feature/npc-roller/table.hbs`,
            `modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs`,
        ]);
    }

    Handlebars.registerPartial("rollAppTable", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/table.hbs"}}`);
    Handlebars.registerPartial("rollAppCell", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs"}}`);
}

export async function setupNpcRoller() {
    Hooks.on("renderJournalDirectory", enableNpcRollerButton);

    await registerNpcRollerHandlebarsTemplates();
}

export function enableNpcRollerButton(_app: unknown, html: JQuery | HTMLElement) {
    if (foundry.utils.isNewerVersion(game.version, 13)) {
        // Create the button element
        const button = document.createElement("button");
        button.innerHTML = `<i class="fa fa-dice"></i> ${game.i18n.localize(`${MODULENAME}.npcRoller.button-label`)}`;
        button.addEventListener("click", () => {
            new NpcRoller().render(true); // Handle button click
        });

        // Locate the footer using querySelector
        // @ts-expect-error
        const footer = html.querySelector(".directory-footer.action-buttons");
        if (footer) {
            footer.appendChild(button); // Append the button to the footer
        } else {
            console.warn("enableNpcRollerButton: Footer element not found.");
        }
    } else {
        // v12 remove later
        const button = $(
            `<button><i class="fa fa-dice"></i> ${game.i18n.localize(`${MODULENAME}.npcRoller.button-label`)}</button>`,
        );
        button.on("click", () => {
            new NpcRoller().render(true);
        });

        // @ts-expect-error
        const footer = html.find(".directory-footer.action-buttons");
        if (footer.length > 0) {
            footer.append(button);
        }
    }
}

class NpcRoller extends foundry.appv1.api.Application {
    public constructor(options?: foundry.appv1.api.ApplicationV1Options) {
        super(options);

        Hooks.on("controlToken", this.#onControlToken.bind(this));
    }

    static override get defaultOptions(): foundry.appv1.api.ApplicationV1Options {
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
            levels: fu.deepClone(SCALE_APP_DATA),
        };

        data["data"]["selected"] = canvas.tokens?.controlled.map((token) => token.actor?.system["details"].level.value);

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
        const token = canvas.tokens?.controlled[0];
        const formula = target.data("formula") as string | number | undefined;
        const keyboardManager = foundry.utils.isNewerVersion(game.version, 13)
            ? foundry.helpers.interaction.KeyboardManager
            : // @ts-expect-error v12 remove later
              keyboardManager;
        const secret = game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.CONTROL);

        if (formula) {
            let roll: ConstructorOf<Roll> | undefined;
            const formulaString = formula.toString();
            const lowerCase = rollName.toLowerCase();
            if (lowerCase.includes("damage")) {
                roll = CONFIG.Dice.rolls.find((r) => r.name === "DamageRoll");
            } else {
                roll = Roll;
            }
            // @ts-ignore
            await new roll(formulaString).toMessage(
                {
                    speaker: ChatMessage.getSpeaker({ token: <any>token?.document }),
                    flavor: rollName,
                    whisper: ChatMessage.getWhisperRecipients("GM").map((u) => u.id),
                },
                {
                    rollMode: secret ? CONST.DICE_ROLL_MODES.PRIVATE : game.settings.get("core", "rollMode"),
                    create: true,
                },
            );
        }
    }

    override close(): Promise<void> {
        Hooks.off("controlToken", this.#onControlToken.bind(this));

        return super.close();
    }
}
