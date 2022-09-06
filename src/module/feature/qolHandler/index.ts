import { MODULENAME } from "../../xdy-pf2e-workbench";

export function chatCardDescriptionCollapse(html: JQuery) {
    const eye = ' <i style="font-size: small" class="fa-solid fa-eye-slash">';
    if (game.settings.get(MODULENAME, "autoCollapseItemChatCardContent") === "collapsedDefault") {
        html.find(".card-content").hide();
        $(html)
            .find("h3")
            .html($(html).find("h3").html() + eye);
    }
    html.on("click", "h3", (event: JQuery.ClickEvent) => {
        const content = event.currentTarget.closest(".chat-message")?.querySelector(".card-content");
        if (content && content.style) {
            event.preventDefault();
            content.style.display = content.style.display === "none" ? "block" : "none";
            if (content.style.display === "none") {
                html.find(".card-content").hide();
                $(event.currentTarget).html($(event.currentTarget).html() + eye);
            } else {
                if ($(event.currentTarget).html().includes(eye)) {
                    $(event.currentTarget).html($(event.currentTarget).html().split(eye)[0]);
                }
            }
        }
    });
}

export function damageCardExpand(html: JQuery) {
    const expandDmg = <string>game.settings.get(MODULENAME, "autoExpandDamageRolls");
    if (expandDmg === "expandedAll") {
        html.find(".dice-tooltip").css("display", "block");
    }

    if (expandDmg.startsWith("expandedNew")) {
        const slice = game.messages.contents
            .filter((m) => m.data.flags.pf2e.damageRoll)
            .slice(-Math.min(expandDmg.endsWith("est") ? 1 : 3, game.messages.size));
        const map = slice.map((m) => m.id);
        const includes = map.includes(html.data("message-id"));
        if (includes) {
            html.find(".dice-tooltip").css("display", "block");
        }
    }
}
