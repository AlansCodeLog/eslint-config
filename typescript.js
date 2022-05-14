/**
 * Just extending js will only make the rules apply to tjs files. We want them to also apply to typescript files. This config will take care of disabling any rules that interfere.
 */
const jsRules = require("./js").overrides[0].rules
/**
 * ⭐ means the regular version of the rule needs to be disabled, but any changes to it should be "synced" with the js version.
 */

const allowAnyUnderscores = { leadingUnderscore: "allowSingleOrDouble", trailingUnderscore: "allowSingleOrDouble" }
const allowSingleUnderscores = { leadingUnderscore: "allow", trailingUnderscore: "allow" }
const forbidUnderscores = { leadingUnderscore: "forbid", trailingUnderscore: "forbid" }
const requireLeadingUnderscore = { leadingUnderscore: "require", trailingUnderscore: "allow" }
/** Prevents underscore only identifiers from matching so they match the null rule instead and aren't checked */
const fixExceptions = { filter: { regex: "^(_+?|_constructor|_mixin)$", match: false } }


const baseOptions = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		sourceType: "module",
	},
	plugins: [
		"@typescript-eslint",
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
		jsdoc: {
			mode: "jsdoc",
			tagNamePreference: {
				link: {
					message: "@link cannot be understood by typescript/vscode yet",
					replacement: "see",
				},
			},
		},
	},
}

