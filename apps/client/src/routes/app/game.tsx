import { useNavigate } from "@solidjs/router"
import { onMount, Show } from "solid-js"
import GamemasterDisplay from "~/components/GamemasterDisplay";
import PlayerDisplay from "~/components/PlayerDisplay";
import { useGameClient } from "~/lib/context";

export default function GamePage() {
	const client = useGameClient()
	const navigate = useNavigate();
	
	onMount(() => {
		if(!client!.inRoom()) {
			navigate("/app/join")
		}
	})
	
	return (
		<div style={{"margin-left": "1rem"}}>
		<Show when={client!.getPlayer()?.gameMaster} fallback={<PlayerDisplay/>}>
			<GamemasterDisplay/>	
		</Show>
		<button onClick={async () => {
			await client!.leaveRoom()
			navigate("/app/join")
		}}>Leave</button>
		</div>
	)
}
