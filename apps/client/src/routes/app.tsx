import { RouteSectionProps } from "@solidjs/router";
import "@picocss/pico/css/pico.min.css";

export function AppLayout(props: RouteSectionProps) {
	return (
		<div>
			{props.children}
		</div>
	)
}
