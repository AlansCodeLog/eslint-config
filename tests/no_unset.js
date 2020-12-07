/** Temporary until eslint-find-rules supports overrides. */
// future awaiting https://github.com/sarbbottam/eslint-find-rules/issues/317
const _exec = require("child_process").exec
const promisify = require("util").promisify


const exec = promisify(_exec)

const folder = "./tests/rules"
async function main() {
	let missing = false
	for (let file of ["js", "typescript", "vue"]) {
		// eslint-disable-next-line no-await-in-loop
		let { stdout, stderr } = await exec(`npx eslint-find-rules --unused --no-error ${folder}/${file}.js`)
			.catch(err => {
				console.log(`\nError in ${file} Config:\n`)
				console.log(err)

				process.exit(1)
		})

		if (stderr) {
			console.log(`\nError in ${file} Config:\n`, stderr)
			process.exit(1)
		}
		let list = stdout
			.replace("unused rules", "")
			.split(/\s+/)
			.filter(line => line.trim() !== "")
		if (list.length > 0) {
			missing = true
			console.log(`\nUnset Rules in ${file} Config:`)
			console.log(list.join("\n"))
		}
	}
	if (missing) {
		console.log("Please set rules to off if unused.")

		process.exit(1)
	}
}
main()
