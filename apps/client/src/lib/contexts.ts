import { createContext } from "solid-js";
import { ChatClient } from "./chat";

export const ChatContext = createContext(new ChatClient("http://localhost:4000"))
