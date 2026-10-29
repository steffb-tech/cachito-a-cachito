import { createFileRoute } from "@tanstack/react-router";
import { useGame } from "@/lib/game";
import { Door } from "@/components/taller/Door";
import { Workshop } from "@/components/taller/Workshop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cachito a Cachito" },
      { name: "description", content: "Un taller con mucha miga." },
      { property: "og:title", content: "Cachito a Cachito" },
      { property: "og:description", content: "Un taller con mucha miga." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const { state, enter, goTo, find, markSeen, reset } = useGame();
  if (!state) return <div className="pegboard min-h-dvh" />;
  if (!state.entered) return <Door onEnter={enter} onReset={reset} />;
  return <Workshop state={state} goTo={goTo} find={find} markSeen={markSeen} reset={reset} />;
}
