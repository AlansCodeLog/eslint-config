import baseConfig from "./base.js"
import { allFileTypes } from "./helpers.js"

/**
 * ⚠️ means the rule has a typescript version is disabled in typescript files, but any changes to it should be "synced" with the typescript version.
 */
/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	{
		rules: {
			// #region STYLE - CLASS RELATED
			"accessor-pairs": "warn",
			"constructor-super": "warn",
			"grouped-accessor-pairs": "warn",
			"no-dupe-class-members": "warn", // ⚠️
			"no-empty-static-block": "warn",
			"@stylistic/lines-between-class-members": ["warn", "always", { exceptAfterOverload: false }],
			// #regionend

			// #region STYLE - WHITESPACE
			"@stylistic/array-bracket-newline": ["warn", "consistent"],
			"@stylistic/array-element-newline": ["warn", "consistent"],
			"@stylistic/comma-dangle": "off",
			"@stylistic/function-call-spacing": "warn",
			"@stylistic/space-infix-ops": "warn",
			"@stylistic/object-curly-spacing": ["warn", "always", { objectsInObjects: true, arraysInObjects: false }],
			"@stylistic/arrow-spacing": "warn",
			"@stylistic/generator-star-spacing": ["warn", { before: false, after: true }],
			"@stylistic/key-spacing": ["warn", { afterColon: true }],
			"@stylistic/newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
			"@stylistic/no-mixed-spaces-and-tabs": "warn",
			"@stylistic/no-multiple-empty-lines": ["warn", { max: 2, maxEOF: 1, maxBOF: 0 }],
			"@stylistic/no-trailing-spaces": ["warn", { skipBlankLines: true }],
			"@stylistic/no-whitespace-before-property": "warn",
			"@stylistic/nonblock-statement-body-position": "warn",
			"@stylistic/padded-blocks": ["warn", "never"],
			"@stylistic/rest-spread-spacing": "warn",
			"@stylistic/semi-spacing": ["warn", { before: false, after: true }],
			"@stylistic/space-before-blocks": "warn",
			"@stylistic/space-in-parens": ["warn", "never"],
			"@stylistic/space-unary-ops": "warn",
			"@stylistic/spaced-comment": "warn",
			"@stylistic/switch-colon-spacing": "warn",
			"@stylistic/template-curly-spacing": "warn",
			"@stylistic/template-tag-spacing": "warn",
			"@stylistic/yield-star-spacing": ["warn", "after"],
			"@stylistic/member-delimiter-style": ["warn", {
				multiline: {
					delimiter: "none",
					requireLast: true,
				},
				singleline: {
					delimiter: "comma",
					requireLast: false,
				},
			}],
			"@stylistic/indent": ["warn", "tab", {
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
			"@stylistic/type-annotation-spacing": "warn",
			"@stylistic/space-before-function-paren": ["warn", { anonymous: "never", asyncArrow: "always", named: "never" }],
			// #regionend

			// #region STYLE - DELIMITERS / OPERATORS
			"@stylistic/no-extra-semi": "warn",
			"@stylistic/quotes": ["warn", "double", { avoidEscape: false, allowTemplateLiterals: "always" }],
			"@stylistic/semi": ["warn", "never"],

			"@stylistic/jsx-quotes": "warn",
			"operator-assignment": "warn",
			"prefer-template": "warn",
			"@stylistic/quote-props": ["warn", "as-needed", { unnecessary: true }],
			"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
			// #regionend

			// #region STYLE - FUNCTIONS
			"arrow-body-style": "warn",
			"@stylistic/arrow-parens": ["warn", "as-needed"],
			"no-inner-declarations": ["warn", "both"],
			// #regionend

			// #region STYLE - OBJECTS / ARRAYS
			"@stylistic/dot-location": ["warn", "property"],
			"no-object-constructor": "warn",
			"object-shorthand": "warn",
			curly: ["warn", "multi-line"],
			// #regionend

			// #region PREFERENCE - GENERAL
			camelcase: "warn",
			"default-case-last": "warn",
			eqeqeq: ["warn", "always"],
			"guard-for-in": "warn",
			"@stylistic/new-parens": "warn",
			"no-alert": "warn",
			"no-console": "warn",
			"no-debugger": "warn",
			"no-new-wrappers": "warn",
			"no-throw-literal": "warn", // ⚠️
			"no-unneeded-ternary": "warn",
			"no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }], // ⚠️
			"no-useless-call": "warn",
			"no-useless-computed-key": "warn",
			"no-useless-rename": "warn",
			"no-useless-return": "warn",
			"no-var": "warn",
			"no-void": ["warn", { allowAsStatement: true }],
			"prefer-exponentiation-operator": "warn",
			"prefer-const": ["warn", { ignoreReadBeforeAssign: false }],
			"prefer-object-spread": "warn",
			"prefer-regex-literals": "warn",
			"prefer-rest-params": "warn",
			"prefer-spread": "warn",
			"symbol-description": "warn",
			yoda: "warn",
			// #regionend

			// #region PREFERENCE - FILES
			"@stylistic/eol-last": "warn",
			"@stylistic/linebreak-style": ["warn", "unix"],
			"max-lines": ["warn", 1000],
			// #regionend

			// #region UNSAFE / ERROR PRONE
			"no-new-native-nonconstructor": "warn",
			"block-scoped-var": "warn",
			"for-direction": "warn",
			"getter-return": "warn",
			"no-async-promise-executor": "warn",
			"no-await-in-loop": "warn",
			"no-bitwise": "warn",
			"no-caller": "warn",
			"no-case-declarations": "warn", // no vars not inside brackets in switch statements
			"no-class-assign": "warn",
			"no-compare-neg-zero": "warn",
			"no-cond-assign": "warn",
			"no-const-assign": "warn",
			"no-constant-binary-expression": "warn",
			"no-constant-condition": "warn",
			"no-constructor-return": "warn",
			"no-control-regex": "warn",
			"no-delete-var": "warn",
			"no-dupe-args": "warn",
			"no-dupe-else-if": "warn",
			"no-dupe-keys": "warn",
			"no-duplicate-case": "warn",
			"no-empty-character-class": "warn",
			"no-empty-pattern": "warn",
			"no-empty": "warn",
			"no-eq-null": "warn",
			"no-eval": "warn",
			"no-ex-assign": "warn",
			"no-extend-native": "warn",
			"no-extra-bind": "warn",
			"no-extra-boolean-cast": "warn",
			"no-fallthrough": "warn",
			"@stylistic/no-floating-decimal": "warn",
			"no-func-assign": "warn",
			"no-global-assign": "warn",
			"no-implicit-globals": "warn",
			"no-implied-eval": "warn", // ⚠️
			"no-import-assign": "warn",
			"no-invalid-regexp": "warn",
			"no-invalid-this": "warn", // ⚠️
			"no-irregular-whitespace": "warn",
			"no-iterator": "warn",
			"no-label-var": "warn",
			"no-labels": "warn",
			"no-lone-blocks": "warn",
			"no-loop-func": "warn", // ⚠️
			"no-loss-of-precision": "warn", // ⚠️
			"no-misleading-character-class": "warn",
			"@stylistic/no-mixed-operators": "warn",
			"@stylistic/no-multi-spaces": "warn",
			"no-new-func": "warn",
			"no-new": "warn",
			"no-nonoctal-decimal-escape": "warn",
			"no-obj-calls": "warn",
			"no-octal-escape": "warn",
			"no-octal": "warn",
			"no-promise-executor-return": "warn",
			"no-proto": "warn",
			"no-prototype-builtins": "warn",
			"no-redeclare": ["warn"], // ⚠️
			"no-regex-spaces": "warn",
			"no-script-url": "warn",
			"no-self-assign": "warn",
			"no-self-compare": "warn",
			"no-sequences": "warn",
			"no-setter-return": "warn",
			"no-shadow-restricted-names": "warn",
			"no-shadow": ["warn"], // ⚠️
			"no-sparse-arrays": "warn",
			"no-template-curly-in-string": "warn",
			"no-this-before-super": "warn",
			"no-undef-init": "warn",
			"no-undef": "warn",
			"no-unexpected-multiline": "warn",
			"no-unmodified-loop-condition": "warn",
			"no-unreachable-loop": "warn",
			"no-unreachable": "warn",
			"no-unsafe-finally": "warn",
			"no-unsafe-negation": "warn",
			"no-unsafe-optional-chaining": "warn",
			"no-unused-expressions": ["warn", { allowTernary: true }], // ⚠️
			"no-unused-labels": "warn",
			"no-unused-private-class-members": "warn",
			"no-use-before-define": ["warn", { functions: false, classes: true, variables: true }], // ⚠️
			"no-useless-catch": "warn",
			"no-useless-escape": "warn",
			"no-with": "warn",
			"prefer-numeric-literals": "warn",
			"prefer-object-has-own": "warn",
			"prefer-promise-reject-errors": ["warn", { allowEmptyReject: true }],
			"require-yield": "warn",
			"use-isnan": "warn",
			"valid-typeof": "warn",
			"@stylistic/wrap-iife": ["warn", "inside", { functionPrototypeMethods: true }],
			radix: "warn",
			// #regionend

			// #region UNUSED
			// kept for reference and also `show-unset` script
			"array-callback-return": "off",
			"@stylistic/block-spacing": "off",
			"capitalized-comments": "off",
			"class-methods-use-this": "off",
			"@stylistic/comma-style": "off",
			"consistent-return": "off",
			"consistent-this": "off",
			"default-case": "off",
			"default-param-last": "off",
			"func-name-matching": "off",
			"func-names": "off",
			"func-style": "off",
			"function-paren-newline": "off",
			"id-blacklist": "off",
			"id-denylist": "off",
			"id-length": "off",
			"id-match": "off",
			"@stylistic/implicit-arrow-linebreak": ["off", "beside"], // too annoying in certain situations
			"init-declarations": "off",
			"@stylistic/line-comment-position": "off",
			"max-classes-per-file": "off",
			"max-depth": "off",
			"@stylistic/max-len": "off",
			"max-lines-per-function": "off",
			"max-nested-callbacks": "off",
			"max-params": "off",
			"@stylistic/max-statements-per-line": "off",
			"max-statements": "off",
			"@stylistic/multiline-comment-style": "off",
			"@stylistic/multiline-ternary": "off",
			"new-cap": "off",
			"no-array-constructor": "off",
			"@stylistic/no-confusing-arrow": "off",
			"no-continue": "off",
			"no-div-regex": "off",
			"no-else-return": "off",
			"no-empty-function": "off",
			"no-extra-label": "off",
			"@stylistic/no-extra-parens": "off",
			"no-implicit-coercion": "off",
			"no-inline-comments": "off",
			"no-lonely-if": "off",
			"no-magic-numbers": ["off", { ignoreArrayIndexes: true, detectObjects: true, ignore: [1]}],
			"no-multi-assign": "warn",
			"no-multi-str": "off",
			"no-negated-condition": "off",
			"no-nested-ternary": "off",
			"no-param-reassign": "off",
			"no-plusplus": "off",
			"no-restricted-exports": "off",
			"no-restricted-globals": "off",
			"no-restricted-properties": "off",
			"no-restricted-syntax": "off",
			"no-return-assign": "off",
			"@stylistic/no-tabs": "off",
			"no-ternary": "off",
			"no-undefined": "off",
			"no-underscore-dangle": "off",
			"no-useless-backreference": "off", // was complaining when I didn't have a backreference?
			"no-useless-concat": "off",
			"no-useless-constructor": "off",
			"no-warning-comments": "off",
			"@stylistic/one-var-declaration-per-line": "off",
			"one-var": ["off", "never"],
			"@stylistic/operator-linebreak": "off",
			"@stylistic/padding-line-between-statements": "off",
			"prefer-arrow-callback": "off",
			"prefer-destructuring": "off",
			"prefer-named-capture-group": "off",
			"require-await": "off", // ⚠️
			"require-atomic-updates": "off",
			"require-unicode-regexp": "off",
			"@stylistic/semi-style": "off",
			"sort-imports": "off",
			"sort-keys": "off",
			"sort-vars": "off",
			"unicode-bom": "off",
			"vars-on-top": "off",
			"@stylistic/wrap-regex": "off",
			complexity: "off",
			strict: "off",
			// #regionend
		},
	},
	{
		files: [`{tests,test}/**/*.{${allFileTypes.join(",")}}`],
		rules: {
			"import/no-unused-modules": "off",
			"import/no-extraneous-dependencies": "off",
			"no-new": "off",
			"no-console": "off",
			"no-shadow": "off",
			"no-unused-expressions": "off",
		},
	},
]
