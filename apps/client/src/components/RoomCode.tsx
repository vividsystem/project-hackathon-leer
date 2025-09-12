import { createSignal, Show } from "solid-js";
import { Check, Copy} from "lucide-solid"
export type RoomCodeProps = {
  code: string;
  class?: string;
  onCopy?: (copiedText: string) => void;
};

export default function RoomCode(props: RoomCodeProps) {
  const [copied, setCopied] = createSignal(false);

  async function copyToClipboard() {
    const text = props.code;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    props.onCopy?.(text);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div class={`inline-flex items-center gap-2 ${props.class ?? ''}`}>
      <div
        class="font-mono font-semibold tracking-wider px-3 py-2 rounded-md bg-slate-900 text-slate-100 shadow-inner select-all cursor-pointer"
        role="status"
        aria-live="polite"
        title={props.code}
        onClick={(e) => {
          e.stopPropagation();
          copyToClipboard();
        }}
      >
        {props.code}
      </div>

      <button
        class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        aria-label="Copy room code"
        onClick={(e) => { e.stopPropagation(); copyToClipboard(); }}
      >
				<Show when={!copied()} fallback={<Check/>}>
					<Copy />
				</Show>
      </button>
    </div>
  );
}
