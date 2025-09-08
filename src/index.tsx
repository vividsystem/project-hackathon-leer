/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "@picocss/pico/css/pico.min.css";
import App from "./App";

const wrapper = document.getElementById("app");

if (!wrapper) {
  throw new Error("Wrapper div not found");
}

render(() => (
	<Router>
		<Route path="/" component={App} />
	</Router>
), wrapper)
