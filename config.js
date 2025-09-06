/* eslint-disable simple-import-sort/imports */
// weird issue when actually using the package where plugins aren't defined
import jsdoc from "eslint-plugin-jsdoc"
import importPlugin from "eslint-plugin-import"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import typescriptEslint from "@typescript-eslint/eslint-plugin"

import {
	allowDefaultProjectGlobs as _allowDefaultProjectGlobs,
	allFileTypes as _allFileTypes,
} from "./rules/helpers.js"
export const allowDefaultProjectGlobs = _allowDefaultProjectGlobs
export const allFileTypes = _allFileTypes

import _jsConfig from "./rules/js.js"
export const jsConfig = _jsConfig

import _typescriptConfig from "./rules/typescript.js"
for (const part of _typescriptConfig) {
	if (part.name === "typescript/base" && part.plugins) {
		// @ts-expect-error .
		part.plugins["@typescript-eslint"] = typescriptEslint
	}
}
export const typescriptConfig = _typescriptConfig

import _vueConfig from "./rules/vue.js"
export const vueConfig = _vueConfig

import _jsdocConfig from "./rules/jsdoc.js"
for (const part of _jsdocConfig) {
	if (part.name === "jsdoc/base" && part.plugins) {
		part.plugins.jsdoc = jsdoc
	}
}
export const jsdocConfig = _jsdocConfig

import _importsConfig from "./rules/imports.js"
for (const part of _importsConfig) {
	if (part.name === "imports/base" && part.plugins) {
		part.plugins.import = importPlugin
		part.plugins["simple-import-sort"] = simpleImportSort
	}
}
export const importsConfig = _importsConfig

import { nuxtModuleConfig as _nuxtModuleConfig, nuxtModuleAppends as _nuxtModuleAppends } from "./rules/nuxtModule.js"
export const nuxtModuleAppends = _nuxtModuleAppends
export const nuxtModuleConfig = _nuxtModuleConfig

export default vueConfig
