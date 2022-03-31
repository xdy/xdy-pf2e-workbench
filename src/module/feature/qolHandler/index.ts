import { MODULENAME } from "../../xdy-pf2e-workbench";

export function chatCardCollapse(html: JQuery) {
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
