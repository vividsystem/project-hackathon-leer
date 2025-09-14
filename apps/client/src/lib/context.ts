import { createContext, useContext } from "solid-js";
import { ChatClient } from "./chat";

const client = new ChatClient("http://localhost:4000")
export const GameClientContext = createContext<ChatClient>(client);

export function useGameClient() {
  return useContext(GameClientContext);
}
