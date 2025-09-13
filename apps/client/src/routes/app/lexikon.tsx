import { For } from "solid-js";
import "@picocss/pico/css/pico.min.css";
import "./css/lexikon.css"
import { roles } from "shared";


export default function Home() {
  return (
    <section class="container" style={{ padding: "2rem 0" }}>
      <dl class="lexicon">
        <For each={roles.All}>
          {(role) => (
            <>
              <article
                class="card p-3">
                <h3 style={{"vertical-align": "middle", "align-items": "center", "display": "flex"}}>
                  <div style={{"margin-right": "0.5rem"}}>
                  <role.icon/>
                  </div>
                  {role.name} {role.wolf ? "(Wolf)": "(Dorf)"}
                </h3>
                <p>{role.description}</p>
              </article>
            </>
          )}
        </For>
      </dl>
    </section>
  );
}
