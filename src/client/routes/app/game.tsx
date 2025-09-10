import { useNavigate } from "@solidjs/router"
import { onMount, Show, useContext } from "solid-js"
import GamemasterDisplay from "~/client/components/GamemasterDisplay";
import PlayerDisplay from "~/client/components/PlayerDisplay";
import { ChatContext } from "~/client/lib/contexts"

export default function GamePage() {
	const client = useContext(ChatContext)
	const navigate = useNavigate();
	
	onMount(() => {
		if(!client.inRoom()) {
			navigate("/app/join")
		}
	})
	
	return (
		<Show when={client.getPlayer()?.gameMaster} fallback={<PlayerDisplay/>}>
			<GamemasterDisplay/>	
		</Show>
	)
}
