import { useGameClient } from "~/lib/context";
import PlayerList from "./PlayerList";
import RoomCode from "./RoomCode";
import { Navigate } from "@solidjs/router";
import { Show } from "solid-js";

export default function PlayerDisplay() {
	const client = useGameClient()
	//show other players but without the ability to kill
	return (
		<div>
			<Show when={client!.getRoom()} fallback={<Navigate href="/app/join"/>}>
				<RoomCode code={client!.getRoom()!.code}/>
			</Show>
			<PlayerList gm={false}/>
		</div>
	)
}
