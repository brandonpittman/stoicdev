import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import type { Plugin } from 'vite';

// Serves static/admin/index.html at /admin/ in `vite dev` (Cloudflare does this
// in prod). vite dev does not serve static/admin/index.html at /admin/ otherwise.
const adminIndexFallback: Plugin = {
	name: 'admin-index-fallback',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			if (req.url === '/admin') {
				res.statusCode = 301;
				res.setHeader('Location', '/admin/');
				res.end();
				return;
			}
			if (req.url === '/admin/') {
				req.url = '/admin/index.html';
			}
			next();
		});
	}
};

export default defineConfig({
	plugins: [adminIndexFallback, sveltekit(), devtoolsJson()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
