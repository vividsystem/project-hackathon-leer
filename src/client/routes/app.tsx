import { RouteSectionProps } from "@solidjs/router";
import { ChatContext } from "../lib/contexts";
import { ChatClient } from "../lib/chat";

export function AppLayout(props: RouteSectionProps) {
	const client = new ChatClient("https://localhost:4000")
	return (
		<div>
		<ChatContext.Provider value={client}>
		{props.children}
		</ChatContext.Provider>
		</div>
	)
}
