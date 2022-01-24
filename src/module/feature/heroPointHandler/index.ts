//TODO Clean up horrendously ugly code...
//TODO Make sure dialog can't be opened if still open


async function resetHeroPoints(heropoints: number) {
    //TODO Don't do a bunch of updates
    game?.actors?.filter(x => x.hasPlayerOwner).filter(x => x.type === "character").forEach(actor => {
        // @ts-ignore
        actor.update({ "data.resources.heroPoints.value": <number>Math.min(heropoints, parseInt(actor.data.data.resources.heroPoints.max)), });
        // @ts-ignore
        console.log(actor.data.data.resources.heroPoints.value);
    });
}

async function addHeroPoints(heropoints: number, actorId: any = null) {
    if (actorId && actorId !== "ALL" && actorId !== "NONE") {
        const actor = game?.actors?.get(actorId);
        if (actor) {
            actor.update({
                // @ts-ignore
                "data.resources.heroPoints.value": <number>Math.min(parseInt(actor.heroPoints.value) + heropoints, parseInt(actor.data.data.resources.heroPoints.max)),
            });
        }
    } else if (actorId && actorId === "ALL") {
        const filter = game?.actors?.filter(x => x.hasPlayerOwner).filter(x => x.type === "character");
        filter?.forEach(actor => {
            //TODO Don't do a bunch of updates
            actor.update({
                // @ts-ignore
                "data.resources.heroPoints.value": <number>Math.min(parseInt(actor.heroPoints.value) + heropoints, parseInt(actor.data.data.resources.heroPoints.max)),
            });
        });
    }
}

async function handleDialog(html: any) {
    let radios = html.find('input[name="radios"]:checked').val();
    let heroPoints = parseInt(html.find('input[name="heropoints"]').val());
    let actorId = html.find('input[name="characters"]:checked').val();
    let timer = parseInt(html.find('input[name="timerText"]').val());

    //Reset or add to all
    if (radios === "RESET") {
        await resetHeroPoints(heroPoints);
    } else if (radios === "ADD") {
        await addHeroPoints(heroPoints);
    }

    //Add to random
    await addHeroPoints(1, actorId);
    return timer;
}

//TODO How to start using bootstrap? (I use bootstrap classes).
export function heroPointHandler() {
    // TODO On pressing key, open dialog, should have:
    // * Unchecked checkbox to reset heropoints for all to dropdown with default 1
    // * List of all characters with radio button next to each, and a 'ALL' radio button
    // * A random character should be selected, unless checkbox to reset all is checked, select another if you prefer.
    // * Button to start timer to open this dialog in textbox with default 60 minutes
    // * Button to just close dialog

    const startContent = `
<!-- Multiple Radios -->
<div class="form-group">
  <label class="col-md-4 control-label" for="radios">Do what to the heropoints of all characters?</label>
  <div class="col-md-4">
      <div class="radio">
        <label for="radios-0">
          <input type="radio" name="radios" id="radios-0" value="RESET" checked="checked">
          Reset to
        </label>
      </div>
      <div class="radio">
        <label for="radios-1">
          <input type="radio" name="radios" id="radios-1" value="ADD">
          Add
        </label>
      </div>
      <div class="radio">
        <label for="radios-2">
          <input type="radio" name="radios" id="radios-2" value="NOTHING">
          Ignore
        </label>
      </div>
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="heropoints">This many</label>
  <div class="col-md-4">
    <input id="heropoints" name="heropoints" type="number" value=1 class="form-control input-md">
  </div>
</div>

<!-- Multiple Radios -->
<div class="form-group">
  <label class="col-md-4 control-label" for="characters">Add one hero point to selected character (defaults to random roll)</label>
  <div class="col-md-4">`;

    //TODO Get user name, add within parentheses after actor name
    let charactersContent = "";
    let characters = game?.actors?.filter(x => x.hasPlayerOwner).filter(x => x.type === "character");
    // @ts-ignore
    const length = characters.length;
    let checked = Math.floor(Math.random() * length);
    for (let i = 0; i < length; i++) {
        const actor = characters?.filter(x => x.type === "character")[i];
        charactersContent += `
    <div class="radio">
        <label for="characters-${i}">
          <input type="radio" name="characters" id="characters-${i}" value="${actor?.id}" ${checked === i ? 'checked="checked"' : ''}>
          ${actor?.name}
        </label>
    </div>`;
    }

    const remainingContent = `
  <div class="radio">
    <label for="characters-${length + 1}">
      <input type="radio" name="characters" id="characters-2" value="ALL">
      ALL
    </label>
  </div>
  <div class="radio">
    <label for="characters-${length + 2}">
      <input type="radio" name="characters" id="characters-2" value="NONE">
      NONE
    </label>
  </div>
</div>

<!-- Prepended text-->
<div class="form-group">
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">${game.i18n.localize("timerValue")}</span>
      <input id="timerTextId" name="timerText" class="form-control" value="60" type="text">
    </div>
    <p class="help-block">${game.i18n.localize("showAfter")}</p>
  </div>
</div>
`;

    const content = startContent + charactersContent + remainingContent;

    let handlerDialog = new Dialog({
        title: `${game.i18n.localize("heropointHandlerTitle")}`,
        content,
        buttons: {
            timer: {
                icon: '<i class="fas fa-hourglass"></i>',
                label: `${game.i18n.localize("startTimerLabel")}`,
                callback: async (html: any) => {
                    const timer = await handleDialog(html);
                    setTimeout(() => {
                        heroPointHandler();
                    }, timer * 60* 1000);
                },
            },
            noTimer: {
                label: 'Submit changes <b>without</b> starting timer',
                callback: async (html) => {
                    await handleDialog(html);
                },
            },
        },
        default: 'timer',
    });
    handlerDialog.render(true);
}
