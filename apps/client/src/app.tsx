import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { createSignal, onMount } from "solid-js";
import { Show } from "solid-js/web";

export const [isDark, setIsDark] = createSignal(false);

onMount(() => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("theme");
  const dark = stored === "dark";

  setIsDark(dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
});

const toggle = () => {
  if (typeof window === "undefined") return;

  const next = !isDark();
  setIsDark(next);
  document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  localStorage.setItem("theme", next ? "dark" : "light");
};

export default function App() {
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
            style={{"background-color": "transparent", border: "none", cursor: "pointer", outline: "none", scale: "1.5"}}
            onClick={toggle}
            title="Toggle dark mode"
          >
            <Show when={!isDark()} fallback={<a style={{color: "white", "align-self": "center", "text-decoration": "none", "font-size": "1.2rem"}}>☀</a>}>
              {<a style={{color: "black", "align-self": "center", "text-decoration": "none", "font-size": "1.2em"}}>☾</a>}
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
