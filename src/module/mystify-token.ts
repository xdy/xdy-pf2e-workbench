import { generateNameFromTraits } from "./traits-name-generator";
import { MODULENAME } from "./xdy-pf2e-workbench";
import { mystifyKey } from "./settings";

export async function mystifyToken(token: Token | null, mystified: boolean): Promise<string> {
    if (token === null) return "";
    let name = token?.name || "";
    if (token) {
        if (mystified) {
            if ((game as Game).settings.get(MODULENAME, "npcMystifierKeepRandomNumberWhenDemystified")) {
                name = `${token?.actor?.name} ${name?.match(/\d+$/)?.[0] ?? ""}`;
            } else {
                name = token?.actor?.name || "";
            }
        } else {
            switch ((game as Game).settings.get(MODULENAME, "npcMystifierMethod")) {
                default:
                    name = generateNameFromTraits(token);
            }
            if ((game as Game).settings.get(MODULENAME, "npcMystifierAddRandomNumber")) {
                let rolled = Math.floor(Math.random() * 100) + 1;
                //Retry once if the number is already used, can't be bothered to roll until unique or keep track of used numbers
                if ((game as Game).scenes?.active?.tokens?.find((t) => t.name.endsWith(rolled.toString()))) {
                    rolled = Math.floor(Math.random() * 100) + 1;
                }
                name += ` ${rolled}`;
            }
        }
    }
    if (token.document) {
        await token.document.update({ name: name });
    } else {
        token.data.name = name;
        token.data.update(token.data);
    }

    return name;
}

export function preTokenCreateMystification(token: Token) {
    if (
        (game as Game).user?.isGM &&
        (game as Game).keyboard?.isDown(mystifyKey) &&
        (!(game as Game).keyboard?.isDown("V") || (game as Game).keyboard?.isDown("Insert"))
    ) {
        mystifyToken(token, isTokenNameDifferent(token));
    }
}

function isTokenNameDifferent(token: Token | null): boolean {
    const tokenName = token?.data.name;
    const actorName = token?.actor?.name;
    if (
        tokenName !== actorName &&
        (game as Game).settings.get(MODULENAME, "npcMystifierKeepRandomNumberWhenDemystified")
    ) {
        const tokenNameNoNumber = tokenName?.trim().replace(/\d+$/, "").trim();
        const actorNameNoNumber = actorName?.replace(/\d+$/, "").trim();
        return tokenNameNoNumber !== actorNameNoNumber;
    }
    return tokenName !== actorName || false;
}

export function renderNameHud(data: any, html: JQuery<HTMLElement>) {
    let token: Token | null;
    if ((game as Game).user?.isGM && canvas instanceof Canvas && canvas && canvas.tokens) {
        token = canvas.tokens.get(data._id) ?? null;

        const title = isTokenNameDifferent(token) ? "Unmystify" : "Mystify";
        const toggle = $(
            `<div class="control-icon ${
                isTokenNameDifferent(token) ? "active" : ""
            }" > <i class="fas fa-eye-slash"  title=${title}></i></div>`
        );
        toggle.on("click", async (e) => {
            const hudElement = $(e.currentTarget);
            const active = hudElement.hasClass("active");
            if (isTokenNameDifferent(token) === active) {
                await mystifyToken(token, active);
            }
            hudElement.toggleClass("active");
        });
        html.find("div.col.left").append(toggle);
    }
}
