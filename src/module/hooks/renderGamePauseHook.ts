import { MODULENAME, phase, Phase } from "../xdy-pf2e-workbench.js";

function encodeUriPathSegment(text: string): string {
    try {
        const isEncoded = text !== decodeURIComponent(text);
        return isEncoded ? text : encodeURIComponent(text);
    } catch {
        // text contains a raw % sign
        return encodeURIComponent(text);
    }
}

export function renderGamePauseHook(): void {
    if (!document?.querySelector("#pause")?.classList.contains("paused")) {
        return;
    }

    const style = document.documentElement.style;

    const imagePath = <string>game.settings.get(MODULENAME, "customPauseImage");

    if (imagePath !== "") {
        let url: string;
        if (/^https?:/i.test(imagePath)) {
            const imageUrl = new URL(imagePath);
            const strings = imageUrl.pathname.split("/");
            strings.forEach((str, index) => {
                strings[index] = encodeUriPathSegment(str);
            });
            imageUrl.pathname = strings.join("/");

            url = `url("${imageUrl}")`;
        } else {
            url = `url("../../../${encodeUriPathSegment(imagePath)}")`;
        }
        style.setProperty("--xdy-pf2e-workbench-pause", url);
    }

    if (phase >= Phase.READY) {
        const element = document.querySelector<HTMLElement>("#pause > figcaption");
        const pauseImage = document.querySelector("#pause > img");

        const text = <string>game.settings.get(MODULENAME, "customPauseText");

        if (text && element) {
            element.textContent = text;
        }

        if (game.settings.get(MODULENAME, "pauseImageNoSpin")) {
            pauseImage?.classList.remove("fa-spin");
        } else {
            pauseImage?.classList.add("fa-spin");
        }
    }
}
