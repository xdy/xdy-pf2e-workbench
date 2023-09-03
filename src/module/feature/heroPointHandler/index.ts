// These usecases should be handled
// * Show a new handle  r, set timeout to 60, ignore on the first, none on the second
// * Check on an existing timer, recalc timeout, ignore on the first, none on the second
// * Timeout, recalc timeout, ignore on the first, random on the second

import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { pushNotification } from "../../utils.js";

export enum HPHState {
    Start,
    Check,
    Timeout,
}

const ONE_MINUTE_IN_MS = 60 * 1000;

async function stopTimer() {
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.startTime");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.timeout");
}

export async function startTimer(remainingMinutes: number) {
    const oldTimeout = <NodeJS.Timeout>game.user?.getFlag(MODULENAME, "heroPointHandler.timeout");
    if (oldTimeout) {
        clearTimeout(oldTimeout);
    }
    if (remainingMinutes > 0) {
        const ms = remainingMinutes * ONE_MINUTE_IN_MS;
        const timeout = setTimeout(async () => {
            await heroPointHandler(HPHState.Timeout);
        }, ms);

        const updateData = {
            flags: {
                "xdy-pf2e-workbench": {
                    heroPointHandler: {
                        startTime: game.time.serverTime,
                        remainingMinutes: remainingMinutes,
                        timeout: timeout,
                    },
                },
            },
        };
        await game.user?.update(updateData);
    } else if (!remainingMinutes || remainingMinutes <= 0) {
        await stopTimer();
    }
}

export function createRemainingTimeMessage(remainingMinutes: number) {
    const message =
        remainingMinutes > 0
            ? game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.willBeResetIn`, {
                  remainingMinutes: remainingMinutes,
                  time: new Date(Date.now() + remainingMinutes * ONE_MINUTE_IN_MS).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                  }),
              })
            : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerStopped`);
    return ChatMessage.create(
        {
            flavor: message,
            whisper: [game.user?.id as string],
        },
        {},
    );
}

export async function callHeroPointHandler() {
    return heroPointHandler(HPHState.Timeout);
}

export async function heroPointHandler(state: HPHState) {
    if (
        Object.values(ui.windows).find((w: Application) =>
            w.title.includes(`${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)}`),
        )
    ) {
        return;
    }

    let remainingMinutes: number;
    switch (state) {
        case HPHState.Start:
            remainingMinutes = Number.parseInt(
                String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
            );
            break;
        case HPHState.Check:
            remainingMinutes = calcRemainingMinutes(true);
            break;
        case HPHState.Timeout:
            remainingMinutes = Number.parseInt(
                String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
            );
            break;
    }

    const title: any = `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)} (${
        remainingMinutes
            ? remainingMinutes + " " + game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.minutesLeft`)
            : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noRunningTimer`)
    })`;

    const content = await buildHtml(remainingMinutes, state);

    let button: string | null = null;
    const handlerDialog = new Dialog({
        title: title,
        content,
        buttons: {
            timer: {
                icon: '<i class="fas fa-hourglass"></i>',
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.startTimerLabel`)}`,
                callback: async (html: any) => {
                    remainingMinutes = handleDialogResponse(html);
                    button = "timer";
                },
            },
            noTimer: {
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noTimerLabel`)}`,
                callback: async (html) => {
                    handleDialogResponse(html);
                    remainingMinutes = 0;
                    button = "noTimer";
                },
            },
        },
        default: "timer",
        close: async () => {
            switch (button) {
                case "timer":
                    await startTimer(remainingMinutes);
                    break;
                case "noTimer":
                    await stopTimer();
                    break;
            }
            return await createRemainingTimeMessage(calcRemainingMinutes(false));
        },
    });
    handlerDialog.render(true);
}

