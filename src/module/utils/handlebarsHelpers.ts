export function registerHandlebarsHelpers(): void {
    Handlebars.registerHelper("xdy_includes", function (array: any[], value: any, options: any) {
        if (array.includes(value)) {
            // @ts-expect-error TODO fix typing
            return options.fn(this);
        } else {
            // @ts-expect-error TODO fix typing
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("xdy_ifeq", function (v1, v2, options) {
        // @ts-expect-error TODO fix typing
        if (v1 === v2) return options.fn(this);
        else return options.inverse();
    });
    Handlebars.registerHelper("xdy_ifne", function (v1, v2, options) {
        // @ts-expect-error TODO fix typing
        if (v1 !== v2) return options.fn(this);
        else return options.inverse();
    });

    Handlebars.registerHelper("xdy_isNaN", function (context, options) {
        if (isNaN(context) && !(typeof context === "string")) {
            // @ts-expect-error TODO fix typing
            return options.fn(this);
        } else {
            // @ts-expect-error TODO fix typing
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("xdy_undefined", function () {
        return undefined;
    });

    Handlebars.registerHelper("xdy_hasKey", function (context, key) {
        for (const prop of context) {
            if (Object.hasOwn(prop, key)) {
                return true;
            }
        }
        return false;
    });
}
