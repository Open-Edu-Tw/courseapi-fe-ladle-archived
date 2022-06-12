import process from 'node:process';
import { defineConfig } from 'vite';

const config = defineConfig({
	define: {
		'process.env': process.env,
	},
});

export default config;
