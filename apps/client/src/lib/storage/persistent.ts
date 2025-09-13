import { Accessor, createSignal, onMount, Setter } from "solid-js";

export function useSessionSignal<T>(key: string, initial: T): [Accessor<T>, Setter<T>] {
  const [value, setValue] = createSignal<T>(initial);

  onMount(() => {
    const stored = sessionStorage.getItem(key);
    if (stored) setValue(JSON.parse(stored));
  });

	const update = (next: Exclude<T, Function> | ((prev: T) => T)) => {
    const v = setValue(next); // Solid handles function vs value
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, update as Setter<T>] as const;
}
