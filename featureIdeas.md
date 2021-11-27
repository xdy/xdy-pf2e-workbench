My current ideas (as in, no guarantee they'll ever actually get done) are:

    NPC Mystifier:
      A module that when a creature is dropped on the canvas renames it to something like 'Unknown ' + Size trait + Type trait. E.g. 'Young Copper Dragon' would become 'Unknown Large Dragon' and stores the original name on a flag on the token. A token button and/or a macro that if called on an actor with that flag set, revert it to the original name is also needed.
        Bonus: Add additional traits based on Recall Knowledge roll, or just all the time? E.g. the above might become 'Unknown Large Earth Dragon'.
        Bonus: With the option to keep type secret and just set 'Creature' instead.
        Bonus: Possibly roll random type and additional traits for crit fails on CK. So, the above might become 'Unknown Large Undead Demon'. :)
        Bonus: Option to skip size as that's visible from token size anyway.
        Bonus: Have the gm somehow see both the token and actor name. Perhaps like 'Unknown Large Dragon (Young Copper Dragon)'
        Status: In progress

    Quicklootify:
      Module or macro that when one drags an item to a scene creates a Loot Actor and puts the item in that loot actor, giving the loot actor the item's image and name.
        Status: No action so far
        Responses: [6:43 PM] Tim: This could easily just be a core thing, not a module thing [6:44 PM] Tim: If no actor, make loot actor. If loot actor, add to loot actor inventory.
        TODO: Look what https://github.com/ultrakorne/better-rolltables does

    PF2e Merchant Restock:
      Module or macro to restock merchant. Takes merchant actor, item category and number to stock, adds that many of each item in category to merchant.
        MVP: Macro where one changes variables to change the parameters, the defaults are for Otari (everything but consumables level 4, consumables level 10)
        Bonus: Pop up a dialog where one can change the parameters
        Status: Occasionally hacking on an incomplete and really ugly macro

    PF2e Random Merchant
      Module or macro that runs https://tois.thealchemistslab.dev/ and takes the results from it and creates/updates a loot actor with the results.
        MVP: a macro that makes user paste in csv and set up actor from that using the equipment compendium
        Bonus:  Configure what compendium/s to search.
        Status: Should probably just be a bonus feature of PF2e Merchant Restock.

    Unblocker:
      Module that allows walls (including unidirectional ones) to have a 'condition to ignore' that could be a skill check, or having a particular ability, etc.
      
    Exploration Manager:
      Feature that for each of the exploration activities adds an effect that does 'the appropriate things' to the character with it. A few examples below:
        * Avoid Notice: halve speed (unless Swift Sneak/Legendary Sneak), sets initiative to Stealth, 
        * Defend: Halve speed, add Raised shield effect (will expiration work right for that?)
        * Detect Magic: Halve speed (and note whether that is more or less than 300 and/or 150 feet/minute, and choice to lower speed to that)
        * Follow the Expert: Select an expert (i.e. other character) to follow, select skill and skill proficiency, get +2/+3/+4 bonus to that skill.
        * Hustle: Double speed (with an expiration equal to Constitution modifier × 10 (minimum 10 minutes).
        * Investigate: Halve speed, select a skill. How to handle GM side?
        * Repeat a Spell: Halve speed, choose cantrip (max 2 actions) and get the effect from it. OR choose Spell or Activation to Sustain (and get effect from it), with an expiration of 10 minutes (possibly modifiable to handle any special cases).
        * Scout: Halve speed, sets initiative to Perception, adds a button to the hud to send Scout initiative bonus to chat (support for Scouts warning)
        * Search: Halve speed (and note whether that is more or less than 300 and/or 150 feet/minute, and choice to lower speed to that, as modified by Expeditious Search). How to handle GM side?
        * Other: Maybe do something? Maybe not. (Other than set icon)
             

Not really pf2 related, but, I still want them:

    Unspacer:
      Module that allows one to change from space for pause button as gm
