const base = require("../../base")
const js = require("../../js")


const exclude_extends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...(base.plugins ? base.plugins : []),
		...(js.overrides[0].plugins ? js.overrides[0].plugins : []),
	],
	extends: [
		...(base.extends ? base.extends : []),
		...(js.overrides[0].extends ? js.overrides[0].extends : []),
	].filter(entry => !exclude_extends.includes(entry)),
	rules: {
		...(base.rules ? base.rules : []),
		...js.overrides[0].rules,
	},
}