async function buildHtml(remainingMinutes: number, state: HPHState) {
    // TODO How to start using bootstrap? (I use bootstrap classes in the html).
    // TODO Extract to a handlebars template

    // TODO Get user name, add within parentheses after actor name
    let charactersContent = "";

    const loggedIn =
        game?.actors
            ?.filter((x) => x.hasPlayerOwner)
            .filter((x) => x.isOfType("character"))
            .filter((x) => x.alliance === "party")
            ?.filter((actor) => {
                return !actor.system.traits?.value.toString().includes("minion");
            })
            ?.filter((actor) => !actor.system.traits?.value.toString().includes("eidolon"))
            .filter((x) =>
                (
                    game?.users
                        ?.filter((user) => user.active)
                        .map((user) => user.character)
                        .filter((actor) => !!actor) || []
                ).includes(x),
            ) || [];

    let checked: number;
    switch (state) {
        case HPHState.Start:
            checked = -1;
            break;
        case HPHState.Timeout:
            checked = loggedIn.length > 0 ? Math.floor(Math.random() * loggedIn.length) : -1;
            break;
        case HPHState.Check:
            checked = -1;
            break;
    }

    const startContent = `
<div class="form-group">
<div>${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.instructions`)}</div>
<hr>
  <label class="col-md-4 control-label" for="radios">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.doWhat`,
  )}</label>
  <div class="col-md-4">
      <div class="radio">
        <label for="sessionStart-0">
          <input type="radio" name="sessionStart" id="sessionStart-0" value="RESET">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.resetTo`)}
        </label>
      </div>
      <div class="radio">
        <label for="sessionStart-1">
          <input type="radio" name="sessionStart" id="sessionStart-1" value="ADD">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.add`)}
        </label>
      </div>
      <div class="radio">
        <label for="sessionStart-2">
          <input type="radio" name="sessionStart" id="sessionStart-2" value="IGNORE" checked="checked">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.ignore`)}
        </label>
      </div>
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="heropoints">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.thisMany`,
  )}</label>
  <div class="col-md-4">
    <input id="heropoints" name="heropoints" type="number" value="1" class="form-control input-md">
  </div>
</div>

<hr>
<div class="form-group">
  <label class="col-md-4 control-label" for="characters">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.addOne`,
  )}</label>
  <div class="col-md-4">`;

    for (let i = 0; i < loggedIn.length; i++) {
        charactersContent += `
    <div class="radio">
        <label for="characters-${i}">
          <input type="radio" name="characters" id="characters-${i}" value="${loggedIn[i]?.id}" ${
              checked === i ? 'checked="checked"' : ""
          }>
          ${loggedIn[i]?.name}
        </label>
    </div>`;
    }

    const remainingContent = `
  <div class="radio">
    <label for="characters-NONE">
      <input type="radio" name="characters" id="characters-NONE" value="NONE" ${
          checked === -1 ? 'checked="checked"' : ""
      }>
      ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.none`)}
    </label>
  </div>
</div>

<hr>
<script>$('#timerTextId').on('input', function () {
    const value = $(this).val();
    if ((value !== '') && (value.indexOf('.') === -1)) {
        $(this).val(Math.max(Math.min(value, ${Number.parseInt(
            String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
        )}), 0));
    }
});</script>
<div class="form-group">
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerValue`)}</span>
      <input id="timerTextId" name="timerText" class="form-control" value="${
          remainingMinutes ||
          Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")))
      }" type="number">
    </div>
    <p class="help-block">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.showAfter`)}</p>
  </div>
</div>
`;

    return startContent + charactersContent + remainingContent;
}

export function calcRemainingMinutes(useDefault: boolean): number {
    const savedTime: number = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.startTime");
    const savedMinutes = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    const remainingMinutes: number = Math.clamped(
        savedMinutes ??
            (useDefault
                ? Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")))
                : 0),
        0,
        Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes"))),
    );
    const passedMillis = game.time.serverTime - (savedTime ?? game.time.serverTime);
    return remainingMinutes - Math.floor(passedMillis / ONE_MINUTE_IN_MS);
}

function heroes() {
    return (
        game?.actors
            ?.filter((actor) => actor.hasPlayerOwner)
            .filter((actor) => actor.isOfType("character"))
            .filter((actor) => !actor.system.traits?.value.toString().includes("minion"))
            .filter((actor) => !actor.system.traits?.value.toString().includes("eidolon")) || []
    );
}

export async function resetHeroPoints(heropoints: number) {
    for (const actor of heroes()) {
        await actor.update({
            // TODO Fix type.
            "system.resources.heroPoints.value": Math.min(heropoints, (<any>actor).system.resources.heroPoints.max),
        });
    }
}

export async function addHeroPoints(heropoints: number, actorId: any = "ALL") {
    let actors;
    switch (actorId) {
        case "ALL":
            actors = heroes();
            break;
        case "NONE":
            actors = [];
            break;
        default:
            actors = [game.actors?.get(actorId)];
            break;
    }

    for (const actor of actors) {
        const system = actor.system;
        const value = Math.min(
            system.resources.heroPoints.value + heropoints,
            (<any>actor).system.resources.heroPoints.max,
        );
        await actor.update({
            "system.resources.heroPoints.value": value,
        });
    }
}

function addOneToSelectedCharacterIfAny(actorId: string): void {
    addHeroPoints(1, actorId).then(() => {
        const name = game?.actors?.find((actor) => actor.id === actorId)?.name;
        let message: any;
        if (actorId === "ALL") {
            message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: 1,
            });
        } else if (name) {
            message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedFor`, {
                name: name,
            });
        }
        if (message) {
            ChatMessage.create({ flavor: message }, {}).then();
            if (game.settings.get(MODULENAME, "heropointHandlerNotification")) {
                pushNotification(message);
            }
        }
    });
}

function handleDialogResponse(html: any) {
    const sessionStart = html.find('input[name="sessionStart"]:checked').val();
    const heroPoints = parseInt(html.find('input[name="heropoints"]').val());
    const actorId = html.find('input[name="characters"]:checked').val();
    const remainingMinutes = parseInt(html.find('input[name="timerText"]').val());

    if (sessionStart === "RESET") {
        resetHeroPoints(heroPoints).then(() => {
            const resetMessage = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.resetToForAll`, {
                heroPoints: heroPoints,
            });
            ChatMessage.create({ flavor: resetMessage }, {}).then();
            addOneToSelectedCharacterIfAny(actorId);
        });
    } else if (sessionStart === "ADD") {
        addHeroPoints(heroPoints).then(() => {
            const addMessage = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: heroPoints,
            });

            ChatMessage.create({ flavor: addMessage }, {}).then();
            addOneToSelectedCharacterIfAny(actorId);
        });
    } else if (sessionStart === "IGNORE") {
        addOneToSelectedCharacterIfAny(actorId);
    }

    return remainingMinutes;
}
