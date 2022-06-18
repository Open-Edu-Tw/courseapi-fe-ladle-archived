const path = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const baseConfig = require('../../tailwind.config.base.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
	...baseConfig,
	content: [
		path.join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
};
