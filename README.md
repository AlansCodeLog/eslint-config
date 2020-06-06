[![Release](https://github.com/alanscodelog/my-eslint-config/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/eslint-config)

My preffered base eslint configs.

# Install

Note: The last command will overwrite `.eslintrc` if it exists.

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

# Other

All rules are set to warn since I don't like the editor bleeding red. I pass `--max-warnings=0` to eslint when needed instead.
