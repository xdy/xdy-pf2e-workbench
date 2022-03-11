//These usecases should be handled
// * Show a new handler, set timeout to 60, ignore on the first, none on the second
// * Check on an existing timer, recalc timeout, ignore on the first, none on the second
// * Timeout, recalc timeout, ignore on the first, random on the second

export enum HPHState {
    Start,
    Check,
    Timeout,
}

import { MODULENAME } from "../../xdy-pf2e-workbench";

export async function startTimer(remainingMinutes: number) {
    const oldTimeout = <NodeJS.Timeout>game.user?.getFlag(MODULENAME, "heroPointHandler.timeout");
    if (oldTimeout) {
        clearTimeout(oldTimeout);
    }
    if (remainingMinutes > 0) {
        const timeout = setTimeout(async () => {
            await heroPointHandler(HPHState.Timeout);
        }, remainingMinutes * 60 * 1000);

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
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.startTime");
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.remainingMinutes");
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.timeout");
    }
}

export async function heroPointHandler(state: HPHState) {
    if (
        Object.values(ui.windows).find((w) =>
            w.title.includes(`${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)}`)
        )
    ) {
        return;
    }

    const DEFAULT_MINUTES = 60;
    let remainingMinutes: number;
    switch (state) {
        case HPHState.Start:
            remainingMinutes = DEFAULT_MINUTES;
            break;
        case HPHState.Check:
            remainingMinutes = calcRemainingMinutes();
            break;
        case HPHState.Timeout:
            remainingMinutes = DEFAULT_MINUTES;
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
            await startTimer(remainingMinutes);
            if (button) {
                const message =
                    remainingMinutes > 0
                        ? game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.willBeResetIn`, {
                              remainingMinutes: remainingMinutes,
                              time: new Date(Date.now() + remainingMinutes * 60 * 1000).toLocaleTimeString(),
                          })
                        : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerStopped`);
                return ChatMessage.create({ flavor: message, whisper: [game.user?.id as string] }, {});
            }
        },
    });
    handlerDialog.render(true);
}

async function buildHtml(remainingMinutes: number, state: HPHState) {
    //TODO How to start using bootstrap? (I use bootstrap classes in the html).
    //TODO Extract to a handlebars template

    //TODO Get user name, add within parentheses after actor name
    let charactersContent = "";

    const characters =
        game?.actors
            ?.filter((x) => x.hasPlayerOwner)
            .filter((x) => x.type === "character")
            .filter((x) =>
                (
                    game?.users
                        ?.filter((user) => user.active)
                        .map((user) => user.character)
                        .filter((actor) => !!actor) || []
                ).includes(x)
            )
            // @ts-ignore
            .filter((actor) => !actor.data.data.traits.traits.value.includes("minion"))
            // @ts-ignore
            .filter((actor) => !actor.data.data.traits.traits.value.includes("eidolon")) || [];

    let checked: number;
    switch (state) {
        case HPHState.Start:
            checked = -1;
            break;
        case HPHState.Timeout:
            checked = characters.length > 0 ? Math.floor(Math.random() * characters.length) : -1;
            break;
        case HPHState.Check:
            checked = -1;
            break;
    }

    const startContent = `
<div class="form-group">
<div>${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.instructions`)}</div>
  <label class="col-md-4 control-label" for="radios">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.doWhat`
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
      `${MODULENAME}.SETTINGS.heroPointHandler.thisMany`
  )}</label>
  <div class="col-md-4">
    <input id="heropoints" name="heropoints" type="number" value=1 class="form-control input-md">
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="characters">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.addOne`
  )}</label>
  <div class="col-md-4">`;

    for (let i = 0; i < characters.length; i++) {
        charactersContent += `
    <div class="radio">
        <label for="characters-${i}">
          <input type="radio" name="characters" id="characters-${i}" value="${
            characters?.filter((x) => x.type === "character")[i]?.id
        }" ${checked === i ? 'checked="checked"' : ""}>
          ${characters?.filter((x) => x.type === "character")[i]?.name}
        </label>
    </div>`;
    }

    const all =
        characters.length > 0
            ? `
  <div class="radio">
    <label for="characters-ALL">
      <input type="radio" name="characters" id="characters-ALL" value="ALL">
      ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.all`)}
    </label>
  </div>`
            : "";
    const remainingContent = `${all}
  <div class="radio">
    <label for="characters-NONE">
      <input type="radio" name="characters" id="characters-NONE" value="NONE" ${
          checked === -1 ? 'checked="checked"' : ""
      }>
      ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.none`)}
    </label>
  </div>
</div>

<div class="form-group">
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerValue`)}</span>
      <input id="timerTextId" name="timerText" class="form-control" value="${remainingMinutes || 60}" type="text">
    </div>
    <p class="help-block">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.showAfter`)}</p>
  </div>
</div>
`;

    return startContent + charactersContent + remainingContent;
}

export function calcRemainingMinutes() {
    const flag = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.startTime");
    const startTime = flag || game.time.serverTime;
    const result = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    return result - Math.floor((game.time.serverTime - startTime) / (60 * 1000));
}

function heroes() {
    return (
        game?.actors
            ?.filter((actor) => actor.hasPlayerOwner)
            .filter((actor) => actor.type === "character")
            // @ts-ignore
            .filter((actor) => !actor.data.data.traits.traits.value.includes("minion"))
            // @ts-ignore
            .filter((actor) => !actor.data.data.traits.traits.value.includes("eidolon")) || []
    );
}

async function resetHeroPoints(heropoints: number) {
    for (const actor of heroes()) {
        const value = Math.min(
            heropoints,
            // @ts-ignore
            parseInt(actor.data.data.resources.heroPoints.max)
        );
        await actor.update({
            // @ts-ignore
            "data.resources.heroPoints.value": value,
        });
    }
}

async function addHeroPoints(heropoints: number, actorId: any = "ALL") {
    let actors: any[];
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
        const value = Math.min(
            // @ts-ignore
            parseInt(actor.data.data.resources.heroPoints.value) + heropoints,
            // @ts-ignore
            parseInt(actor.data.data.resources.heroPoints.max)
        );
        await actor.update({
            // @ts-ignore
            "data.resources.heroPoints.value": value,
        });
    }
}

function addOneToSelectedCharacter(actorId: any) {
    addHeroPoints(1, actorId).then(() => {
        const name = game?.actors?.find((actor) => actor.id === actorId)?.name;
        if (actorId === "ALL") {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: 1,
            });
            return ChatMessage.create({ flavor: message }, {});
        } else if (name) {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedFor`, {
                name: name,
            });
            return ChatMessage.create({ flavor: message }, {});
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
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.resetToForAll`, {
                heroPoints: heroPoints,
            });
            ChatMessage.create({ flavor: message }, {}).then();
            addOneToSelectedCharacter(actorId);
        });
    } else if (sessionStart === "ADD") {
        addHeroPoints(heroPoints).then(() => {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: heroPoints,
            });

            ChatMessage.create({ flavor: message }, {}).then();
            addOneToSelectedCharacter(actorId);
        });
    } else if (sessionStart === "IGNORE") {
        addOneToSelectedCharacter(actorId);
    }

    return remainingMinutes;
}
