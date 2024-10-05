import tsParser from "@typescript-eslint/parser"
import tsEslint from "typescript-eslint"

import { allFileTypes } from "./base.js"
/**
 * Just extending js will only make the rules apply to js files. We want them to also apply to typescript files. This config will take care of disabling any rules that interfere.
 */
import jsConfig from "./js.js"
/**
 * ⭐ means the regular version of the rule needs to be disabled, but any changes to it should be "synced" with the js version.
 */

const allowAnyUnderscores = { leadingUnderscore: "allowSingleOrDouble", trailingUnderscore: "allowSingleOrDouble" }
const allowSingleUnderscores = { leadingUnderscore: "allow", trailingUnderscore: "allow" }
const forbidUnderscores = { leadingUnderscore: "forbid", trailingUnderscore: "forbid" }
const requireLeadingUnderscore = { leadingUnderscore: "require", trailingUnderscore: "allow" }
/** Prevents underscore only identifiers from matching so they match the null rule instead and aren't checked */
const fixExceptions = { filter: { regex: "^(_+?|_constructor|_mixin)$", match: false } }

export default tsEslint.config(
	...jsConfig,
	{
		files: [
			"**/*.d.ts",
			`**/*.{${allFileTypes.filter(f => !f.includes(".js")).join(",")}}`,
		],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				// https://typescript-eslint.io/packages/parser/#experimental_useprojectservice
				// eslint-disable-next-line camelcase
				EXPERIMENTAL_useProjectService: true,
				// project: ["./tsconfig.eslint.json", "./tsconfig.json"],
				// tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: [".vue"],
			},
		},
		plugins: {
			"@typescript-eslint": tsEslint.plugin,
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
				},
			},
		},
	},
	{
		files: ["**/*.ts"],
		rules: {
				
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
			// #regionend

			// #region STYLE - TYPESCRIPT SPECIFIC
			"@typescript-eslint/explicit-member-accessibility": ["warn", {
				accessibility: "no-public",
				overrides: {
					parameterProperties: "off",
				},
			}],
			
			"@typescript-eslint/array-type": "warn",
			"@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
			"@typescript-eslint/consistent-type-assertions": "warn",
			"@typescript-eslint/prefer-enum-initializers": "warn",
			"@typescript-eslint/prefer-literal-enum-member": "off",
			"@typescript-eslint/no-unnecessary-type-constraint": "warn",
			"@typescript-eslint/non-nullable-type-assertion-style": "warn",
			// #regionend

			// #region STYLE - CLASS RELATED
			"no-dupe-class-members": "off",
			"@typescript-eslint/no-dupe-class-members": "warn", // ⭐
			// #regionend

			// #region STYLE - NAMING
			"@typescript-eslint/naming-convention": [
				"warn",
				{ selector: ["default"], format: null, ...allowAnyUnderscores, filter: { ...fixExceptions.filter, match: true } },
				{ selector: ["default"], format: ["strictCamelCase"], ...allowSingleUnderscores, ...fixExceptions },
				{ selector: "import", format: ["strictCamelCase", "PascalCase"]},
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
				{ selector: "enum", format: null, custom: { match: true, regex: "^(?<UPPER_Maybe_PascalCase>(?!_[a-z])_*[A-Za-z]+(?!_[a-z])_*)+$" }, ...allowSingleUnderscores },
			],
			// #regionend

			// #region STYLE - FUNCTIONS
			"@typescript-eslint/no-array-constructor": "warn",
			// #regionend

			// #region STYLE - OBJECTS / ARRAYS
			"@typescript-eslint/dot-notation": "warn",
			// #regionend

			// #region PREFERENCE - GENERAL
			"@typescript-eslint/no-empty-function": "warn",
			"no-throw-literal": "off",
			"@typescript-eslint/only-throw-error": "warn", // ⭐
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false, argsIgnorePattern: "^_" }], // ⭐
			"@typescript-eslint/prefer-for-of": "warn",
			"@typescript-eslint/prefer-readonly": "warn",
			// #regionend

			// #region PREFERENCE - TYPESCRIPT SPECIFIC
			"@typescript-eslint/adjacent-overload-signatures": "warn",
			"@typescript-eslint/no-namespace": "warn",
			// "@typescript-eslint/no-unnecessary-type-assertion": "warn",
			"@typescript-eslint/prefer-namespace-keyword": "warn",
			"@typescript-eslint/triple-slash-reference": "warn",
			"@typescript-eslint/ban-ts-comment": ["warn", {
				"ts-expect-error": "allow-with-description",
				"ts-nocheck": "allow-with-description",
				minimumDescriptionLength: 1,
			}],
			"@typescript-eslint/ban-tslint-comment": ["warn"],
			// #regionend

			// #region UNSAFE / ERROR PRONE
			"@typescript-eslint/await-thenable": "warn",
			"@typescript-eslint/class-literal-property-style": "warn",
			"@typescript-eslint/default-param-last": "warn",
			"@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true, allowDirectConstAssertionInArrowFunctions: true, allowConciseArrowFunctionExpressionsStartingWithVoid: true }],
			"@typescript-eslint/no-base-to-string": "warn",
			"@typescript-eslint/no-empty-object-type": ["warn", {
				// i never do this accidentally in a way that might cause a problem
				allowInterfaces: "always",
			}],
			"@typescript-eslint/no-extra-non-null-assertion": "warn",
			"@typescript-eslint/no-floating-promises": ["warn", { ignoreIIFE: true }],
			"@typescript-eslint/no-for-in-array": "warn",
			"@typescript-eslint/no-inferrable-types": ["warn", { ignoreParameters: true, ignoreProperties: true }],
			"@typescript-eslint/no-misused-new": "warn",
			"@typescript-eslint/no-misused-promises": "warn",
			"@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
			"@typescript-eslint/no-this-alias": ["warn", { allowDestructuring: true, allowedNames: ["self", "context"]}],
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
			"@typescript-eslint/no-unnecessary-qualifier": "warn",
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["warn", { functions: false, classes: true, enums: false, variables: true, typedefs: false }], // ⭐ // only classes are not hoisted, eslint will still complain about the false ones if we're using the item in the same scope
			"@typescript-eslint/prefer-as-const": "warn",
			"@typescript-eslint/prefer-includes": "warn",
			"@typescript-eslint/prefer-nullish-coalescing": ["warn", { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true }],
			"@typescript-eslint/no-confusing-non-null-assertion": "off",
			"no-implied-eval": "off",
			"@typescript-eslint/no-implied-eval": "warn", // ⭐
			"no-invalid-this": "off",
			"@typescript-eslint/no-invalid-this": "warn", // ⭐
			"no-loop-func": "off",
			"@typescript-eslint/no-loop-func": "warn", // ⭐
			"no-redeclare": "off",
			"@typescript-eslint/no-redeclare": ["warn", { ignoreDeclarationMerge: true }], // ⭐
			"no-restricted-imports": "off",
			"@typescript-eslint/no-restricted-imports": ["warn", {
				patterns: [
					{
						group: ["*/index.js", "!types/index.js"],
						message: "Avoid importing from index files to avoid circular dependencies.",
						allowTypeImports: true,
					},
				],
			}],
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": ["warn", { ignoreTypeValueShadow: true, ignoreFunctionTypeParameterNameValueShadow: true }], // ⭐
			"no-unused-expressions": "off",
			"@typescript-eslint/no-unused-expressions": ["warn", { allowTernary: true }], // ⭐
			"@typescript-eslint/prefer-optional-chain": "warn",
			"@typescript-eslint/prefer-reduce-type-parameter": "warn",
			"@typescript-eslint/prefer-string-starts-ends-with": "warn",
			"@typescript-eslint/promise-function-async": "warn",
			"@typescript-eslint/restrict-plus-operands": ["warn"],
			"@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true, allowBoolean: true, allowAny: true }],
			"@typescript-eslint/return-await": "warn",
			"@typescript-eslint/switch-exhaustiveness-check": "warn",

			// #regionend

			// #region INTERFERE WITH TYPESCRIPT
			"no-undef": "off",
			// #regionend

			// #region UNUSED
			// kept for reference and also `show-unset` script
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/ban-types": "off",
			camelCase: "off",
			"@typescript-eslint/camelcase": "off",
			"@typescript-eslint/class-name-casing": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
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
			"@typescript-eslint/parameter-properties": ["off"],
			"@typescript-eslint/prefer-function-type": "off",
			"@typescript-eslint/prefer-readonly-parameter-types": "off", // getting weird false positives
			"@typescript-eslint/prefer-regexp-exec": "off",
			"@typescript-eslint/require-array-sort-compare": "off",
			"@typescript-eslint/require-await": "off", // interferes with promise-function-async
			"@typescript-eslint/sort-type-union-intersection-members": "off", // often my ordering has some logic
			"@typescript-eslint/strict-boolean-expressions": ["off", { allowNullableBoolean: true }], // useful but sometimes nags where imo it shouldn't
			"@typescript-eslint/typedef": ["off", { arrowParameter: false, arrayDestructuring: false, objectDestructuring: false, variableDeclaration: false, variableDeclarationIgnoreFunction: false, memberVariableDeclaration: true, parameter: true, propertyDeclaration: true }],
			"@typescript-eslint/unbound-method": ["off", { ignoreStatic: true }], // giving weird errors
			"@typescript-eslint/unified-signatures": "off", // annoying in certain situations
			// #regionend
		},
	},
	{
		files: [`{tests,test}/**/*.{${allFileTypes.filter(f => !f.includes("js")).join(",")}}`],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars-experimental": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"spaced-comment": ["warn", "always", { markers: ["/"]}], // allow triple slash directives
		},
	},
	{
		// for root files
		files: ["*.{ts,vue}"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
)

