import "./app.css";

import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { createSignal, onMount, Show } from "solid-js";
import { Moon, Sun } from "lucide-solid"


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
          <nav style={{"width": "98%", "margin-left": "1%"}}>
            <ul>
              <li>
                <a href="/">Index</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="/app/lexikon">Lexikon</a>
              </li>
              <li>
                <a href="/app/deadchat">Chat</a>
              </li>
              <li>
                <button
                  type="button"
                  style={{ "background-color": "transparent", border: "none", cursor: "pointer", outline: "none" }}
                  onClick={toggle}
                  title="Toggle dark mode"
                >
                  <Show when={!isDark()} fallback={<Sun/>}>
                    {<Moon class="stroke-black"/>}
                  </Show>
                </button>
              </li>
            </ul>
          </nav>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
