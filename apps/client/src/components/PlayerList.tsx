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
					{player.name ?? "Anonymous"} - {player.alive ? "Alive": "Dead"}
				 <Show when={props.gm}><button onClick={() => client.kill(player.id)}>Kill</button></Show>
				</div>
			)}
		</For>
	)
}
