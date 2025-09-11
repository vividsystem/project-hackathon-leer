import { createSignal, For, Component, createEffect } from "solid-js";
import "@picocss/pico/css/pico.min.css";
import { client } from "~/lib/chat";

type Message = {
  id: number;
  text: string;
  sentByUser: boolean;
  sender: string;
  timestamp: Date;
};

const Chat: Component = () => {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [input, setInput] = createSignal("");

  let lastId = 0;
  const nextId = () => ++lastId;

	client.onMessage((message) => {
		setMessages((prev) => [
			...prev,
			{
				id: nextId(),
				sender: message.sender,
				text: message.message,
				sentByUser: true,
				timestamp: new Date()
			}
		])
	})


  const addMessage = (text: string, sentByUser: boolean, sender: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        text,
        sentByUser,
        sender,
        timestamp: new Date(),
      },
    ]);
  };

  const simulateReply = () => {
    setTimeout(() => {
      addMessage("pong:" + input(), false, "Test");
    }, 800);
  };

  const send = () => {
    const txt = input().trim();
    if (!txt) return;
    addMessage(txt, true, "Me");
		client.sendMessage(txt)
    setInput("");
    simulateReply();
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  let scrollContainer: HTMLDivElement | undefined;

  createEffect(() => {
    messages();

    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 0);
  });

  return (
    <section
      class="chat"
      style="display:flex;flex-direction:column;height:70vh;"
    >
      <div
        ref={scrollContainer}
        class="messages"
        style="overflow:auto;padding:1rem;flex:1;"
      >
        <For each={messages()}>
          {(msg) => (
            <div
              class="message"
              style={{
                "text-align": msg.sentByUser ? "right" : "left",
                "margin-bottom": "0.8rem",
              }}
            >
              <p>{msg.sender}</p>
              <p
                class="pico"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 0.75rem",
                  "border-radius": "0.5rem",
                  background: msg.sentByUser ? "#0099ff" : "#e0e0e0",
                  color: msg.sentByUser ? "white" : "black",
                }}
              >
                {msg.text}
              </p>
              <small style="display:block;margin-top:0.2rem;color:#888;font-size:0.8rem;">
                {msg.timestamp.toLocaleTimeString()}
              </small>
            </div>
          )}
        </For>
      </div>

      <div
        class="input-group"
        style="padding:1rem;border-top:1px solid #e0e0e0;"
      >
        <textarea
          class="textarea"
          placeholder="Type a message..."
          rows={1}
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKey}
          style="width:100%;border-radius:4px;border:1px solid #ccc;padding:0.5rem;font-size:1rem;"
        />
        <button
          class="button primary"
          onClick={send}
          style="margin-top:0.5rem;width:100%;"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Chat;
