//TODO Clean up horrendously ugly code...

import { MODULENAME } from "../../xdy-pf2e-workbench";

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
    const heroes1 = heroes();
    for (const actor of heroes1) {
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

async function handleDialogResponse(html: any) {
    const sessionStart = html.find('input[name="sessionStart"]:checked').val();
    const heroPoints = parseInt(html.find('input[name="heropoints"]').val());
    const actorId = html.find('input[name="characters"]:checked').val();
    const remainingMinutes = parseInt(html.find('input[name="timerText"]').val());

    //Reset or add to all
    if (sessionStart === "RESET") {
        await resetHeroPoints(heroPoints);
    } else if (sessionStart === "ADD") {
        await addHeroPoints(heroPoints);
    }

    //Add to random character
    await addHeroPoints(1, actorId);
    return remainingMinutes;
}

export async function handleTimer(remainingMinutes: number) {
    if (remainingMinutes > 0) {
        const timeout = setTimeout(() => {
            heroPointHandler();
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
    } else {
        const timeout = <NodeJS.Timeout>game.user?.getFlag(MODULENAME, "heroPointHandler.timeout");
        if (timeout) {
            clearTimeout(timeout);
        }
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.startTime");
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.remainingMinutes");
        await game.user?.unsetFlag(MODULENAME, "heroPointHandler.timeout");
    }
}

//TODO How to start using bootstrap? (I use bootstrap classes in the html).
export async function heroPointHandler() {
    const title: any = `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)}`;

    if (Object.values(ui.windows).find((w) => w.title === title)) {
        return;
    }

    const startTime = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.startTime") || game.time.serverTime;
    const remainingMinutes =
        <number>((await game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes")) || 60) -
        Math.floor((game.time.serverTime - startTime) / (60 * 1000));
    await handleTimer(remainingMinutes);

    //TODO Extract to a handlebars template
    const startContent = `
<div class="form-group">
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
          <input type="radio" name="sessionStart" id="sessionStart-2" value="NOTHING" checked="checked">
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

    //TODO Get user name, add within parentheses after actor name
    let charactersContent = "";
    const characters = game?.actors
        ?.filter((x) => x.hasPlayerOwner)
        .filter((x) => x.type === "character")
        // @ts-ignore
        .filter((actor) => !actor.data.data.traits.traits.value.includes("minion"))
        // @ts-ignore
        .filter((actor) => !actor.data.data.traits.traits.value.includes("eidolon"));
    // @ts-ignore
    const length = characters.length;
    const checked =
        ((await game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes")) || 60) === 60
            ? Math.floor(Math.random() * length)
            : -1;
    for (let i = 0; i < length; i++) {
        const actor = characters?.filter((x) => x.type === "character")[i];
        charactersContent += `
    <div class="radio">
        <label for="characters-${i}">
          <input type="radio" name="characters" id="characters-${i}" value="${actor?.id}" ${
            checked === i ? 'checked="checked"' : ""
        }>
          ${actor?.name}
        </label>
    </div>`;
    }

    const remainingContent = `
  <div class="radio">
    <label for="characters-ALL">
      <input type="radio" name="characters" id="characters-ALL" value="ALL">
      ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.all`)}
    </label>
  </div>
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
      <input id="timerTextId" name="timerText" class="form-control" value="${
          (await game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes")) || 60
      }" type="text">
    </div>
    <p class="help-block">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.showAfter`)}</p>
  </div>
</div>
`;

    const content = startContent + charactersContent + remainingContent;

    const handlerDialog = new Dialog({
        title: title,
        content,
        buttons: {
            timer: {
                icon: '<i class="fas fa-hourglass"></i>',
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.startTimerLabel`)} (${
                    (await game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes")) || 60
                })`,
                callback: async (html: any) => {
                    const minutes = await handleDialogResponse(html);
                    await handleTimer(minutes);
                },
            },
            noTimer: {
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noTimerLabel`)}`,
                callback: async (html) => {
                    await handleDialogResponse(html);
                    await handleTimer(0);
                },
            },
        },
        default: "timer",
    });
    handlerDialog.render(true);
}
