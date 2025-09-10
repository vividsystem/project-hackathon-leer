import { createContext } from "solid-js";
import { ChatClient } from "./chat";

export const ChatContext = createContext(new ChatClient("https://localhost:4000"))


