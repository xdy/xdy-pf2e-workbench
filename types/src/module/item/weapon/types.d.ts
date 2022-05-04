import { PreciousMaterialType } from "@item/physical/types";
declare type WeaponMaterialType = Exclude<PreciousMaterialType, "dragonhide" | "grisantian-pelt">;
declare type WeaponMaterialEffect = Extract<WeaponMaterialType, "abysium" | "adamantine" | "coldIron" | "djezet" | "mithral" | "noqual" | "peachwood" | "silver" | "sovereignSteel">;
export { WeaponMaterialEffect, WeaponMaterialType };
