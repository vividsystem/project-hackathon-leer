import "@picocss/pico/css/pico.min.css";
import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";
import { client } from "~/lib/chat";

export default function JoinRoom() {
  const [code, setCode] = createSignal("")
  const [name, setName] = createSignal("")
  const navigate = useNavigate()
  const handleJoin: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent, JSX.EventHandler<HTMLButtonElement, MouseEvent>> = async (e) => {
    e.preventDefault()
    await client.setName(name())
    const res = await client.joinRoom(code()) as { success: boolean, message: string }
    if (res.success) {
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
    <div style={{ "display": "flex", "align-content": "center", "justify-content": "center"}}>
      <div class="box-background" style={{"border-radius": "1rem", "background-color": "var(--pico-muted-border-color)", "padding": "1rem"}}>
      <form style={{"margin-top": "2rem"}}>
        <fieldset>
          <label>
            <input type="text" name="name" placeholder="Insert your name" onInput={(ev) => setName(ev.currentTarget.value)} />
          </label>
          <label>
            <input type="string" name="code" placeholder="Insert your room code" onChange={(ev) => setCode(ev.currentTarget.value)} />
          </label>
        </fieldset>
        <input value="Join" type="submit" onInput={(ev) => handleJoin} />
        <input value="Create Room" type="submit" onInput={(ev) => handleCreate} />
      </form>
      </div>
    </div>
  )
}
