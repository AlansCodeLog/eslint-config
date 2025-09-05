import tsEslint from "typescript-eslint"

import { allowDefaultProjectGlobs as _allowDefaultProjectGlobs } from "./rules/helpers.js"
export const allowDefaultProjectGlobs = _allowDefaultProjectGlobs

import { allFileTypes as _allFileTypes } from "./rules/base.js"
export const allFileTypes = _allFileTypes

import _jsConfig from "./rules/js.js"
export const jsConfig = _jsConfig

import _typescriptConfig from "./rules/typescript.js"
export const typescriptConfig = _typescriptConfig

import _vueConfig from "./rules/vue.js"
export const vueConfig = _vueConfig

import _jsdocConfig from "./rules/jsdoc.js"
export const jsdocConfig = _jsdocConfig

import _importsConfig from "./rules/imports.js"
export const importsConfig = _importsConfig

export const tsEslintConfig = tsEslint.config

export default tsEslint.config(
	...vueConfig,
)
