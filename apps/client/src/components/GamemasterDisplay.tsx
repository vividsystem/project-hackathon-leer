import { client } from "~/lib/chat";
import PlayerList from "./PlayerList";
import { Show } from "solid-js";
import RoomCode from "./RoomCode";
import { Navigate } from "@solidjs/router";
import Routine from "./Routine";

export default function GamemasterDisplay() {
	//show all players in lobby with ability to kill them
	return (
		<div>
			<Show when={client.getRoom()} fallback={<Navigate href="/app/join"/>}>
				<RoomCode code={client.getRoom()!.code}/>
			</Show>
			<PlayerList gm={true}/>
			<Routine />
		
		</div>
	)
}
