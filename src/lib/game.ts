import { useCallback, useEffect, useState } from "react";
import { pasos, errores, general } from "@/config/content";

/** Compara sin mayúsculas, tildes ni espacios extremos. */
export function normalize(s: string) {
  return s.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
export function codesMatch(input: string, code: string | null) {
  return !!code && normalize(input) === normalize(code);
}

let lastError = -1;
export function randomError() {
  let i = Math.floor(Math.random() * errores.length);
  if (errores.length > 1) while (i === lastError) i = Math.floor(Math.random() * errores.length);
  lastError = i;
  return errores[i] ?? "";
}

export function stepIndexOf(id: string) {
  return pasos.findIndex((p) => p.id === id);
}

export function waLink(template: string, n: number) {
  return `https://api.whatsapp.com/send?phone=${general.whatsapp}&text=${encodeURIComponent(template.replace("{n}", String(n)))}`;
}

export type GameState = {
  entered: boolean;
  step: number; // índice en pasos
  opened: string[];
  found: string[];
  seen: string[]; // items del tablón ya vistos
};

const KEY = "cachito-a-cachito-v1";
const initial: GameState = { entered: false, step: 0, opened: [], found: [], seen: [] };

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setState(raw ? { ...initial, ...JSON.parse(raw) } : initial);
    } catch {
      setState(initial);
    }
  }, []);

  useEffect(() => {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const update = useCallback((fn: (s: GameState) => GameState) => {
    setState((s) => (s ? fn(s) : s));
  }, []);

  const goTo = useCallback(
    (idx: number) =>
      update((s) => ({
        ...s,
        step: idx,
        opened: [...s.opened, ...(pasos[idx]?.sobres ?? []).filter((l) => !s.opened.includes(l))],
      })),
    [update],
  );

  const enter = useCallback(() => {
    update((s) => ({ ...s, entered: true }));
    goTo(0);
  }, [update, goTo]);

  const find = useCallback(
    (id: string) => update((s) => (s.found.includes(id) ? s : { ...s, found: [...s.found, id] })),
    [update],
  );
  const markSeen = useCallback(
    (ids: string[]) =>
      update((s) => {
        const add = ids.filter((i) => !s.seen.includes(i));
        return add.length ? { ...s, seen: [...s.seen, ...add] } : s;
      }),
    [update],
  );
  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    setState(initial);
  }, []);

  return { state, enter, goTo, find, markSeen, reset };
}
