import { defineConfig } from "@solidjs/start/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({
  vite: {
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "src")
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
