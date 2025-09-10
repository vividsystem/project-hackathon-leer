import { io, Socket } from "socket.io-client";
import { Player } from "~/shared/types";

export type ChatMessage = {
  sender: string;
  message: string;
};

type MessageHandler = (msg: ChatMessage) => void;

export class ChatClient {
  private socket: Socket;
  private messageHandlers: MessageHandler[] = [];
	private player?: Player;

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
  }

  async setName(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit("set-name", name, (res: any) => {
        if (res.success) resolve();
        else reject(new Error("Failed to set name"));
      });
    });
  }

  async createRoom() {
    const res = await new Promise((resolve) => {
      this.socket.emit("create-room", (res: Player) => {
        resolve(res);
      });
    }) as Player;
		this.player = res

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
      this.socket.emit("join-room", code, (res: {success: boolean, player: Player}) => {
				return resolve(res)
      });
    }) as {success: boolean, player?: Player, message?: string};

		if(res.player) {
			this.player = res.player
		}
		return res
  }

  sendMessage(message: string): void {
    this.socket.emit("send-message", message);
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  disconnect(): void {
    this.socket.disconnect();
  }

	inRoom(): boolean {
		return this.player?.room !== undefined
	}
}
