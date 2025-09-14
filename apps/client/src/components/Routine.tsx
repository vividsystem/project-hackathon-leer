import { Role, roles } from "shared"
import { For, Show } from "solid-js"
import { useGameClient } from "~/lib/context"
import { useSessionSignal } from "~/lib/storage/persistent"

const defaultGame: Role[] = [
	roles.Amor,
	roles.Werwolf,
	roles.Hexe,
	roles.Seherin,
	roles.Dorfbewohner
]

export default function Routine() {
	const client = useGameClient()
	const [routine, setRoutine] = useSessionSignal<Role[]>("routine", defaultGame)
	const deleteFromRoutine = (name: string) => {
		setRoutine((prev) => prev.filter((val) => val.name !== name))
	}

	return (
		<div>
			<For each={routine()}>
			{(role) => (
				// show role, name, freq, delete button to remove from routine
				<Show when={role.frequency != "never"}>
				<div>{role.name} - {role.frequency} - <button onClick={() => deleteFromRoutine(role.name)}>Remove</button> </div>
				</Show>
			)}
			</For>
			<fieldset role="group">
			<select>
			
			</select>
			<button>Add</button>
			</fieldset>
			
		</div>
	// add an add button
	)
}
