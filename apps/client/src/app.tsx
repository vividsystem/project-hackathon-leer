import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { createSignal, onMount, Show } from "solid-js";
import { Moon, Sun } from "lucide-solid"
import "@picocss/pico/css/pico.min.css";


const [isDark, setIsDark] = createSignal(false);
export default function App() {
	const toggle = () => {
		if (typeof window === "undefined") return;

		const next = !isDark();
		setIsDark(next);
		document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
		localStorage.setItem("theme", next ? "dark" : "light");
	};

	onMount(() => {
		if (typeof window === "undefined") return;

		const stored = localStorage.getItem("theme");
		const dark = stored === "dark";

		setIsDark(dark);
		document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
	});

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <header class="topbar" style={{display: "flex",
          "align-items": "center",
          "justify-content": "space-between"}}>
          <a href="/">Index</a>
          <a href="/app/lexikon">Lexikon</a>
          <a href="/app/deadchat">Chat</a>
          <button
            type="button"
            style={{"background-color": "transparent", border: "none", cursor: "pointer", outline: "none"}}
            onClick={toggle}
            title="Toggle dark mode"
          >
            <Show when={!isDark()} fallback={<Sun/>}>
							{<Moon class="text-black"/>}
            </Show>
          </button>
          </header>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
