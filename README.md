![Build](https://github.com/alanscodelog/eslint-config/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/eslint-config/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/eslint-config)

My preferred base eslint configs along with an "install" script for quickly setting up the configs to extend from this one.

# Install


Add to package.json:

```json
{
	"devDependencies": {
		"@alanscodelog/eslint-config":"^3.0.0",
		"eslint":"^8.2.0",
		"eslint-plugin-simple-import-sort": "^7.0.0",
		"eslint-plugin-import":"^2.25.3",
		"eslint-plugin-jsdoc": "^37.0.3",
		// for typescript support
		"typescript": "^4.4.4",
		"@typescript-eslint/parser": "^5.3.1",
		"@typescript-eslint/eslint-plugin": "^5.3.1",
		"eslint-import-resolver-typescript": "^2.5.0",
		// for vue support
		"eslint-plugin-vue": "^8.0.3",
		"@vue/eslint-config-typescript": "^9.0.1"
	}
}
// note: js alone is untested
```

```
npm install
```

Run the install script (this will overwrite `.eslintrc` and `test/.eslintrc` if it exists.)
```bash
./node_modules/@alanscodelog/eslint-config/install.sh
```

# Manual Setup

```bash
cp ./node_modules/@alanscodelog/eslint-config/copy/root.eslintrc.cjs ./.eslintrc.cjs
cp ./node_modules/@alanscodelog/eslint-config/copy/tests.eslintrc.cjs ./tests/.eslintrc.cjs
```
or copy [this](https://github.com/AlansCodeLog/eslint-config/blob/master/copy/root.eslintrc.cjs) to `.eslintrc.js`.
and [this](https://github.com/AlansCodeLog/eslint-config/blob/master/copy/root.eslintrc.cjs) to a `.eslintrc.js` in your tests directory.

Add linting script to `package.json`:
```json
{
	"scripts": {
		// bin only if it has scripts, not for "dist" folder of cli
		// double quotes escaped to avoid shell expanding globs which causes problems
		// *.{cjs,js,ts} so configs at root will be linted
		"lint:eslint": "eslint \"{src,tests,bin}/**/*.{cjs,js,ts}\" \"*.{cjs,js,ts}\" --max-warnings=0 --report-unused-disable-directives",
		// additionally, other directories should be ignored properly in the eslintrc so that vscode won't try to lint the files when opening them (except node_modules, that already seems to be ignored)
	}
}
```


# Configs

There's 4 configs (technically 5): base, js, typescript, vue, and test.

Each sets it's rules in an overrides with the correct file glob.

And each (except test and base) extends from the previous (e.g. js = base + js, typescript = js (which includes base) + typescript and so on).

Test is just a config that disables rules and does not extend from the other configs but since it's meant to be in the tests directory and has `root: false` it technically does.

The base config also does some magic to try and read tsconfig (where eslint is run) path aliases\* and add them to the correct "simple-import-sort/imports" group (otherwise they are grouped with external dependencies), but should otherwise fail silently if it can't find a tsconfig. The only time it will error is if you try to do something like run eslint when there is a tsconfig but typescript is not installed.

\* It only adds them to the aliased paths group if they are not node_modules imports, this is done by seeing if the first path listed does not start with "node_modules". So **very** basic. Additionally aliases are converted by just stripping the key of everything after `/*`, including that `/` (to allow imports like just "@utils").

# Other

All rules are set to warn since I don't like the editor bleeding red. I pass `--max-warnings=0` to eslint when needed instead.
