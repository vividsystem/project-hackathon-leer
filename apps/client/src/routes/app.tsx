import { RouteSectionProps } from "@solidjs/router";
import "@picocss/pico/css/pico.min.css";
import { GameClientProvider } from "~/components/GameClientProvider";

export function AppLayout(props: RouteSectionProps) {
	return (
		<GameClientProvider>
			{props.children}
		</GameClientProvider>
	)
}
