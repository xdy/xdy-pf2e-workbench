/** Upgrade a trait with a dice annotation, if possible, or otherwise return the original trait. */
declare function upgradeWeaponTrait<TTrait extends string>(trait: TTrait): TTrait;
/**
 * Add a trait to an array of traits--unless it matches an existing trait except by annotation. Replace the trait if
 * the new trait is an upgrade, or otherwise do nothing.
 */
declare function addOrUpgradeTrait<TTrait extends string>(traits: TTrait[], newTrait: TTrait): TTrait[];
export { addOrUpgradeTrait, upgradeWeaponTrait };
