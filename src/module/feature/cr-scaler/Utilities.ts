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

export function getFolder(name: string) {
    return game.folders?.getName(name);
}

export function getFolderInFolder(name: string, parentName?: string) {
    let parent: any;
    if (parentName) {
        parent = game.folders?.getName(parentName);
        return parent.getSubfolders().find((f) => f.name === name);
    } else {
        return getFolder(name);
    }
}

export function getActor(name: string, folder: string): Actor | undefined {
    return game.actors?.find((a) => a.name === name && a.folder?.name === folder) as any;
}
