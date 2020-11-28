![Build](https://github.com/alanscodelog/my-eslint-config/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/my-eslint-config/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/eslint-config)

My preferred base eslint configs along with an "install" script for quickly setting up the configs to extend from this one.

# Install

Note: The last command is the install script and will overwrite `.eslintrc` if it exists.

Without vue (just js + typescript):

```bash
yarn add -D \
@alanscodelog/eslint-config \
eslint \
typescript \
@typescript-eslint/parser \
@typescript-eslint/eslint-plugin \
eslint-import-resolver-typescript \
eslint-plugin-simple-import-sort \
eslint-plugin-import \
&& ./node_modules/@alanscodelog/eslint-config/install.sh \
```

With vue:

<details>
```bash
yarn add -D \
@alanscodelog/eslint-config \
eslint \
typescript \
@typescript-eslint/parser \
@typescript-eslint/eslint-plugin \
eslint-import-resolver-typescript \
eslint-plugin-simple-import-sort \
eslint-plugin-import \
eslint-plugin-vue \
@vue/eslint-config-typescript \
&& ./node_modules/@alanscodelog/eslint-config/install.sh \
```
</details>

Just js (untested):
<details>
```bash
yarn add -D \
@alanscodelog/eslint-config \
eslint \
typescript \
eslint-plugin-simple-import-sort \
eslint-plugin-import \
eslint-plugin-vue \
&& ./node_modules/@alanscodelog/eslint-config/install.sh \
```
</details>

# Manual Setup

```bash
cp ./node_modules/@alanscodelog/eslint-config/copy/root.eslintrc.js ./.eslintrc.js
cp ./node_modules/@alanscodelog/eslint-config/copy/tests.eslintrc.js ./tests/.eslintrc.js
```
or copy [this](https://github.com/AlansCodeLog/my-eslint-config/blob/master/copy/root.eslintrc.js) to `.eslintrc.js`.
and [this](https://github.com/AlansCodeLog/my-eslint-config/blob/master/copy/tests.eslintrc.js) to a `.eslintrc.js` in your tests directory.

Search for `// TOCONFIGURE` comments to find the places `.eslintrc.js` should be manually configured before using.

```bash
grep "// TOCONFIGURE" .eslintrc.js tests/.eslintrc.js -H -n - A1 --color
```

# Configs

There's 4 configs (technically 5): base, js, typescript, vue, and test.

Each sets it's rules in an overrides with the correct file glob.

And each (except test and base) extends from the previous (e.g. js = base + js, typescript = js (which includes base) + typescript and so on).

Test is just a config that disables rules and does not extend from the other configs.

# Other

All rules are set to warn since I don't like the editor bleeding red. I pass `--max-warnings=0` to eslint when needed instead.
