import { useNavigate } from "@solidjs/router"
import { createSignal, JSX, useContext } from "solid-js"
import { ChatContext } from "~/client/lib/contexts"

export default function JoinRoom() {
	const [code, setCode] = createSignal("")
	const [name, setName] = createSignal("")
	const client = useContext(ChatContext)
	const navigate = useNavigate()
	const handleJoin: JSX.EventHandlerUnion<HTMLInputElement, SubmitEvent, JSX.EventHandler<HTMLInputElement, SubmitEvent>>= async (e) => {
		e.preventDefault()
		await client.setName(name())
		const res = await client.joinRoom(code()) as { success: boolean, message: string}
		if(res.success) {
			navigate("/app/game")
		}
	

	}
	const handleCreate: JSX.EventHandlerUnion<HTMLInputElement, SubmitEvent, JSX.EventHandler<HTMLInputElement, SubmitEvent>> = async (e) => {
		e.preventDefault()
		await client.setName(name())
		const res = await client.createRoom()
		navigate("/app/game")
	}
	return (
		<div>
			<form>
				<input type="text" name="name" placeholder="Insert your name" onChange={(ev) => setName(ev.currentTarget.value)}/>	
				<fieldset role="group">
					<input type="text" name="code" placeholder="Insert your room code" onChange={(ev) => setCode(ev.currentTarget.value)}/>
					<input type="submit" value="Join" onSubmit={handleJoin}/>
				</fieldset>
				<input type="submit" value="Create Room" onSubmit={handleCreate}/>
			</form>
		</div>


	)	
}
