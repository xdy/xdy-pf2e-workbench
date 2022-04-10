import { MODULENAME } from "../../xdy-pf2e-workbench";
import { ChatMessagePF2e } from "@module/chat-message";

declare class AutoAnimations {
    static playAnimation(messageToken: TokenDocument, from: any, item: any, { playOnMiss: boolean });
}

export async function playAnimationAndSound(message: ChatMessagePF2e) {
    const messageToken = canvas?.scene?.tokens.get(<string>message.data.speaker.token);
    const flags = message.data.flags.pf2e;
    const rollType = flags.context?.type;
    if (messageToken && rollType === "attack-roll") {
        const degreeOfSuccess = flags.context?.outcome ?? "";
        const pack = game.packs.get("xdy-pf2e-workbench.xdy-pf2e-workbench-items");
        const item = ((await pack?.getDocuments()) ?? []).find(
            (item: any) => item.data.name === "AutoAnimationTemplate"
        );
        let animation = "";
        let sound = "";
        switch (degreeOfSuccess) {
            case "criticalSuccess":
                if (game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessAnimation")) {
                    animation =
                        <string>game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessAnimation") || animation;
                }
                if (game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessSound")) {
                    sound = <string>game.settings.get(MODULENAME, "automatedAnimationOnCritSuccessSound") || sound;
                }
                break;
            case "criticalFailure":
                if (game.settings.get(MODULENAME, "automatedAnimationOnCritFailAnimation")) {
                    animation =
                        <string>game.settings.get(MODULENAME, "automatedAnimationOnCritFailAnimation") || animation;
                }
                if (game.settings.get(MODULENAME, "automatedAnimationOnCritFailSound")) {
                    sound = <string>game.settings.get(MODULENAME, "automatedAnimationOnCritFailSound") || sound;
                }
                break;
            case "failure":
                if (game.settings.get(MODULENAME, "automatedAnimationOnFailAnimation")) {
                    animation = <string>game.settings.get(MODULENAME, "automatedAnimationOnFailAnimation") || animation;
                }
                if (game.settings.get(MODULENAME, "automatedAnimationOnFailSound")) {
                    sound = <string>game.settings.get(MODULENAME, "automatedAnimationOnFailSound") || sound;
                }
                break;
            case "success":
                if (game.settings.get(MODULENAME, "automatedAnimationOnSuccessAnimation")) {
                    animation =
                        <string>game.settings.get(MODULENAME, "automatedAnimationOnSuccessAnimation") || animation;
                }
                if (game.settings.get(MODULENAME, "automatedAnimationOnFailSound")) {
                    sound = <string>game.settings.get(MODULENAME, "automatedAnimationOnSuccessSound") || sound;
                }
                break;
        }
        if (pack && item && (animation || sound) && message.user && message.user.targets) {
            if (game.modules.get("autoanimations")?.active) {
                await pack.configure({ locked: false });
                if (animation) {
                    await item.setFlag("autoanimations", "options.customPath", animation);
                } else {
                    await item.unsetFlag("autoanimations", "options.customPath");
                }
                const from = Array.from(message.user.targets);
                await AutoAnimations.playAnimation(messageToken, from, item, {
                    playOnMiss: !degreeOfSuccess.toLowerCase().includes("success"),
                });
            }
            if (sound && game.modules.get("sequencer")?.active) {
                // @ts-ignore
                await new Sequence(MODULENAME)
                    .sound()
                    .file(await pickSound(sound))
                    .fadeInAudio(100)
                    .fadeOutAudio(100)
                    .play();
            }
        }
    }

    async function pickSound(sound: string): Promise<string> {
        let toPlay: string;
        toPlay =
            (await game?.tables
                ?.find((table) => table.name === sound)
                ?.draw({ displayChat: false })
                .then((draw) => {
                    return draw.results[0].getChatText();
                })) ?? sound;

        if (toPlay === sound) {
            const sounds = game.playlists.getName(sound)?.sounds;
            if (sounds) {
                toPlay = (<PlaylistSound>Array.from(sounds)[Math.floor(Math.random() * sounds.size)]).data.path;
            }
        }

        return toPlay;
    }
}
