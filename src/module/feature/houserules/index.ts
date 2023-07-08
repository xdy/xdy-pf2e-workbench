// Function that sets  game.i18n.translations.PF2E.Flail to "Flail" if it is undefined

export function patchFlail() {
    game.i18n.translations.PF2E["Item"].Weapon.CriticalSpecialization.flail =
        "The target must succeed at a @Check[type:dexterity|dc:resolve(@actor.attributes.classDC.value)|name:Houseruled Flail Critical Specialization] save or be knocked @UUID[Compendium.pf2e.conditionitems.j91X7x0XSomq8d60]{Prone}.";
    game.i18n.translations.PF2E["Item"].Weapon.CriticalSpecialization.hammer =
        "The target must succeed at a @Check[type:fortitude|dc:resolve(@actor.attributes.classDC.value)|name:Houseruled Hammer Critical Specialization] save or be knocked @UUID[Compendium.pf2e.conditionitems.j91X7x0XSomq8d60]{Prone}.";
}
