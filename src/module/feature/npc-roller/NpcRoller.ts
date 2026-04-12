import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { logWarn } from "../../utils.js";
import SCALE_APP_DATA from "../npc-scale-data.json" with { type: "json" };

export async function registerNpcRollerHandlebarsTemplates(): Promise<void> {
    await foundry.applications.handlebars.loadTemplates([
        `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/table.hbs`,
        `modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs`,
    ]);

    Handlebars.registerPartial("rollAppTable", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/table.hbs"}}`);
    Handlebars.registerPartial("rollAppCell", `{{> "modules/${MODULENAME}/templates/feature/npc-roller/cell.hbs"}}`);
}

export async function setupNpcRoller(): Promise<void> {
    Hooks.on("renderJournalDirectory", enableNpcRollerButton);

    await registerNpcRollerHandlebarsTemplates();
}

export function enableNpcRollerButton(_app: unknown, html: HTMLElement): void {
    // Create the button element
    const button = document.createElement("button");
    button.innerHTML = `<i class="fa fa-dice"></i> ${game.i18n.localize(`${MODULENAME}.npcRoller.button-label`)}`;
    button.addEventListener("click", () => {
        new NpcRoller().render({ force: true }); // Handle button click
    });

    // Locate the footer using querySelector
    const footer = html.querySelector(".directory-footer.action-buttons");
    if (footer) {
        footer.appendChild(button); // Append the button to the footer
    } else {
        logWarn("enableNpcRollerButton: Footer element not found.");
    }
}

export class NpcRoller extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.api.ApplicationV2,
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static override DEFAULT_OPTIONS: Record<string, any> = {
        id: "xdy-pf2e-workbench-npc-roller",
        window: {
            resizable: true,
        },
        position: { width: 800, height: "auto" },
    };

    override get title(): string {
        return game.i18n.localize(`${MODULENAME}.npcRoller.title`);
    }

    static override get PARTS() {
        return {
            index: { template: `modules/${MODULENAME}/templates/feature/npc-roller/index.hbs` },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static override TABS: Record<string, any> = {
        primary: {
            tabs: [
                { id: "roll-app-strike" },
                { id: "roll-app-damage" },
                { id: "roll-app-ac" },
                { id: "roll-app-save" },
                { id: "roll-app-hp" },
                { id: "roll-app-spell" },
                { id: "roll-app-dc" },
                { id: "roll-app-areaDamage" },
                { id: "roll-app-perception" },
                { id: "roll-app-skill" },
                { id: "roll-app-abilityScore" },
            ],
            initial: "roll-app-strike",
        },
    };

    public constructor(options?: any) {
        super(options);
    }

    override async _prepareContext(options?: object): Promise<object> {
        // @ts-expect-error TODO fix
        const context = await super._prepareContext(options);
        return foundry.utils.mergeObject(context, {
            data: {
                levels: fu.deepClone(SCALE_APP_DATA),
                selected: canvas.tokens?.controlled.map((token) => token.actor?.system["details"].level.value),
            },
        });
    }

    override async _preparePartContext(partId: string, context: object, options?: object): Promise<object> {
        // @ts-expect-error TODO fix
        context = await super._preparePartContext(partId, context, options);
        if (partId === "index") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (context as any).tabs = this._prepareTabs("primary");
        }
        return context;
    }

    // @ts-expect-error TODO fix
    override _onRender(_context: object, _options: object): void {
        const tabButtons = Array.from(this.element.querySelectorAll<HTMLElement>("[role='tab'][data-tab]"));
        const tabPanels = Array.from(this.element.querySelectorAll<HTMLElement>(".tab[data-tab]:not([role='tab'])"));
        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const tabId = btn.dataset.tab!;
                const group = btn.dataset.group ?? "primary";
                this.tabGroups[group] = tabId;
                tabButtons
                    .filter((b) => b.dataset.group === group)
                    .forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
                tabPanels
                    .filter((p) => p.dataset.group === group)
                    .forEach((p) => p.classList.toggle("active", p.dataset.tab === tabId));
            });
        });

        this.element
            .querySelectorAll("button.rollable")
            .forEach((btn) => btn.addEventListener("click", (event) => this.#handleRollButtonClick(event)));
    }

    static onControlToken(): void {
        // @ts-expect-error TODO fix
        const roller = Object.values(ui.windows).find((w) => w.id === "xdy-pf2e-workbench-npc-roller") as NpcRoller;
        if (roller) {
            roller.render({ force: true });
        }
    }

    async #handleRollButtonClick(event: Event): Promise<void> {
        const target = event.currentTarget as HTMLButtonElement;
        const rollName = target.dataset.rollname as string;
        const token = canvas.tokens?.controlled[0];
        const formula = target.dataset.formula as string | number | undefined;
        const keyboardManager = foundry.helpers.interaction.KeyboardManager;
        const secret = game.keyboard.isModifierActive(keyboardManager.MODIFIER_KEYS.CONTROL);

        if (formula) {
            let roll: ConstructorOf<Roll> | undefined;
            const formulaString = formula.toString();
            const lowerCase = rollName.toLowerCase();
            if (lowerCase.includes("damage")) {
                roll = CONFIG.Dice.rolls.find((r) => r.name === "DamageRoll");
                if (!roll) throw new Error("DamageRoll doesn't exist‽");
            } else {
                roll = Roll;
            }
            // @ts-expect-error TODO fix
            await new roll(formulaString).toMessage(
                {
                    speaker: ChatMessage.getSpeaker({ token: <any>token?.document }),
                    flavor: rollName,
                    whisper: ChatMessage.getWhisperRecipients("GM").map((u) => u.id),
                },
                {
                    messageMode: secret ? CONST.DICE_ROLL_MODES.PRIVATE : game.settings.get("core", "messageMode"),
                    create: true,
                },
            );
        }
    }
}
