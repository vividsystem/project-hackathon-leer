import { defineConfig } from "@solidjs/start/config";
import path from "path";

export default defineConfig({
  vite: {
		resolve: {
			alias: {
        "~": path.resolve(process.cwd(), "src"),
        "@": path.resolve(process.cwd(), "drizzle"),
				"client": path.resolve(process.cwd(), "src/client")
      },
		},
    ssr: { external: ["drizzle-orm"] },
  },
	appRoot: "./src/client"
});
