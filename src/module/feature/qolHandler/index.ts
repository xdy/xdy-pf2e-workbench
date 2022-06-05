import { MODULENAME } from "../../xdy-pf2e-workbench";

export function chatCardDescriptionCollapse(html: JQuery) {
    if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault") {
        html.find(".card-content").hide();
    }
    html.on("click", "h3", (event: JQuery.ClickEvent) => {
        const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
        if (content && content.style) {
            event.preventDefault();
            content.style.display = content.style.display === "none" ? "block" : "none";
            if (content.style.display === "none") {
                html.find(".card-content").hide();
            }
        }
    });
}

export function damageCardExpand(html: JQuery) {
    if (game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedAll") {
        html.find(".dice-tooltip").css("display", "block");
    }

    if (game.settings.get(MODULENAME, "autoExpandDamageRolls") === "expandedNew") {
        for (let i = 1; i <= Math.min(3, game.messages.size); i++) {
            if ((game.messages?.contents[game.messages.size - i]?.id || null) === (html.data("message-id") || null)) {
                html.find(".dice-tooltip").css("display", "block");
            }
        }
    }
}
