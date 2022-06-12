const path = require('path');

/**
 * @param {string} dirname
 */
module.exports = (dirname) => ({
	plugins: {
		tailwindcss: {
			config: path.join(dirname, 'tailwind.config.cjs'),
		},
		autoprefixer: {},
	},
});