module.exports = {
	extends: [
		"./js",
	],
	overrides: [
		{
			files: ["**/*.d.ts"],
			...baseOptions,
			rules: {
				"spaced-comment": ["warn", "always", { markers: ["/"]}], // allow triple slash directives
			},
		},
		{
			files: ["**/*.ts"],
			...baseOptions,
			rules: {
				...jsRules,
				// #region JSDOC
				"jsdoc/no-types": ["warn", { contexts: ["any"]}],
				"jsdoc/require-description": ["warn", { descriptionStyle: "body" }],
				"jsdoc/require-throws": "warn",
				"jsdoc/require-jsdoc": "off",
				// weird whitespace issues
				// "jsdoc/require-jsdoc": ["warn", {
				// 	publicOnly: true,
				// 	contexts: [
				// 		// can't combine these?
				// 		"MethodDefinition:not([accessibility=\"private\"]) > FunctionExpression",
				// 		"MethodDefinition[key.name!=\"constructor\"]",
				// 		{ context: "ClassProperty", inlineCommentBlock: true },
				// 	],
				// 	enableFixer: false, // not working right
				// 	require: {
				// 		ArrowFunctionExpression: true,
				// 		ClassDeclaration: true,
				// 		ClassExpression: true,
				// 		FunctionDeclaration: true,
				// 		FunctionExpression: true,
				// 		MethodDefinition: false,
				// 	},
				// }],
				// #regionend

				// #region IMPORTS
				"@typescript-eslint/no-duplicate-imports": ["warn", { includeExports: false }], // ⭐
				// #regionend

				// #region STYLE - TYPESCRIPT SPECIFIC
				"@typescript-eslint/explicit-member-accessibility": ["warn", {
					accessibility: "no-public",
					overrides: {
						parameterProperties: "off",
					},
				}],
				"@typescript-eslint/member-delimiter-style": ["warn", {
					multiline: {
						delimiter: "none",
						requireLast: true,
					},
					singleline: {
						delimiter: "comma",
						requireLast: false,
					},
				}],
				"@typescript-eslint/typedef": ["warn", {
					arrowParameter: false,
					arrayDestructuring: false,
					objectDestructuring: false,
					variableDeclaration: false,
					variableDeclarationIgnoreFunction: false,
					memberVariableDeclaration: true,
					parameter: true,
					propertyDeclaration: true,
				}],
				"@typescript-eslint/array-type": "warn",
				"@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
				"@typescript-eslint/consistent-type-assertions": "warn",
				"@typescript-eslint/parameter-properties": ["warn", { prefer: "class-property" }],
				"@typescript-eslint/prefer-function-type": "warn",
				"@typescript-eslint/prefer-enum-initializers": "warn",
				"@typescript-eslint/prefer-literal-enum-member": "off",
				"@typescript-eslint/no-unnecessary-type-constraint": "warn",
				"@typescript-eslint/non-nullable-type-assertion-style": "warn",
				// #regionend

				// #region STYLE - CLASS RELATED
				"@typescript-eslint/lines-between-class-members": ["warn", { exceptAfterOverload: false }],

				"@typescript-eslint/no-dupe-class-members": "warn", // ⭐
				// #regionend

				// #region STYLE - NAMING
				"@typescript-eslint/naming-convention": ["warn",
					{ selector: ["default"], format: null, ...allowAnyUnderscores, filter: { ...fixExceptions.filter, match: true } },
					{ selector: ["default"], format: ["strictCamelCase"], ...allowSingleUnderscores, ...fixExceptions },
					{ selector: "default", modifiers: ["unused"], format: ["strictCamelCase", "UPPER_CASE"], ...requireLeadingUnderscore, ...fixExceptions },

					{ selector: ["enumMember", "typeProperty"], format: ["strictCamelCase", "UPPER_CASE"], ...allowSingleUnderscores, ...fixExceptions },

					// currently properties passed to other functions are checked when they shouldn't be
					// https://github.com/typescript-eslint/typescript-eslint/issues/2244
					// this lets all properties by-pass that since the type declarations are already enforced above
					{ selector: ["objectLiteralProperty", "property"], format: null, ...allowAnyUnderscores, ...fixExceptions },

					{ selector: "variable", format: ["strictCamelCase", "UPPER_CASE"], ...allowSingleUnderscores, ...fixExceptions },

					{ selector: "memberLike", modifiers: ["private"], format: ["camelCase"], ...requireLeadingUnderscore, ...fixExceptions },
					{ selector: "memberLike", modifiers: ["public"], format: ["camelCase"], ...forbidUnderscores, ...fixExceptions },

					{ selector: "typeLike", format: ["StrictPascalCase"], ...forbidUnderscores },
					{ selector: "typeParameter", format: ["StrictPascalCase"], prefix: ["T"], ...forbidUnderscores },
					// UPPER_Maybe_PascalCase...
					{ selector: "enum", format: null, custom: { match: true, regex: "^(?<UPPER_Maybe_PascalCase>(?!_[a-z])_*[A-Za-z]+(?!_[a-z])_*)+$" }, ...allowSingleUnderscores }],
				// #regionend

				// #region STYLE - WHITESPACE
				"@typescript-eslint/indent": ["warn", "tab", {
					SwitchCase: 1,
					ArrayExpression: "first",
					ObjectExpression: "first",
					// i"ve come to realize these are much more readable
					flatTernaryExpressions: true,
					ignoredNodes: [
						// fixes bug in typescript-eslint
						"TSTypeParameterInstantiation",
						// allows us to indent generics nicely
						"TSTypeParameter",
						// flat ternaries does not really do what i want
						"ConditionalExpression",
						// messes with nested templates
						"TemplateLiteral > *",
						// allows first line of if to be indented
						"BinaryExpression",
					],
				}],
				"@typescript-eslint/type-annotation-spacing": "warn",
				"@typescript-eslint/object-curly-spacing": ["warn", "always", { objectsInObjects: true, arraysInObjects: false }], // ⭐
				"@typescript-eslint/brace-style": ["warn", "1tbs", { allowSingleLine: true }], // ⭐
				"@typescript-eslint/comma-dangle": ["warn", "always-multiline"], // ⭐
				"@typescript-eslint/comma-spacing": ["warn", { before: false, after: true }], // ⭐
				"@typescript-eslint/func-call-spacing": "warn", // ⭐
				"@typescript-eslint/keyword-spacing": ["warn", { before: true, after: true }], // ⭐
				"@typescript-eslint/space-before-function-paren": ["warn", { anonymous: "never", asyncArrow: "always", named: "never" }], // ⭐
				"@typescript-eslint/space-infix-ops": "warn", // ⭐
				// #regionend

				// #region STYLE - DELIMITERS / OPERATORS
				"@typescript-eslint/no-extra-semi": "warn", // ⭐
				"@typescript-eslint/quotes": ["warn", "double", { avoidEscape: false, allowTemplateLiterals: true }],
				"@typescript-eslint/semi": ["warn", "never"], // ⭐
				// #regionend

				// #region STYLE - FUNCTIONS
				"@typescript-eslint/no-array-constructor": "warn",
				// #regionend

				// #region STYLE - OBJECTS / ARRAYS
				"@typescript-eslint/dot-notation": "warn",
				// #regionend

				// #region PREFERENCE - GENERAL
				"@typescript-eslint/no-empty-function": "warn",
				"@typescript-eslint/no-throw-literal": "warn", // ⭐
				"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }], // ⭐
				"@typescript-eslint/no-var-requires": "warn",
				"@typescript-eslint/prefer-for-of": "warn",
				"@typescript-eslint/prefer-readonly": "warn",
				// #regionend

				// #region PREFERENCE - TYPESCRIPT SPECIFIC
				"@typescript-eslint/adjacent-overload-signatures": "warn",
				"@typescript-eslint/no-namespace": "warn",
				"@typescript-eslint/no-unnecessary-type-assertion": "warn",
				"@typescript-eslint/prefer-namespace-keyword": "warn",
				"@typescript-eslint/triple-slash-reference": "warn",
				"@typescript-eslint/unified-signatures": "warn",
				"@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description", "ts-nocheck": "allow-with-description", minimumDescriptionLength: 1 }],
				"@typescript-eslint/ban-tslint-comment": ["warn"],
				// #regionend

				// #region UNSAFE / ERROR PRONE
				"@typescript-eslint/await-thenable": "warn",
				"@typescript-eslint/class-literal-property-style": "warn",
				"@typescript-eslint/default-param-last": "warn",
				"@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true }],
				"@typescript-eslint/no-base-to-string": "warn",
				"@typescript-eslint/no-empty-interface": ["warn", { allowSingleExtends: true }],
				"@typescript-eslint/no-extra-non-null-assertion": "warn",
				"@typescript-eslint/no-floating-promises": ["warn", { ignoreIIFE: true }],
				"@typescript-eslint/no-for-in-array": "warn",
				"@typescript-eslint/no-inferrable-types": ["warn", { ignoreParameters: true, ignoreProperties: true }],
				"@typescript-eslint/no-misused-new": "warn",
				"@typescript-eslint/no-misused-promises": "warn",
				"@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
				"@typescript-eslint/no-require-imports": "warn",
				"@typescript-eslint/no-this-alias": ["warn", { allowDestructuring: true, allowedNames: ["self", "context"]}],
				"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
				"@typescript-eslint/no-unnecessary-qualifier": "warn",
				"@typescript-eslint/no-use-before-define": ["warn", { functions: false, classes: true, enums: false, variables: true, typedefs: false }], // ⭐ // only classes are not hoisted, eslint will still complain about the false ones if we're using the item in the same scope
				"@typescript-eslint/prefer-as-const": "warn",
				"@typescript-eslint/prefer-includes": "warn",
				"@typescript-eslint/prefer-nullish-coalescing": ["warn", { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true }],
				"@typescript-eslint/no-confusing-non-null-assertion": "off",
				"@typescript-eslint/no-implied-eval": "warn", // ⭐
				"@typescript-eslint/no-invalid-this": "warn", // ⭐
				"@typescript-eslint/no-loop-func": "warn", // ⭐
				"@typescript-eslint/no-loss-of-precision": "warn", // ⭐
				"@typescript-eslint/no-redeclare": ["warn", { ignoreDeclarationMerge: true }], // ⭐
				"@typescript-eslint/no-shadow": ["warn", { ignoreTypeValueShadow: true, ignoreFunctionTypeParameterNameValueShadow: true }], // ⭐
				"@typescript-eslint/no-unused-expressions": ["warn", { allowTernary: true }], // ⭐
				"@typescript-eslint/prefer-optional-chain": "warn",
				"@typescript-eslint/prefer-reduce-type-parameter": "warn",
				"@typescript-eslint/prefer-string-starts-ends-with": "warn",
				"@typescript-eslint/prefer-ts-expect-error": "warn",
				"@typescript-eslint/promise-function-async": "warn",
				"@typescript-eslint/require-await": "warn", // ⭐
				"@typescript-eslint/restrict-plus-operands": ["warn", { checkCompoundAssignments: true }],
				"@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true, allowBoolean: true, allowAny: true }],
				"@typescript-eslint/return-await": "warn",
				"@typescript-eslint/switch-exhaustiveness-check": "warn",
				// #regionend

				// #region INTERFERE WITH TYPESCRIPT
				"brace-style": "off",
				camelCase: "off",
				"comma-dangle": "off",
				"comma-spacing": "off",
				"dot-notation": "off",
				"func-call-spacing": "off",
				"keyword-spacing": "off",
				"no-duplicate-imports": "off",
				"no-dupe-class-members": "off",
				"no-extra-semi": "off",
				"no-implied-eval": "off",
				"no-invalid-this": "off",
				"no-loop-func": "off",
				"no-loss-of-precision": "off",
				"no-redeclare": "off",
				"no-return-await": "off",
				"no-shadow": "off",
				"no-throw-literal": "off",
				"no-undef": "off",
				"no-unused-expressions": "off",
				"no-unused-vars": "off",
				"no-use-before-define": "off",
				"object-curly-spacing": "off",
				quotes: "off",
				"require-await": "off",
				semi: "off",
				"space-before-function-paren": "off",
				// #regionend

				// #region UNUSED
				// kept for reference and also `show-unset` script
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/ban-ts-ignore": "off",
				"@typescript-eslint/ban-types": "off",
				"@typescript-eslint/camelcase": "off",
				"@typescript-eslint/class-name-casing": "off",
				"@typescript-eslint/consistent-type-definitions": "off",
				"@typescript-eslint/consistent-type-imports": "off", // not needed
				"@typescript-eslint/explicit-module-boundary-types": "off", // not needed, explicit-function-return-type is on
				"@typescript-eslint/init-declarations": "off",
				"@typescript-eslint/interface-name-prefix": "off",
				"@typescript-eslint/member-ordering": "off",
				"@typescript-eslint/method-signature-style": "off",
				"@typescript-eslint/no-confusing-void-expression": ["off", { ignoreArrowShorthand: false }], // annoying
				"@typescript-eslint/no-dynamic-delete": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-extra-parens": "off",
				"@typescript-eslint/no-extraneous-class": "off",
				"@typescript-eslint/no-invalid-void-type": "off",
				"@typescript-eslint/no-magic-numbers": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-type-alias": "off",
				"@typescript-eslint/no-unnecessary-condition": ["off"], // too many false positives
				"@typescript-eslint/no-unnecessary-type-arguments": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-return": "off",
				"@typescript-eslint/no-useless-constructor": "off",
				"@typescript-eslint/prefer-readonly-parameter-types": "off", // getting weird false positives
				"@typescript-eslint/prefer-regexp-exec": "off",
				"@typescript-eslint/require-array-sort-compare": "off",
				"@typescript-eslint/sort-type-union-intersection-members": "off", // often my ordering has some logic
				"@typescript-eslint/strict-boolean-expressions": ["off", { allowNullableBoolean: true }], // useful but sometimes nags where imo it shouldn't
				"@typescript-eslint/unbound-method": ["off", { ignoreStatic: true }], // giving weird errors
				// #regionend
			},
		},
	],
}
