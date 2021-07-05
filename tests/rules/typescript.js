const js = require("./js")
const typescript = require("../../typescript")


const excludeExtends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...js.plugins,
		...(typescript.plugins ? typescript.plugins : []),
	],
	extends: [
		...js.extends,
		...(typescript.extends ? typescript.extends : []),
	].filter(entry => !excludeExtends.includes(entry)),
	rules: {
		...js.rules,
		...typescript.overrides[0].rules,
		...typescript.overrides[1].rules,
	},
}
