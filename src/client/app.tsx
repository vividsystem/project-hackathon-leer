import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { createSignal, onMount } from "solid-js";
import { Show } from "solid-js/web";

const [isDark, setIsDark] = createSignal(false);

onMount(() => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("theme");
  const dark = stored === "dark";

  setIsDark(dark);
  document.documentElement.setAttribute(
    "data-theme",
    dark ? "dark" : "light"
  );
});

const toggle = () => {
  if (typeof window === "undefined") return;

  const next = !isDark();
  setIsDark(next);
  document.documentElement.setAttribute(
    "data-theme",
    next ? "dark" : "light"
  );
  localStorage.setItem("theme", next ? "dark" : "light");
};

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <a href="/">Index</a>
          <a href="/app/lexikon">Lexikon</a>
          <a href="/app/deadchat">Chat</a>
          <button
            type="button"
            onClick={toggle}
            title="Toggle dark mode"
          >
            <Show when={isDark()} fallback={<a>light</a>}>
              {<a>dark</a>}
            </Show>
          </button>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
    
  );
}