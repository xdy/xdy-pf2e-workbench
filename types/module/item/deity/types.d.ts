import enJSON from "../../../../static/lang/en.json";
declare type DeityDomain = Lowercase<keyof typeof enJSON["PF2E"]["Item"]["Deity"]["Domain"]>;
export { DeityDomain };
