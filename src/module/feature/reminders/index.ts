import { ChatMessagePF2e } from "@module/chat-message";
import { shouldIHandleThis, shouldIHandleThisMessage } from "../../utils";
import { MODULENAME } from "../../xdy-pf2e-workbench";
import { TokenDocumentPF2e } from "@scene";
import { CombatantPF2e } from "@module/encounter";
import { ActorFlagsPF2e } from "@actor/data/base";

export async function reminderBreathWeapon(message: ChatMessagePF2e) {
    if (
        message.data.content &&
        game.combats &&
        game.combats.active &&
        game.combats.active.combatant &&
        game.combats.active.combatant.token &&
        shouldIHandleThisMessage(message, true, true)
    ) {
        const token: TokenDocumentPF2e = <TokenDocumentPF2e>(
            canvas?.scene?.tokens.get(<string>message.data.speaker.token)
        );

        const prefix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.prefix`);
        const postfix = game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.postfix`);
        const matcher = `.*${prefix}.*1d([46])${postfix}.*`;
        const match = message.data.content.match(matcher);
        const matchString = match ? `1d${match[1]}` : "";

        if (matchString) {
            const effect = {
                type: "effect",
                name: "Breath",
                img: "systems/pf2e/icons/spells/dragon-breath.webp",
                data: {
                    tokenIcon: {
                        show: true,
                    },
                    duration: {
                        value: 1,
                        unit: "rounds",
                        sustained: false,
                        expiry: "turn-start",
                    },
                },
            };

            effect.data.duration.value = new Roll(matchString).roll({ async: false }).total + 1;
            const title = message.data.content.match(/.*title="(.*?)" width.*/);
            effect.name =
                game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.used`) +
                (title ? title[1] : game.i18n.localize(`${MODULENAME}.SETTINGS.reminderBreathWeapon.defaultName`));
            // @ts-ignore
            await token.actor?.createEmbeddedDocuments("Item", [effect]);
        }
    }
}

export async function actionsReminder(combatant: CombatantPF2e) {
    if (
        combatant &&
        combatant.actor &&
        shouldIHandleThis(
            combatant.isOwner ? game.user?.id : null,
            ["all", "players"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow")),
            ["all", "gm"].includes(<string>game.settings.get(MODULENAME, "actionsReminderAllow"))
        )
    ) {
        if (
            combatant.actor.hasCondition("stunned") ||
            combatant.actor.hasCondition("slowed") ||
            combatant.actor.hasCondition("quickened")
        ) {
            const stunned = combatant.actor.getCondition("stunned")?.value ?? 0;
            const slowed = combatant.actor.getCondition("slowed")?.value ?? 0;
            const quickened = combatant.actor.hasCondition("quickened") ? 1 : 0;
            const maxActions = 3 + quickened;
            let autoReduceStunnedMessage = "";
            if (stunned && game.settings.get(MODULENAME, "actionsReminderAutoReduceStunned")) {
                const stunReduction = Math.min(stunned, maxActions);
                for (let i = 0; i < stunReduction; i++) {
                    await combatant.actor?.decreaseCondition("stunned");
                }
                autoReduceStunnedMessage = `Stunned reduced by ${stunReduction}.<br>`;
            }
            const actionsMessage = `${autoReduceStunnedMessage}${combatant.token?.name} has ${Math.max(
                maxActions - Math.max(stunned, slowed),
                0
            )} actions remaining.`;
            // ui.notifications.info(actionsMessage);
            await ChatMessage.create(
                {
                    flavor: actionsMessage,
                    whisper: !combatant.actor?.hasPlayerOwner
                        ? ChatMessage.getWhisperRecipients("GM").map((u) => u.id)
                        : [],
                },
                {}
            );
        }
    }
}

export async function reminderTargeting(message: ChatMessagePF2e) {
    if (
        message.data &&
        message.data.flags &&
        message.user &&
        ["spell-attack-roll", "attack-roll"].includes(
            <string>(<ActorFlagsPF2e>message.data.flags.pf2e).context?.type
        ) &&
        shouldIHandleThisMessage(message, true, true)
    ) {
        const targets = message.user.targets;
        if (!targets || targets.size === 0) {
            ui.notifications.info(game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.note`));
        }
    }
}
