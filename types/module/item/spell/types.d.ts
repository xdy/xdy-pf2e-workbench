import { MAGIC_SCHOOLS, MAGIC_TRADITIONS, SPELL_COMPONENTS } from "./values";
declare type MagicSchool = SetElement<typeof MAGIC_SCHOOLS>;
declare type MagicTradition = SetElement<typeof MAGIC_TRADITIONS>;
declare type SpellComponent = typeof SPELL_COMPONENTS[number];
declare type SpellTrait = keyof ConfigPF2e["PF2E"]["spellTraits"] | MagicSchool | MagicTradition;
export { MagicSchool, MagicTradition, SpellComponent, SpellTrait };
