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

export interface Role {
  name: string;
  description: string;
  frequency: "once" | "every_night" | "never";
  wolf: boolean;
  icon: LucideIcon;
}

import { LucideIcon } from "lucide-solid"
import * as roles from "./roles"
export  { roles }
