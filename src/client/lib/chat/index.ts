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

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);

    // Forward incoming messages to handlers
    this.socket.on("receive-message", (msg: ChatMessage) => {
      this.messageHandlers.forEach((h) => h(msg));
    });
  }

  async setName(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit("set-name", name, (res: any) => {
        if (res.success) resolve();
        else reject(new Error("Failed to set name"));
      });
    });
  }

  async createRoom(): Promise<string> {
    return new Promise((resolve) => {
      this.socket.emit("create-room", (code: string) => {
        resolve(code);
      });
    });
  }

	async getPlayers() {
		return new Promise((resolve) => {
			this.socket.emit("get-players", (res: {success: boolean, message?: string, data?: Player[]}) => {
				resolve(res)
			})
		})
	}

  async joinRoom(code: string) {
    return new Promise((resolve, reject) => {
      this.socket.emit("join-room", code, (res: {success: boolean, message: string}) => {
				return resolve(res)
      });
    });
  }

  sendMessage(code: string, message: string): void {
    this.socket.emit("send-message", { code, message });
  }

  onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
