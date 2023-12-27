// types: [all, action, bestiary, campaignFeature, equipment, feat, hazard, spell] (compendium browser divisions + 'all')
//        if you need to find effects like this, too bad I guess
// fields: document fields required to index for provided filter
// filter: a function that takes one argument, returns bool, for .filter()
// strictSourcing: if true, will suppress documents with missing source information, if false they're let through
// fetch: if true, return full documents instead of the filtered index

interface GetAllFromAllowedPacksParams {
    type?: string;
    fields?: string[];
    filter?: any | null;
    strictSourcing?: boolean;
    fetch?: boolean;
}

/**
 * Retrieves all items from allowed packs based on the provided parameters.
 *
 * @param {GetAllFromAllowedPacksParams} [params] - Optional parameters to customize the retrieval.
 * @param {string} [params.type="equipment"] - The type of items to retrieve.
 * @param {string[]} [params.fields=[]] - The fields to include in the retrieved items.
 * @param {Function} [params.filter=null] - A filter function to apply to the retrieved items.
 * @param {boolean} [params.strictSourcing=true] - Whether to apply strict sourcing rules.
 * @param {boolean} [params.fetch=false] - Whether to fetch the full documents of the retrieved items.
 * @return {any[]} - An array of the retrieved items.
 */
export async function getAllFromAllowedPacks({
    type = "equipment",
    fields = [],
    filter = null,
    strictSourcing = true,
    fetch = false,
}: GetAllFromAllowedPacksParams = {}) {
    const FUNC = "getAllFromAllowedPacks";
    const browser = game.pf2e.compendiumBrowser;
    const validTypes = Object.keys(browser.settings);
    validTypes.push("all");
    const aliases = {
        actor: "bestiary",
        npc: "bestiary",
        ability: "action",
    };

    const originalType = type;
    if (!validTypes.includes(type) && !validTypes.includes((type = aliases[type] ?? ""))) {
        ui.notifications.error(`${FUNC}: invalid type ${originalType}`);
        return null;
    }
    if (!Array.isArray(fields) || (fields.length && fields.some(() => false))) {
        ui.notifications.error(`${FUNC}: fields must be an array of only strings`);
        return null;
    }
    if (filter && typeof filter !== "function") {
        ui.notifications.error(`${FUNC}: provided filter must be a function`);
        return null;
    }

    // initialize the sources list if it hasn't been set
    if (!Object.keys(browser.packLoader.sourcesSettings.sources).length) {
        await browser.packLoader.updateSources(browser.loadedPacksAll());
    }
    const packList =
        type === "all"
            ? Object.values(browser.settings).flatMap((t: any) => Object.entries(t))
            : Object.entries(browser.settings[type]);

    const loadablePacks = packList.filter(([_, p]) => (<any>p).load).map(([pack]) => pack);
    // const unloadablePacks = packList.filter(([_, p]) => !p.load).map(([pack]) => pack);
    const sources = browser.packLoader.sourcesSettings.sources;
    const values: any[] = <any[]>(<unknown>Object.values(sources));
    const loadableSources = values
        .filter((s) => s?.load)
        .map((s) =>
            s.name.slugify({
                strict: true,
            }),
        );
    fields.push("system.details.publication", "system.publication", "system.source", "system.details.source");

    const out = <any[]>[];
    const sourceFilter = (d) => {
        const slug = (
            d?.system?.details?.publication?.title ??
            d?.system?.publication?.title ??
            d?.system?.details?.source?.value ??
            d?.system?.source?.value ??
            ""
        ).slugify({
            strict: true,
        });
        if (!slug) return !strictSourcing;
        return loadableSources.includes(slug);
    };

    for (const packName of loadablePacks) {
        const pack = game.packs.get(packName);
        const initialDocs = await pack?.getIndex({
            fields,
        });
        const sourcedDocs = initialDocs?.filter(sourceFilter);
        let filteredDocs: any[] | undefined = <any[]>[];
        try {
            filteredDocs = filter ? sourcedDocs?.filter(filter) : sourcedDocs;
        } catch (error) {
            ui.notifications.error(`Error in provided filter: ${error.toString()}`);
            return null;
        }

        if (fetch) {
            const newVar = await pack?.getDocuments({
                _id__in: filteredDocs?.map((d) => d._id),
            });
            out.push(...(<any[]>newVar));
        } else {
            out.push(...(<any[]>filteredDocs));
        }
    }
    return out;
}
