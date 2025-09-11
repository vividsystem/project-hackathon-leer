import { Player } from "shared";
import { createEffect, createSignal, For, onMount } from "solid-js";
import { client } from "~/lib/chat";

export default function PlayerList() {
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
				</div>
			)}
		</For>
	)
}
