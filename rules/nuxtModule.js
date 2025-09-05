// config for developing nuxt modules
// it's faster and leaner than the regular config (which I use mixed with oxlint for a speedup)
import importsConfig from "./imports.js"
import jsdocConfig from "./jsdoc.js"
import vueConfig from "./vue.js"
const filtered = vueConfig
	.flatMap((entry) => {
		return ((!entry.files || !entry?.files?.find(g => g.includes("test"))) && entry.rules) ? Object.entries(entry.rules) : []
	})
// @ts-ignore
delete importsConfig[0].plugins["import"] // nuxt already sets this up
// @ts-ignore
delete jsdocConfig[0].plugins["jsdoc"] // nuxt already sets this up

export const nuxtModuleConfig = {
	features: {
		tooling: true,
		stylistic: {
			arrowParens: false,
			blockSpacing: true,
			braceStyle: "1tbs",
			indent: "tab",
			quotes: "double",
			semi: false,
			commaDangle: "never",
			quoteProps: "as-needed"
		},
		standalone: true,
		dirs: {
			src: [
				"./playground"
			]
		}
	}
}

export const nuxtModuleAppends = 
[
	...importsConfig,
	...jsdocConfig,
	{

		rules: {
			...Object.fromEntries(filtered
				.filter(([key]) => [
					"no-console"
				].includes(key)))

		}
	},
	{
		files: [`**/*.{ts,vue}`],
		rules: {
			...Object.fromEntries(filtered
				.filter(([key]) => [
					"vue/html-indent",
					"vue/html-closing-bracket-spacing",
					"vue/attributes-order",
					"vue/multi-word-component-names",
					"@stylistic/arrow-parens",
					"@stylistic/max-statements-per-line",
					"@stylistic/semi",
					"@typescript-eslint/no-use-before-define",
					"@typescript-eslint/naming-convention",
					"@typescript-eslint/no-dynamic-delete",
					"@typescript-eslint/no-unused-vars",
					"@typescript-eslint/unified-signatures",
					"@typescript-eslint/no-unused-expressions",
					"@typescript-eslint/no-empty-object-type",
					"@typescript-eslint/ban-ts-comment",
					"@typescript-eslint/no-this-alias",
					"@typescript-eslint/no-explicit-any"
				].includes(key))
			)
		}
	},
	{
		files: ["{test,tests}/**/*"],
		rules: {
			"@typescript-eslint/no-unused-vars": ["off"]
		}
	}
]
