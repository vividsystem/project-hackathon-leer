import { client } from "~/lib/chat";
import PlayerList from "./PlayerList";

export default function GamemasterDisplay() {
	//show all players in lobby with ability to kill them
	return (
		<div>
			<div>
				your room number: {client.getPlayer()?.room ?? ""}
			</div>
			<PlayerList />
		
		</div>
	)
}
