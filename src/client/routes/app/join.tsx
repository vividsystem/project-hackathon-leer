import { useNavigate } from "@solidjs/router"
import { createSignal, JSX, useContext } from "solid-js"
import { ChatContext } from "~/client/lib/contexts"

export default function JoinRoom() {
	const [code, setCode] = createSignal("")
	const client = useContext(ChatContext)
	const navigate = useNavigate()
	const handleJoin: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>>= async (e) => {
		e.preventDefault()
		const res = await client.joinRoom(code()) as { success: boolean, message: string}
		if(res.success) {
			navigate("/app/player")
		}
	

	}
	const handleCreate: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent, JSX.EventHandler<HTMLFormElement, SubmitEvent>>= (e) => {
		e.preventDefault()
		const res = client.createRoom()
		navigate("/app/gamemaster")
	}
	return (
		<div>
		<form onSubmit={handleJoin}>
			<fieldset role="group">
				<input type="text" name="code" placeholder="Insert your room code" onChange={(ev) => setCode(ev.currentTarget.value)}/>
				<input type="submit" value="Join" />
			</fieldset>
		</form>
		<form onSubmit={handleCreate}>
			<input type="submit" value="Create Room"/>
		</form>
		</div>


	)	
}
