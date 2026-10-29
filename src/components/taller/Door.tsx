import { useState } from "react";
import { Lock } from "lucide-react";
import { general, puerta } from "@/config/content";
import { codesMatch, randomError } from "@/lib/game";
import { PatitoAvatar } from "./ui";

export function Door({ onEnter, onReset }: { onEnter: () => void; onReset: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(0);
  const [opening, setOpening] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codesMatch(value, puerta.contrasena)) {
      setOpening(true);
      setTimeout(onEnter, 1200);
    } else {
      setError(randomError());
      setShake((n) => n + 1);
    }
  };

  return (
    <main className="pegboard flex min-h-dvh flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Patito asomada */}
        <div className="mb-3 flex items-end gap-2">
          <PatitoAvatar size={92} onReset={onReset} />
          <div className="relative flex-1 rounded-2xl bg-card p-3 text-sm shadow-soft">
            {puerta.bocadillo} <span>{general.firma}</span>
          </div>
        </div>

        <div className="rounded-t-[2.5rem] bg-wood-dark p-3 shadow-soft" style={{ perspective: 900 }}>
          <div
            className="relative rounded-t-[2rem] bg-wood p-6 transition-transform duration-[1200ms] ease-in-out"
            style={{ transformOrigin: "left center", transform: opening ? "rotateY(-80deg)" : "none", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 46px, oklch(0.6 0.06 65 / .35) 46px 48px)" }}
          >
            {/* cartelito */}
            <div className="mx-auto mb-6 w-fit animate-sway">
              <div className="mx-auto h-5 w-24 border-x-2 border-t-2 border-ink/40 rounded-t-full" />
              <div className="kraft rounded-lg px-4 py-2 text-center shadow-soft">
                <p className="font-hand text-3xl leading-none text-ink">{general.titulo}</p>
                <p className="font-hand text-lg text-ink/80">{general.subtitulo}</p>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-3 rounded-2xl bg-cream/90 p-4">
              <div key={shake} className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-dark text-primary-foreground ${shake ? "animate-shake" : ""}`}>
                <Lock className="h-6 w-6" />
              </div>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={puerta.placeholder}
                autoCapitalize="characters"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="font-hand w-full rounded-xl bg-primary py-2 text-2xl text-primary-foreground shadow-soft tappable">{general.botonCodigo}</button>
              {error && <p className="font-hand animate-pop text-center text-xl text-thread">{error}</p>}
            </form>
            <div className="absolute right-4 top-1/2 h-4 w-4 rounded-full bg-ink/60" />
          </div>
        </div>
      </div>
    </main>
  );
}
