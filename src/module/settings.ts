export const getBooleanSetting = (key: string) => <boolean>game.settings.get("xdy-pf2e-workbench", key);

export const registerSettings = function (): void {
    _booleanSetting("NpcMystifierOn", true);
    _booleanSetting("NpcMystifierAddRandomNumber", true);

    //Utility functions
    function _booleanSetting(key: string, defaultValue: boolean, scope = "world", onChange = undefined): void {
        game.settings.register("xdy-pf2e-workbench", key, {
            name: game.i18n.localize(`xdy-pf2e-workbench.settings.${key}.name`),
            hint: game.i18n.localize(`xdy-pf2e-workbench.settings.${key}.hint`),
            scope: scope,
            config: true,
            default: defaultValue,
            type: Boolean,
            onChange: onChange,
        });
    }

    //
    //   function _numberSetting(key: string, defaultValue: number, scope = 'world', onChange = undefined): void {
    //     localGame.settings.register('twodsix', key.replace('.', ''), {
    //       name: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.name`),
    //       hint: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.hint`),
    //       scope: scope,
    //       config: true,
    //       default: defaultValue,
    //       type: Number,
    //       onChange: onChange,
    //     });
    //   }
    //
    //   function _stringChoiceSetting(
    //     key: string,
    //     defaultValue: string,
    //     choices: Record<string, string>,
    //     scope = 'world',
    //     onChange: undefined,
    //   ): void {
    //     localGame.settings.register('twodsix', key.replace('.', ''), {
    //       name: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.name`),
    //       hint: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.hint`),
    //       scope: scope,
    //       config: true,
    //       default: defaultValue,
    //       type: String,
    //       onChange: onChange,
    //       choices: choices,
    //     });
    //   }
    //
    //   function _stringSetting(key: string, defaultValue: string, scope = 'world', onChange = undefined): void {
    //     localGame.settings.register('twodsix', key.replace('.', ''), {
    //       name: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.name`),
    //       hint: localGame.i18n.localize(`xdy-pf2e-workbench.settings.${key}.hint`),
    //       scope: scope,
    //       config: true,
    //       default: defaultValue,
    //       type: String,
    //       onChange: onChange,
    //     });
    //   }
};
