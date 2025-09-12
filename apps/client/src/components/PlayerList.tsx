import { Crown } from "lucide-solid";
import { Player } from "shared";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { client } from "~/lib/chat";

export default function PlayerList(props: {gm: boolean}) {
	const [players, setPlayers] = createSignal<Player[]>([])

	onMount(async () => {
		setPlayers(await client.getPlayers())
	})
	client.onPlayerChange((p) => setPlayers(p))
	createEffect(() => console.log(players()))

	return (
		<For each={players()}>
			{(player, id) => (
				<div>
					{player.name ?? "Anonymous"} {player.id == client.getPlayer()?.id ? "(you)" :""} { id() == 0 ? <Crown />: ""}- {player.alive ? "Alive": "Dead"} 
					<Show when={props.gm && player.alive}>
						- <button onClick={() => {
							console.log("killed")
							client.kill(player.id)
						}}>Kill</button>
					</Show>
				</div>
			)}
		</For>
	)
}
