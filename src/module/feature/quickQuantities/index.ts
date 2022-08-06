//This file has been changed by me, the original copyright statement is given unchanged below. Original file can be found at https://github.com/Djphoenix719/FVTT-PF2EToolbox/blob/master/src/module/features/QuickQuantities.ts

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

export function onQuantitiesHook(app: ActorSheet, html: JQuery) {
    const increaseQuantity = html.find(".item-increase-quantity");
    const decreaseQuantity = html.find(".item-decrease-quantity");

    increaseQuantity.off("click");
    decreaseQuantity.off("click");

    const actor = app.actor as Actor;

    const getAmount = (event: JQuery.ClickEvent): number => {
        let amount = 1;
        if (event.shiftKey) amount *= 5;
        if (event.ctrlKey) amount *= 10;
        return amount;
    };

    increaseQuantity.on("click", async (event) => {
        const itemId = $(event.currentTarget).parents(".item").attr("data-item-id") ?? "";
        const item = actor.items.get(itemId) as Item;

        const quantity = Number(item.system["quantity"]) + getAmount(event) ?? 0;
        await actor.updateEmbeddedDocuments("Item", [
            {
                _id: itemId,
                "data.quantity": quantity > 0 ? quantity : 0,
            },
        ]);
    });

    decreaseQuantity.on("click", async (event) => {
        const itemId = $(event.currentTarget).parents(".item").attr("data-item-id") ?? "";
        const item = actor.items.get(itemId) as Item;

        if (Number(item.system["quantity"]) > 0) {
            const quantity = Number(item.system["quantity"]) - getAmount(event) ?? 0;
            await actor.updateEmbeddedDocuments("Item", [
                {
                    _id: itemId,
                    "data.quantity": quantity > 0 ? quantity : 0,
                },
            ]);
        }
    });
}
