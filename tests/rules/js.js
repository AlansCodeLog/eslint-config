const base = require("../../base")
const js = require("../../js")


const excludeExtends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...(base.plugins ? base.plugins : []),
		...(js.plugins ? js.plugins : []),
	],
	extends: [
		...(base.extends ? base.extends : []),
		...(js.extends ? js.extends : []),
	].filter(entry => !excludeExtends.includes(entry)),
	rules: {
		...(base.rules ? base.rules : []),
		...js.overrides[0].rules,
	},
}
