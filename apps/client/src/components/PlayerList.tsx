import { Crown } from "lucide-solid";
import { Player } from "shared";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { client } from "~/lib/chat";
import "./css/PlayerList.css";

export default function PlayerList(props: { gm: boolean }) {
  const [players, setPlayers] = createSignal<Player[]>([])

  onMount(async () => {
    setPlayers(await client.getPlayers())
  })
  client.onPlayerChange((p) => setPlayers(p))
  createEffect(() => console.log(players()))

  return (
    <ul class="player-list">
      <For each={players()}>
        {(player, id) => (
          <li class="player-item">
            <span class="player-name">{player.name ?? "Anonymous"} </span>

            <Show when={client.getPlayer?.() && player.id === client.getPlayer()!.id}>
              <span class="you-label">(you)</span>
            </Show>

            <Show when={player.id == client.getRoom()?.owner}> <Crown class="owner-crown" /></Show>

            <span
              class={`player-status ${player.alive ? "alive" : "dead"}`}
            >
              - {player.alive ? "Alive" : "Dead"}
            </span>

            <Show when={props.gm && player.alive}>
              <button
                class="kill-btn"
                onClick={() => {
                  console.log("killed");
                  client.kill(player.id);
                }}
              >
                Kill
              </button>
            </Show>
          </li>
        )}
      </For>
    </ul>
  );
}
