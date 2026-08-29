/* Copyright 2020 Andrew Cuccinello, 2022 Jonas Karlsson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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

import type { IDicePool } from "./NPCScalerTypes.ts";
import SCALE_APP_DATA from "../npc-scale-data.json" with { type: "json" };

interface ScaleEntry {
    level: number;
    [key: string]: number | IDicePool | { minimum: number; maximum: number } | undefined;
}

type ScaleTable = ScaleEntry[];

function parseDamage(value: string): IDicePool {
    const [diceString, bonusString] = value.split("+");
    let bonus = 0;
    if (bonusString !== undefined) {
        bonus = parseInt(bonusString);
    }

    const [diceCountString, diceSizeString] = diceString.split("d");
    const result = {
        diceCount: parseInt(diceCountString),
        diceSize: parseInt(diceSizeString),
        original: value,
        average: 0,
        bonus,
    };

    result.average = ((result.diceSize + 1) / 2) * result.diceCount + result.bonus;

    return result;
}

function constructFormula({
    diceCount,
    diceSize,
    bonus,
}: {
    diceCount: number;
    diceSize: number;
    bonus: number;
}) {
    let formula = `${diceCount}d${diceSize}`;
    if (bonus > 0) {
        formula = `${formula}+${bonus}`;
    }
    return formula;
}

export function getLeveledData(key: keyof typeof SCALE_APP_DATA, oldValue: number, oldLevel: number, newLevel: number) {
    const data = SCALE_APP_DATA[key] as ScaleTable;
    const oldLevelData = data[oldLevel + 1];
    const newLevelData = data[newLevel + 1];

    let bestMatch: { key: string; delta: number } = { key: "undefined", delta: Number.MAX_SAFE_INTEGER };
    for (const entry of Object.entries(oldLevelData)) {
        const entryKey = entry[0];
        if (entryKey === "level") {
            continue;
        }

        const value = Number(entry[1]);
        const delta = Math.abs(value - oldValue);

        if (delta < bestMatch.delta) {
            bestMatch = {
                key: entryKey,
                delta,
            };
        }
    }

    const result = {
        value: newLevelData[bestMatch.key] as number,
        delta: oldValue - (oldLevelData[bestMatch.key] as number),
        total: 0,
    };
    result.total = result.value + result.delta;

    return result;
}

export function getHPData(oldValue: number, oldLevel: number, newLevel: number): number {
    const data = SCALE_APP_DATA["hitPoints"] as ScaleTable;
    const oldLevelData = data[oldLevel + 1];
    const newLevelData = data[newLevel + 1];

    // try to find an exact match
    let bestMatch: { key: string; percentile: number; delta: number } = {
        key: "undefined",
        percentile: 0,
        delta: Number.MAX_SAFE_INTEGER,
    };
    for (const entry of Object.entries(oldLevelData)) {
        const key = entry[0];
        if (key === "level") {
            continue;
        }

        const entryValue = entry[1] as { die: number; maximum: number; minimum: number };
        const { minimum, maximum } = entryValue;
        const range = maximum - minimum;
        const percentile = (oldValue - minimum) / range;
        const dMin = Math.abs(oldValue - minimum);
        const dMax = Math.abs(oldValue - maximum);
        const delta = Math.min(dMin, dMax);

        if (oldValue > minimum && oldValue < maximum) {
            bestMatch = {
                key,
                percentile,
                delta,
            };
            break;
        } else {
            if (delta < bestMatch.delta) {
                bestMatch = {
                    key,
                    percentile,
                    delta,
                };
            }
        }
    }

    const newValue = newLevelData[bestMatch.key] as { minimum: number; maximum: number };
    return Math.round(newValue.minimum + (newValue.maximum - newValue.minimum) * bestMatch.percentile);
}

export function getMinMaxData(
    key: "resistance" | "weakness",
    oldValue: number,
    oldLevel: number,
    newLevel: number,
): number {
    const data = SCALE_APP_DATA[key] as { level: number; maximum: number; minimum: number }[];
    const oldLevelData = data[oldLevel + 1];
    const newLevelData = data[newLevel + 1];

    const oldRange = Math.abs(oldLevelData.maximum - oldLevelData.minimum);
    const oldPercentile = (oldValue - oldLevelData.minimum) / oldRange;

    const newRange = Math.abs(newLevelData.maximum - newLevelData.minimum);
    return Math.round(newLevelData.minimum + newRange * oldPercentile);
}

function constructRelativeDamage(oldDmg: IDicePool, stdDmg: IDicePool, newDmg: IDicePool): IDicePool {
    const count = newDmg.diceCount;
    const size = newDmg.diceSize;
    const bonus = newDmg.bonus + oldDmg.bonus - stdDmg.bonus;

    return parseDamage(
        constructFormula({
            diceCount: count,
            diceSize: size,
            bonus,
        }),
    );
}

export function getDamageData(oldValue: string, oldLevel: number, newLevel: number): string {
    const data = SCALE_APP_DATA["strikeDamage"] as ScaleTable;
    const oldLevelData = data[oldLevel + 1];
    const newLevelData = data[newLevel + 1];
    const parsedOldValue = parseDamage(oldValue);

    let bestMatch: { key: string; delta: number } = { key: "undefined", delta: Number.MAX_SAFE_INTEGER };
    for (const entry of Object.entries(oldLevelData)) {
        const key = entry[0];
        if (key === "level") {
            continue;
        }

        const value = entry[1] as IDicePool;
        const delta = Math.abs(value.average - parsedOldValue.average);

        if (delta < bestMatch.delta) {
            bestMatch = {
                key,
                delta,
            };
        }
    }

    if (bestMatch.delta < parsedOldValue.average * 0.5) {
        return constructRelativeDamage(
            parsedOldValue,
            oldLevelData[bestMatch.key] as IDicePool,
            newLevelData[bestMatch.key] as IDicePool,
        ).original;
    } else {
        return oldValue;
    }
}

export function getAreaDamageData(oldValue: string, oldLevel: number, newLevel: number): string {
    const data = SCALE_APP_DATA["areaDamage"] as ScaleTable;
    const oldLevelData = data[oldLevel + 1];
    const newLevelData = data[newLevel + 1];
    const parsedOldValue = parseDamage(oldValue);

    let bestMatch: { key: string; delta: number } = { key: "undefined", delta: Number.MAX_SAFE_INTEGER };
    for (const entry of Object.entries(oldLevelData)) {
        const key = entry[0];
        if (key === "level") {
            continue;
        }

        const value = entry[1] as IDicePool;
        const delta = Math.abs(value.average - parsedOldValue.average);

        if (delta < bestMatch.delta) {
            bestMatch = {
                key,
                delta,
            };
        }
    }

    if (bestMatch.delta < parsedOldValue.average * 0.5) {
        return constructRelativeDamage(
            parsedOldValue,
            oldLevelData[bestMatch.key] as IDicePool,
            newLevelData[bestMatch.key] as IDicePool,
        ).original;
    } else {
        return oldValue;
    }
}
