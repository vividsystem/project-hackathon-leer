import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, onMount, Suspense } from "solid-js";
import { Show } from "solid-js/web";
import "./app.css";

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
                  <Show when={!isDark()} fallback={<a style={{ color: "white", "align-self": "center", "text-decoration": "none" }}>☀</a>}>
                    {<a style={{ color: "black", "align-self": "center", "text-decoration": "none" }}>☾</a>}
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
