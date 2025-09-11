import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
		resolve: {
			alias: {
				"~": "./src"
			}
		},
    ssr: { external: ["drizzle-orm"] },
		server: {
			proxy: {
				"/socket.io": {
					target: "http://localhost:4000",
					ws: true,
				},
			},
		},
  },

});
