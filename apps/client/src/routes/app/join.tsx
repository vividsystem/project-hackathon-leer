import { useNavigate } from "@solidjs/router"
import { createSignal, JSX } from "solid-js"
import "@picocss/pico/css/pico.min.css";
import { client } from "~/lib/chat";

export default function JoinRoom() {
	const [code, setCode] = createSignal("")
	const [name, setName] = createSignal("")
	const navigate = useNavigate()
	const handleJoin: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent, JSX.EventHandler<HTMLButtonElement, MouseEvent>>= async (e) => {
		e.preventDefault()
		await client.setName(name())
		const res = await client.joinRoom(code()) as { success: boolean, message: string}
		if(res.success) {
			navigate("/app/game")
		}
	

	}
	const handleCreate: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent, JSX.EventHandler<HTMLButtonElement, MouseEvent>> = async (e) => {
		e.preventDefault()
		await client.setName(name())
		const res = await client.createRoom()
		navigate("/app/game")
	}
	return (
		<div>
				<input type="text" name="name" placeholder="Insert your name" onInput={(ev) => setName(ev.currentTarget.value)}/>	
				<fieldset role="group">
					<input type="string" name="code" placeholder="Insert your room code" onChange={(ev) => setCode(ev.currentTarget.value)}/>
					<button value="Join" onClick={handleJoin}>Join</button>
				</fieldset>
				<button value="Create Room" onClick={handleCreate}>Create Room</button>
		</div>


	)	
}
