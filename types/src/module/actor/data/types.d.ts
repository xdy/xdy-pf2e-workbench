import { DC_SLUGS, SAVE_TYPES, SKILL_LONG_FORMS } from "./values";
declare type SaveType = typeof SAVE_TYPES[number];
declare type SkillLongForm = SetElement<typeof SKILL_LONG_FORMS>;
declare type DCSlug = SetElement<typeof DC_SLUGS>;
export { DCSlug, SaveType, SkillLongForm };
