export interface Player {
	id: string
	room?: string
	name?: string
	alive: boolean
	gameMaster: boolean
}

export interface Room {
	code: string
	owner: string
	dead: string[]
	alive: string[]
}
