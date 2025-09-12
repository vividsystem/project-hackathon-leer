import { Player, Room } from "shared";
import { io, Socket } from "socket.io-client";

export type ChatMessage = {
  sender: string;
  message: string;
};

type MessageHandler = (msg: ChatMessage) => void;
type PlayerHandler = (players: Player[]) => void;

export class ChatClient {
  private socket: Socket;
  private messageHandlers: MessageHandler[] = [];
  private playerHandlers: PlayerHandler[] = [];
	private player?: Player;
	private room?: Room

  constructor(serverUrl: string) {
    this.socket = io(serverUrl, { withCredentials: true });

    // Forward incoming messages to handlers
    this.socket.on("receive-message", (msg: ChatMessage) => {
      this.messageHandlers.forEach((h) => h(msg));
    });

		this.socket.on("killed", (res: Player | void) => {
			if(res) {
				this.player = res
			}
		})

		this.socket.on("player-list", (res: Player[]) => {
			this.playerHandlers.forEach((h) => h(res))
		})
  }

  async setName(name: string) {
    const res = new Promise((resolve, reject) => {
      this.socket.emit("set-name", name, (res: any) => {
        return resolve(res);
      });
    }) as {success: boolean, player: Player}

		this.player = res.player
		return res
  }

  async createRoom() {
    const res = await new Promise((resolve) => {
      this.socket.emit("create-room", (res: Player) => {
        resolve(res);
      });
    }) as Player;
		this.player = res
		this.room = {
			code: this.player.room!,
			owner: this.player.id,
			alive: [this.player.id],
			dead: []
		}

		return res
  }

	async getRoom() {
		return new Promise((resolve) => {
			this.socket.emit("get-room", (res: {success: boolean, message?: string, players?: Player[]}) => {
				resolve(res)
			})
		})

	}

	getPlayer() {
		return this.player
	}


  async joinRoom(code: string) {
    const res = await new Promise((resolve) => {
      this.socket.emit("join-room", code, (res: any) => {
				return resolve(res)
      });
    }) as {success: boolean, player?: Player, message?: string, room?: Room};

		if(res.player) {
			this.player = res.player
		}
		if(res.room) {
			this.room = res.room
		}
		return res
  }

  sendMessage(message: ChatMessage): void {
    this.socket.emit("send-message", message);
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

	onPlayerChange(handler: PlayerHandler) {
		this.playerHandlers.push(handler)
	}

  disconnect(): void {
    this.socket.disconnect();
  }

	inRoom(): boolean {
		return this.player?.room !== undefined
	}

	async leaveRoom() {
		const res = await new Promise((resolve) => {
			this.socket.emit("leave-room", (res: {success: boolean, player: Player}) => (
				resolve(res)
			))
		}) as { success: boolean, player: Player}

		this.player = res.player
		this.room = undefined
	}

	async getPlayers() {
		const res = await new Promise((resolve) => {
			this.socket.emit("get-room-players", (res: Player[]) => resolve(res))
		}) as Player[]

		return res
	}

	async kill(id: string) {
		this.socket.emit("kill-player",  id)
	}
}

export const client = new ChatClient("http://localhost:4000")
