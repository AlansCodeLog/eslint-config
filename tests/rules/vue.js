const typescript = require("./typescript")
const vue = require("../../vue")


const exclude_extends = ["./js", "./base", "./typescript", "./vue"]
module.exports = {
	plugins: [
		...typescript.plugins,
		...(vue.overrides[0].plugins ? vue.overrides[0].plugins : []),
	],
	extends: [
		...typescript.extends,
		...(vue.overrides[0].extends ? vue.overrides[0].extends : []),
	].filter(entry => !exclude_extends.includes(entry)),
	rules: {
		...typescript.rules,
		...vue.overrides[0].rules,
	},
}
