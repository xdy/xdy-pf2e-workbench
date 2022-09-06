/*
 * Copyright 2021 Andrew Cuccinello, 2022 Jonas Karlsson
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IDataUpdates, IHandledItemType } from "./NPCScalerTypes";
import { getActor, getFolder, getFolderInFolder } from "./Utilities";
import { getAreaDamageData, getDamageData, getHPData, getLeveledData, getMinMaxData } from "./NPCScalerUtil";
import { NPCPF2e } from "@actor";

declare const PHYSICAL_ITEM_TYPES: Set<
    "consumable" | "armor" | "backpack" | "book" | "equipment" | "treasure" | "weapon"
>;

export async function scaleNPCToLevelFromActor(actorId: string, newLevel: number) {
    const actor = <NPCPF2e>game.actors.get(actorId);
    if (actor) {
        scaleNPCToLevel(actor, newLevel);
    }
}

export async function scaleNPCToLevel(actor: NPCPF2e, newLevel: number) {
    const rootFolder = getFolder("cr-scaler");

    const folderName = `Level ${newLevel}`;
    const folder =
        getFolderInFolder(folderName, rootFolder?.name as string) ??
        (await Folder.create({
            name: folderName,
            type: "Actor",
            parent: rootFolder ? rootFolder.id : "",
        }));

    const oldLevel = actor.system.details.level.value;
    const updateData = {
        folder: folder.id,
        ["system.details.level.value"]: newLevel,
    };

    // parse attribute modifiers
    for (const [key, attr] of Object.entries(actor.system.abilities)) {
        const mod = getLeveledData("abilityScore", parseInt((attr as any).mod), oldLevel, newLevel).total;
        const value = 10 + mod * 2;
        const min = 3;

        updateData[`system.abilities.${key}`] = { value, min, mod };
    }

    // parse resistances
    const drData: any[] = [];
    for (let i = 0; i < actor.system.traits.dr.length; i++) {
        const dr = actor.system.traits.dr[i];

        drData.push({
            label: dr.label,
            type: dr.type,
            exceptions: dr.exceptions ?? "",
            value: getMinMaxData("resistance", dr.value, oldLevel, newLevel).toString(),
        });
    }
    updateData["system.traits.dr"] = drData;

    // parse vulnerabilities
    const dvData: any[] = [];
    for (let i = 0; i < actor.system.traits.dv.length; i++) {
        const dv = actor.system.traits.dv[i];

        dvData.push({
            label: dv.label,
            type: dv.type,
            exceptions: dv.exceptions ?? "",
            value: getMinMaxData("weakness", dv.value, oldLevel, newLevel).toString(),
        });
    }
    updateData["system.traits.dv"] = dvData;

    // parse simple modifiers
    updateData["system.attributes.ac.value"] = getLeveledData(
        "armorClass",
        actor.system.attributes.ac?.value ?? 0,
        oldLevel,
        newLevel
    ).total;
    updateData["system.attributes.perception.value"] = getLeveledData(
        "perception",
        actor.system.attributes["perception"].value,
        oldLevel,
        newLevel
    ).total;
    updateData["system.saves.fortitude.value"] = getLeveledData(
        "savingThrow",
        actor.system.saves.fortitude.value ?? 0,
        oldLevel,
        newLevel
    ).total;
    updateData["system.saves.reflex.value"] = getLeveledData(
        "savingThrow",
        actor.system.saves.reflex.value ?? 0,
        oldLevel,
        newLevel
    ).total;
    updateData["system.saves.will.value"] = getLeveledData(
        "savingThrow",
        actor.system.saves.reflex.value ?? 0,
        oldLevel,
        newLevel
    ).total;

    const hp = getHPData(actor.system.attributes.hp?.max ?? 0, oldLevel, newLevel);
    updateData["system.attributes.hp.max"] = hp;
    updateData["system.attributes.hp.value"] = hp;

    let itemUpdates: IDataUpdates[] = [];
    for (const itemId of actor.items.keys()) {
        const item: any = actor.items.get(itemId);

        if ((item.type as IHandledItemType) === "lore") {
            const oldValue = parseInt(item.system.mod.value);
            const newValue = getLeveledData("skill", oldValue, oldLevel, newLevel).total;
            itemUpdates.push({
                _id: item.id,
                ["system.mod.value"]: newValue,
            });
        } else if ((item.type as IHandledItemType) === "spellcastingEntry") {
            const oldAttack = parseInt(item.system.spelldc.value);
            const newAttack = getLeveledData("spell", oldAttack, oldLevel, newLevel).total;

            const oldDC = parseInt(item.system.spelldc.dc);
            const newDC = getLeveledData("difficultyClass", oldDC, oldLevel, newLevel).total;

            itemUpdates.push({
                _id: item.id,
                ["system.spelldc.value"]: newAttack,
                ["system.spelldc.dc"]: newDC,
            });
        } else if ((item.type as IHandledItemType) === "melee") {
            const oldAttack = parseInt(item.system.bonus.value);
            const newAttack = getLeveledData("spell", oldAttack, oldLevel, newLevel).total;

            const attackUpdate: IDataUpdates = {
                _id: item.id,
                ["system.bonus.value"]: newAttack,
                ["system.bonus.total"]: newAttack,
            };

            const damage = item.system.damageRolls as any[] | object;

            if (Array.isArray(damage)) {
                for (let i = 0; i < damage.length; i++) {
                    attackUpdate[`system.damageRolls.${i}.damage`] = getDamageData(
                        damage[i].damage,
                        oldLevel,
                        newLevel
                    );
                    attackUpdate[`system.damageRolls.${i}.damageType`] = damage[i].damageType;
                }
            } else {
                // Fix for #2 - some actors contain key/value pairs instead of array elements
                for (const key in damage) {
                    attackUpdate[`system.damageRolls.${key}.damage`] = getDamageData(
                        damage[key].damage,
                        oldLevel,
                        newLevel
                    );
                    attackUpdate[`system.damageRolls.${key}.damageType`] = damage[key].damageType;
                }
            }

            itemUpdates.push(attackUpdate);
        }
    }
    console.warn(itemUpdates);

    let newActor = <any>getActor(actor.name as string, folder.name);
    if (newActor !== undefined) {
        await newActor.update(updateData);
    } else {
        newActor = actor.clone(updateData);
        newActor = (await Actor.create(newActor?._source as any)) as Actor;
    }

    await newActor.updateEmbeddedDocuments("Item", itemUpdates);

    itemUpdates = [];
    const DC_REGEXES = [/(data-pf2-dc=")(\d+)(")/g, /(@Check\[.*?type:.*?|dc:)(\d+)(.*?])/g];
    for (let regexNo = 0; regexNo < DC_REGEXES.length; regexNo++) {
        const regex = DC_REGEXES[regexNo];
        for (const item of actor.items
            .filter(
                (item) => item.system.description.value.includes("DC") || item.system.description.value.includes("dc:")
            )
            .filter((item) => (<string[]>Array.from(PHYSICAL_ITEM_TYPES)).includes(item.type)) //
            .filter((item) => !item.system.description.value.includes("type:flat"))) {
            const description = item.system.description.value;
            let newDescription = description;
            let match: RegExpExecArray | null = regex.exec(description);

            let indexOffset = 0;
            while (match !== null) {
                const fullMatch = match[0];
                let value: string;
                if (regexNo === 0) {
                    value = match[1];
                } else {
                    value = match[2];
                }
                const index = match.index + indexOffset;
                const newDCValue = getLeveledData("difficultyClass", parseInt(value), oldLevel, newLevel).total;
                const newDCString = `${match[1]}${newDCValue}${match[3]}`;

                newDescription =
                    newDescription.substring(0, index) +
                    newDCString +
                    newDescription.substring(index + fullMatch.length);

                indexOffset += newDescription.length - description.length - indexOffset;

                match = regex.exec(description);
            }

            itemUpdates.push({
                _id: item.id,
                ["system.description.value"]: newDescription,
            });
        }
    }

    await newActor.updateEmbeddedDocuments("Item", itemUpdates);

    itemUpdates = [];
    for (const item of newActor.items.values()) {
        const DMG_REGEX = /\d+d\d+(\+\d*)?/g;
        const description = item.system["description"].value as string;
        let newDescription = description;
        let match: RegExpExecArray | null = DMG_REGEX.exec(description);
        let indexOffset = 0;
        while (match !== null) {
            const [fullMatch] = match;
            const index = match.index + indexOffset;
            const newDamageFormula = getAreaDamageData(fullMatch, oldLevel, newLevel);

            newDescription =
                newDescription.substring(0, index) +
                newDamageFormula +
                newDescription.substring(index + fullMatch.length);

            indexOffset += newDescription.length - description.length - indexOffset;

            match = DMG_REGEX.exec(description);
        }

        itemUpdates.push({
            _id: item.id as string,
            ["system.description.value"]: newDescription,
        });
    }

    await newActor.updateEmbeddedDocuments("Item", itemUpdates);
}
