import { Crown } from "lucide-solid";
import { Player } from "shared";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import "./css/PlayerList.css";
import { useGameClient } from "~/lib/context";
import { roles as rs } from "shared"
import { createStore } from "solid-js/store";

export default function PlayerList(props: { gm: boolean }) {
  const [players, setPlayers] = createSignal<Player[]>([])
	const [roles, setRoles] = createStore<Record<string,string>>({})
	const client = useGameClient()

  onMount(async () => {
    setPlayers(await client.getPlayers())
  })
  client.onPlayerChange((p) => setPlayers(p))
	client.onRoleChange((r) => setRoles(r))
  createEffect(() => console.log(players()))

  return (
    <ul class="player-list">
      <For each={players()}>
        {(player) => (
          <li class="player-item">
						<Show when={props.gm && rs.All.some(obj => obj.name === roles[player.id])}>
							{rs.All.find(obj => obj.name === roles[player.id])?.icon({})}
						</Show>
						
            <span class="player-name">{player.name ?? "Anonymous"} </span>

            <Show when={client!.getPlayer?.() && player.id === client!.getPlayer()!.id}>
              <Show when={!props.gm}>
              <select
                value={roles[player.id] ?? ""}
                onChange={(e) => {
                  const newRole = e.currentTarget.value;
                  setRoles(player.id, newRole); 
                }}
                style = {{"width": "30%", "margin-top": "1rem", "height": "50%" }}
              >
                <For each={rs.All}>
                  {(roleObj) => (
                    <option value={roleObj.name}>{roleObj.name}</option>
                  )}
                </For>
              </select>
              </Show>
              <span class="you-label">(you)</span>
            </Show>
            <Show when={player.id == client!.getRoom()?.owner}> <Crown class="owner-crown" /></Show>

            <span
              class={"player-status"}
							classList={{"alive": player.alive, "dead": !player.alive}}
            >
              {player.alive ? "Alive" : "Dead"}
            </span>

            <Show when={props.gm && player.alive}>
              <button
                class="kill-btn"
                onClick={() => {
                  console.log("killed");
                  client!.kill(player.id);
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
