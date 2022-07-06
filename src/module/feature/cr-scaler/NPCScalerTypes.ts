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

export type IDataUpdates = {
    _id: string;
    [key: string]: any;
};

export type IDicePool = {
    average: number;
    bonus: number;
    diceCount: number;
    diceSize: number;
    original: string;
};

export type IHandledItemType = "lore" | "spellcastingEntry" | "melee";
