import { useNavigate } from "@solidjs/router"
import { onMount, Show } from "solid-js"
import GamemasterDisplay from "~/components/GamemasterDisplay";
import PlayerDisplay from "~/components/PlayerDisplay";
import { client } from "~/lib/chat";

export default function GamePage() {
	const navigate = useNavigate();
	
	onMount(() => {
		if(!client.inRoom()) {
			navigate("/app/join")
		}
	})
	
	return (
		<>
		<Show when={client.getPlayer()?.gameMaster} fallback={<PlayerDisplay/>}>
			<GamemasterDisplay/>	
		</Show>
		<button onClick={async () => {
			await client.leaveRoom()
			navigate("/app/join")
		}}>Leave</button>
		</>
	)
}
