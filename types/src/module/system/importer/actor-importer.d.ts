import { CharacterPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { AncestrySource, BackgroundSource, ClassSource } from "@item/data";
import { ABCManagerOptions } from "@item/abc/manager";
export declare class ActorImporter {
    /**
     * Adds an ancestry to a given character. Linked features are created automatically.
     * @param {CharacterPF2e} character The character actor to create the item in
     * @param {string | AncestrySource} ancestry The english ancestry name as a string or the source of the ancestry item to create
     * @param {ABCManagerOptions} options Additional options that are passed to the ABC-Manager
     * @returns {Promise<ItemPF2e[]>} A Promise which resolve to an array of the items that were created
     */
    static addAncestry(character: CharacterPF2e, ancestry: string | AncestrySource, options: ABCManagerOptions): Promise<ItemPF2e[]>;
    /**
     * Adds a background to a given character. Linked features are created automatically.
     * @param {CharacterPF2e} character The character actor to create the item in
     * @param {string | BackgroundSource} background The english background name as a string or the source of the background item to create
     * @param {ABCManagerOptions} options Additional options that are passed to the ABC-Manager
     * @returns {Promise<ItemPF2e[]>} A Promise which resolve to an array of the items that were created
     */
    static addBackground(character: CharacterPF2e, background: string | BackgroundSource, options: ABCManagerOptions): Promise<ItemPF2e[]>;
    /**
     * Adds a class to a given character. Linked features are created automatically.
     * @param {CharacterPF2e} character The character actor to create the item in
     * @param {string | ClassSource} cls The english class name as a string or the source of the class item to create
     * @param {ABCManagerOptions} options Additional options that are passed to the ABC-Manager
     * @returns {Promise<ItemPF2e[]>} A Promise which resolve to an array of the items that were created
     */
    static addClass(character: CharacterPF2e, cls: string | ClassSource, options: ABCManagerOptions): Promise<ItemPF2e[]>;
}
