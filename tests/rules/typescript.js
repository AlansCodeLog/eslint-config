const js = require("./js")
const typescript = require("../../typescript")


const excludeExtends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...js.plugins,
		...(typescript.overrides[0].plugins ? typescript.overrides[0].plugins : []),
	],
	extends: [
		...js.extends,
		...(typescript.overrides[0].extends ? typescript.overrides[0].extends : []),
	].filter(entry => !excludeExtends.includes(entry)),
	rules: {
		...js.rules,
		...typescript.overrides[0].rules,
	},
}
