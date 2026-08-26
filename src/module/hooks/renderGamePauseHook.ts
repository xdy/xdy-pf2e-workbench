import { phase, Phase } from "../lifecycle.ts";
import { getModuleSetting } from "../utils.ts";

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
    const imagePath = getModuleSetting<string>("customPauseImage");
    const text = getModuleSetting<string>("customPauseText");
    const noSpin = getModuleSetting("pauseImageNoSpin");
    if (imagePath === "" && !text && !noSpin) return;

    if (!document?.querySelector("#pause")?.classList.contains("paused")) {
        return;
    }

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
        document.documentElement.style.setProperty("--xdy-pf2e-workbench-pause", url);
    }

    if (phase >= Phase.READY) {
        const element = document.querySelector<HTMLElement>("#pause > figcaption");
        const pauseImage = document.querySelector("#pause > img");

        if (text && element) {
            element.textContent = text;
        }

        if (noSpin) {
            pauseImage?.classList.remove("fa-spin");
        } else {
            pauseImage?.classList.add("fa-spin");
        }
    }
}
