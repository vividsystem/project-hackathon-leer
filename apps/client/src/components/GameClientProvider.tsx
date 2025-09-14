import { ParentProps } from "solid-js";
import { onCleanup } from "solid-js/types/server/reactive.js";
import { ChatClient } from "~/lib/chat";
import { GameClientContext } from "~/lib/context";

export function GameClientProvider(props: ParentProps) {
  onCleanup(() => {
    GameClientContext.defaultValue.disconnect();
  });

  return (
    <GameClientContext.Provider value={GameClientContext.defaultValue}>
			{props.children}
		</GameClientContext.Provider>
  );
}
