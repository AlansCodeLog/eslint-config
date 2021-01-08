const tsOverridesSettings = require("./typescript").overrides[0]

/** For some old snake cased projects. */
module.exports = {
	overrides: [
		{
			...tsOverridesSettings,
			rules: {
				"@typescript-eslint/naming-convention": ["warn",
					{ selector: "default", format: ["snake_case"], leadingUnderscore: "allowSingleOrDouble", trailingUnderscore: "allowSingleOrDouble" },
					{ selector: "variable", format: ["snake_case", "UPPER_CASE"], leadingUnderscore: "allow", trailingUnderscore: "allow" },

					// allow leading underscore to be of any format
					{ selector: "memberLike", format: null, leadingUnderscore: "allowSingleOrDouble", filter: { match: true, regex: "_|__" } },
					// leading forbid is just so they match the above instead
					{ selector: "memberLike", modifiers: ["private"], format: ["snake_case"], leadingUnderscore: "forbid", trailingUnderscore: "forbid" },
					{ selector: "memberLike", modifiers: ["public"], format: ["camelCase"], leadingUnderscore: "forbid", trailingUnderscore: "forbid" },

					{ selector: "typeLike", format: ["PascalCase"], leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "property", format: null, leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "typeProperty", format: null, leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "objectLiteralProperty", format: null, leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "enum", format: ["UPPER_CASE"], leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "enumMember", format: ["UPPER_CASE", "PascalCase", "snake_case"], leadingUnderscore: "allow", trailingUnderscore: "allow" },
					{ selector: "typeParameter", format: ["PascalCase"], prefix: ["T"]}],
			},
		},
	],
}
