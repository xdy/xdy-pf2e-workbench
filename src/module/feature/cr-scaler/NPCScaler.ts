/*
 * Copyright 2021 Andrew Cuccinello
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

const EMBEDDED_ENTITY_TYPE = "Item";

export async function scaleNPCToLevel(actor: Actor, newLevel: number) {
    const rootFolder = getFolder("cr-scaler"); //TODO Turn into setting again

    const folderName = `Level ${newLevel}`;
    const folder =
        getFolderInFolder(folderName, rootFolder?.name as string) ??
        (await Folder.create({
            name: folderName,
            type: "Actor",
            parent: rootFolder ? rootFolder.id : "",
        }));

    const oldLevel = parseInt(actor.data.data["details"].level.value);
    const data = {
        folder: folder.id,
        ["data.details.level.value"]: newLevel,
    };

    // parse attribute modifiers
    for (const [key, attr] of Object.entries(actor.data.data["abilities"])) {
        const mod = getLeveledData("abilityScore", parseInt((attr as any).mod), oldLevel, newLevel).total;
        const value = 10 + mod * 2;
        const min = 3;

        data[`data.abilities.${key}`] = { value, min, mod };
    }

    // parse resistances
    const drData: any[] = [];
    for (let i = 0; i < actor.data.data["traits"].dr.length; i++) {
        const dr = actor.data.data["traits"].dr[i];

        drData.push({
            label: dr.label,
            type: dr.type,
            exceptions: dr.exceptions ?? "",
            value: getMinMaxData("resistance", parseInt(dr.value), oldLevel, newLevel).toString(),
        });
    }
    data["data.traits.dr"] = drData;

    // parse vulnerabilities
    const dvData: any[] = [];
    for (let i = 0; i < actor.data.data["traits"].dv.length; i++) {
        const dv = actor.data.data["traits"].dv[i];

        dvData.push({
            label: dv.label,
            type: dv.type,
            exceptions: dv.exceptions ?? "",
            value: getMinMaxData("weakness", parseInt(dv.value), oldLevel, newLevel).toString(),
        });
    }
    data["data.traits.dv"] = dvData;

    // parse simple modifiers
    data["data.attributes.ac.base"] = getLeveledData(
        "armorClass",
        parseInt(actor.data.data["attributes"].ac.base),
        oldLevel,
        newLevel
    ).total;
    data["data.attributes.perception.base"] = getLeveledData(
        "perception",
        parseInt(actor.data.data["attributes"].perception.base),
        oldLevel,
        newLevel
    ).total;
    data["data.saves.fortitude.base"] = getLeveledData(
        "savingThrow",
        parseInt(actor.data.data["saves"].fortitude.base),
        oldLevel,
        newLevel
    ).total;
    data["data.saves.reflex.base"] = getLeveledData(
        "savingThrow",
        parseInt(actor.data.data["saves"].reflex.base),
        oldLevel,
        newLevel
    ).total;
    data["data.saves.will.base"] = getLeveledData(
        "savingThrow",
        parseInt(actor.data.data["saves"].will.base),
        oldLevel,
        newLevel
    ).total;

    const hp = getHPData(parseInt(actor.data.data["attributes"].hp.max), oldLevel, newLevel);
    data["data.attributes.hp.max"] = hp;
    data["data.attributes.hp.value"] = hp;

    console.warn(actor.data);

    let itemUpdates: IDataUpdates[] = [];
    for (const itemId of actor.items.keys()) {
        const item: any = actor.items.get(itemId);

        console.warn(item);

        if ((item.type as IHandledItemType) === "lore") {
            const oldValue = parseInt(item.data.data.mod.value);
            const newValue = getLeveledData("skill", oldValue, oldLevel, newLevel).total;
            itemUpdates.push({
                _id: item.id,
                ["data.mod.value"]: newValue,
            });
        } else if ((item.type as IHandledItemType) === "spellcastingEntry") {
            const oldAttack = parseInt(item.data.data.spelldc.value);
            const newAttack = getLeveledData("spell", oldAttack, oldLevel, newLevel).total;

            const oldDC = parseInt(item.data.data.spelldc.dc);
            const newDC = getLeveledData("difficultyClass", oldDC, oldLevel, newLevel).total;

            itemUpdates.push({
                _id: item.id,
                ["data.spelldc.value"]: newAttack,
                ["data.spelldc.dc"]: newDC,
            });
        } else if ((item.type as IHandledItemType) === "melee") {
            const oldAttack = parseInt(item.data.data.bonus.value);
            const newAttack = getLeveledData("spell", oldAttack, oldLevel, newLevel).total;

            const attackUpdate: IDataUpdates = {
                _id: item.id,
                ["data.bonus.value"]: newAttack,
                ["data.bonus.total"]: newAttack,
            };

            const damage = item.data.data.damageRolls as any[] | object;

            if (Array.isArray(damage)) {
                for (let i = 0; i < damage.length; i++) {
                    attackUpdate[`data.damageRolls.${i}.damage`] = getDamageData(damage[i].damage, oldLevel, newLevel);
                    attackUpdate[`data.damageRolls.${i}.damageType`] = damage[i].damageType;
                }
            } else {
                // Fix for #2 - some actors contain key/value pairs instead of array elements
                for (const key in damage) {
                    attackUpdate[`data.damageRolls.${key}.damage`] = getDamageData(
                        damage[key].damage,
                        oldLevel,
                        newLevel
                    );
                    attackUpdate[`data.damageRolls.${key}.damageType`] = damage[key].damageType;
                }
            }

            itemUpdates.push(attackUpdate);
        }
    }
    console.warn(itemUpdates);

    let newActor: Actor | undefined = getActor(actor.name as string, folder.name);
    if (newActor !== undefined) {
        await newActor.update(data);
    } else {
        newActor = actor.clone(data);
        newActor = (await Actor.create(newActor?.data as any)) as Actor;
    }

    // @ts-ignore
    await newActor.updateEmbeddedDocuments(EMBEDDED_ENTITY_TYPE, itemUpdates);

    itemUpdates = [];
    for (const item of actor.items.filter((i) => i.data.data["description"].value.includes("DC"))) {
        const DC_REGEX = /(data-pf2-dc=")([0-9]+)(")/g;
        const description = item.data.data["description"].value as string;
        let newDescription = description;
        let match: RegExpExecArray | null = DC_REGEX.exec(description);

        let indexOffset = 0;
        while (match !== null) {
            const [fullMatch, attribute, value, suffix] = match;
            const index = match.index + indexOffset;
            const newDCValue = getLeveledData("difficultyClass", parseInt(value), oldLevel, newLevel).total;
            const newDCString = `data-pf2-dc="${newDCValue}"`;

            newDescription =
                newDescription.substr(0, index) + newDCString + newDescription.substr(index + fullMatch.length);

            indexOffset += newDescription.length - description.length - indexOffset;

            match = DC_REGEX.exec(description);
        }

        itemUpdates.push({
            _id: item.id as string,
            ["data.description.value"]: newDescription,
        });
    }

    // @ts-ignore
    await newActor.updateEmbeddedDocuments(EMBEDDED_ENTITY_TYPE, itemUpdates);

    itemUpdates = [];
    for (const item of newActor.items.values()) {
        const DMG_REGEX = /[0-9]+d[0-9]+(\+[0-9]*)?/g;
        const description = item.data.data["description"].value as string;
        let newDescription = description;
        let match: RegExpExecArray | null = DMG_REGEX.exec(description);
        let indexOffset = 0;
        while (match !== null) {
            const [fullMatch] = match;
            const index = match.index + indexOffset;
            const newDamageFormula = getAreaDamageData(fullMatch, oldLevel, newLevel);

            newDescription =
                newDescription.substr(0, index) + newDamageFormula + newDescription.substr(index + fullMatch.length);

            indexOffset += newDescription.length - description.length - indexOffset;

            match = DMG_REGEX.exec(description);
        }

        itemUpdates.push({
            _id: item.id as string,
            ["data.description.value"]: newDescription,
        });
    }

    // @ts-ignore
    await newActor.updateEmbeddedDocuments(EMBEDDED_ENTITY_TYPE, itemUpdates);
}
