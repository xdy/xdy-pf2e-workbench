import { MODULENAME } from "../../xdy-pf2e-workbench";
import { isActuallyDamageRoll, nth } from "../../utils";

export function chatCardDescriptionCollapse(html: JQuery) {
    // const eye = ' <i style="font-size: small" class="fa-solid fa-eye-slash">';
    if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault") {
        html.find(".card-content").hide();
        // $(html)
        //     .find("h3")
        //     .html($(html).find("h3").html() + eye);
    }
    html.on("click", "h3", (event: JQuery.ClickEvent) => {
        const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
        if (content && content.style) {
            event.preventDefault();
            content.style.display = content.style.display === "none" ? "block" : "none";
            if (content.style.display === "none") {
                html.find(".card-content").hide();
                // $(event.currentTarget).html($(event.currentTarget).html() + eye);
            } else {
                // if ($(event.currentTarget).html().includes(eye)) {
                //     $(event.currentTarget).html($(event.currentTarget).html().split(eye)[0]);
                // }
            }
        }
    });
}

export function damageCardExpand(message: ChatMessage, html: JQuery) {
    const expandDmg = <string>game.settings.get(MODULENAME, "autoExpandDamageRolls");
    if (expandDmg === "expandedAll") {
        html.find(".dice-tooltip").css("display", "block");
    }

    if (expandDmg.startsWith("expandedNew")) {
        if (
            game.messages.contents
                .filter(isActuallyDamageRoll)
                .slice(-Math.min(expandDmg.endsWith("est") ? 1 : 3, game.messages.size))
                .filter((m) => m.id === message.id).length > 0
        ) {
            html.find(".dice-tooltip").css("display", "block");
        }
    }
}

export function addGmRKButtonToNpc($html: JQuery, sheet: ActorSheet) {
    $html.find(".recall-knowledge").each((_i, e) => {
        const token = sheet.token;
        if (token) {
            $(e)
                .find(".section-body")
                .each((_i, e) => {
                    const $e = $(e);
                    if ($e.find(".identification-skills").length === 0) {
                        return;
                    }
                    for (const s of $e.find("ul").text().trim().split("\n")) {
                        const skill = s.toLowerCase().trim();
                        $e.append(
                            `<button class="gm-recall-knowledge-${skill}" data-skill="${skill}" data-dcs="${<string>(
                                $e.find(".identification-skills")[0].title
                            )}" data-token="${token?.id}">Recall Knowledge: ${skill}</button>`
                        );
                        const b = `.gm-recall-knowledge-${skill}`;
                        $html.find(b).on("click", async (e) => {
                            const attr = <string>$(e.currentTarget).attr("data-token");
                            // @ts-ignore
                            const token: any = game?.scenes?.active?.tokens?.get(attr);
                            const skill = $(e.currentTarget).attr("data-skill");
                            const dcs = (<string>$(e.currentTarget).attr("data-dcs")).split("/") || [];

                            const name = game.settings.get(MODULENAME, "addGmRKButtonToNpcHideNpcName")
                                ? ""
                                : ` about ${token?.name}`;
                            let content = `To Recall Knowledge${name}, roll:`;

                            for (let i = 0; i < dcs.length; i++) {
                                content += `<br>${i + 1}${nth(i + 1)}: @Check[type:${skill}|dc:${
                                    dcs[i]
                                }|traits:secret,action:recall-knowledge]`;
                                content += game.settings.get(MODULENAME, "addGmRKButtonToNpcHideSkill")
                                    ? `{Recall Knowledge} `
                                    : " ";
                            }
                            ChatMessage.create({
                                content: TextEditor.enrichHTML(content, { async: false }),
                                speaker: ChatMessage.getSpeaker({ token: token }),
                            }).then();
                        });
                    }
                });
        }
    });
}
