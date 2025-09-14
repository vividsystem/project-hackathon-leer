import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";
import { useGameClient } from "~/lib/context";

export default function JoinRoom() {
	const client = useGameClient()
  const [code, setCode] = createSignal("")
  const [name, setName] = createSignal("")
  const navigate = useNavigate()

	const handleJoin = async (event: Event) => {
    event.preventDefault()
    await client.setName(name())
    const res = await client.joinRoom(code()) as { success: boolean, message: string }
    if (res.success) {
      navigate("/app/game")
    }
  }

	const handleCreate = async (event: Event) => {
    event.preventDefault()
		console.log("reacting")
    await client.setName(name())
		console.log("reacting 2")
    const res = await client.createRoom()
		console.log("reacting 3")
    navigate("/app/game")
  }
  return (
    <div style={{ "display": "flex", "align-content": "center", "justify-content": "center"}}>
      <div class="box-background" style={{"border-radius": "1rem", "background-color": "var(--pico-muted-border-color)", "padding": "1rem"}}>
      <form style={{"margin-top": "2rem"}}>
        <fieldset>
          <label>
            <input type="text" name="name" placeholder="Insert your name" onInput={(ev) => setName(ev.currentTarget.value)} />
          </label>
          <label>
            <input type="string" name="code" placeholder="Insert your room code" onInput={(ev) => setCode(ev.currentTarget.value)} />
          </label>
        </fieldset>
        <button type="button" onClick={handleJoin} style={{"width": "100%"}}>Join</button>
        <button type="button" onClick={handleCreate} style={{"width": "100%"}}>Create Room</button>
      </form>
      </div>
    </div>
  )
}
