import { useEffect, useState, type ReactNode } from "react";
import { general, pasos, fichas, cuaderno, tablon, secretos, radio, manual, type ItemTablon } from "@/config/content";
import { codesMatch, randomError, stepIndexOf, waLink, type GameState } from "@/lib/game";
import { Modal, PatitoAvatar, Img, isPlaceholder } from "./ui";

type Props = {
  state: GameState;
  goTo: (i: number) => void;
  find: (id: string) => void;
  markSeen: (ids: string[]) => void;
  reset: () => void;
};

const SECRET_IDS = [
  ...secretos.cajones.map((_, i) => `cajon${i}`),
  ...secretos.botes.map((_, i) => `bote${i}`),
  "flexo", "guirnalda", "brioche", "cuadro",
];

function Tap({ label, onClick, className = "", children }: { label: string; onClick: () => void; className?: string; children: ReactNode }) {
  return (
    <button aria-label={label} onClick={onClick} className={`tappable animate-hint ${className}`}>
      {children}
    </button>
  );
}

function playlistEmbed(url: string) {
  if (isPlaceholder(url)) return null;
  const sp = url.match(/open\.spotify\.com\/(playlist|album)\/([A-Za-z0-9]+)/);
  if (sp) return `https://open.spotify.com/embed/${sp[1]}/${sp[2]}`;
  const yt = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/videoseries?list=${yt[1]}`;
  return url;
}

export function Workshop({ state, goTo, find, markSeen, reset }: Props) {
  const paso = pasos[state.step];
  const [modal, setModal] = useState<null | "cuaderno" | "manual" | "radio" | "nota" | "item">(null);
  const [nota, setNota] = useState("");
  const [item, setItem] = useState<ItemTablon | null>(null);
  const [lamp, setLamp] = useState(true);
  const [lights, setLights] = useState(true);
  const [radioOn, setRadioOn] = useState(false);
  const [drawers, setDrawers] = useState<number[]>([]);

  const secret = (id: string, text: string) => {
    find(id);
    setNota(text);
    setModal("nota");
  };

  const visibleItems = tablon.filter((t) => stepIndexOf(t.unlockAtStep) <= state.step);
  const newIds = visibleItems.filter((t) => !state.seen.includes(t.id)).map((t) => t.id);
  const [shining] = useState(newIds);
  useEffect(() => {
    if (newIds.length) markSeen(newIds);
  }, [newIds.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  const finalReached = state.step >= stepIndexOf("8");
  const fichasOk = fichas.filter((f) => pasos.slice(0, state.step + 1).some((p) => p.ficha === f.id));
  const pullThread = () => window.open(waLink(general.mensajeHilo, paso.numero), "_blank");

  return (
    <main className="mx-auto min-h-dvh max-w-md overflow-hidden bg-cream shadow-soft">
      {/* ===== PARED / PEGBOARD ===== */}
      <section className="pegboard relative px-3 pb-4 pt-2">
        {/* forma orgánica salvia */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden>
          <path d="M0 80 C80 30 140 140 230 90 S360 20 400 70 L400 330 C320 380 260 290 170 350 S40 400 0 360 Z" fill="var(--sage)" opacity=".7" />
        </svg>

        {/* guirnalda */}
        <Tap label="Guirnalda de luces" className="relative block w-full" onClick={() => { setLights(!lights); secret("guirnalda", secretos.guirnalda); }}>
          <svg viewBox="0 0 400 40" className="h-8 w-full" aria-hidden>
            <path d="M0 5 Q100 35 200 10 T400 8" stroke="var(--ink)" strokeWidth="1.2" fill="none" />
          </svg>
          <div className="absolute inset-x-0 top-2 flex justify-around">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className={`h-3 w-2 rounded-full ${lights ? "animate-twinkle bg-glow shadow-[0_0_10px_var(--glow)]" : "bg-muted"}`} style={{ animationDelay: `${i * 0.3}s`, marginTop: i % 2 ? 10 : 4 }} />
            ))}
          </div>
        </Tap>

        {/* plantas colgantes + herramientas */}
        <div className="relative flex items-start justify-between px-1">
          <div className="animate-sway text-3xl" aria-hidden>🪴<div className="-mt-2 text-2xl">🌿</div></div>
          <div className="flex gap-3 pt-1 text-2xl" aria-hidden>
            <span className="animate-sway" style={{ animationDelay: ".5s" }}>✂️</span>
            <span className="animate-sway" style={{ animationDelay: "1s" }}>🔫</span>
            <span className="animate-sway" style={{ animationDelay: "1.5s" }}>🔧</span>
            <span>🧶</span>
          </div>
          <div className="animate-sway text-3xl" style={{ animationDelay: "1s" }} aria-hidden>🪴<div className="-mt-2 text-2xl">🌿</div></div>
        </div>

        {/* balda */}
        <div className="relative mt-2">
          <div className="flex items-end justify-between px-2">
            <div className="flex items-end gap-1">
              {secretos.botes.map((t, i) => (
                <Tap key={i} label={`Bote de cristal ${i + 1}`} onClick={() => secret(`bote${i}`, t)}
                  className="flex h-12 w-9 items-end justify-center rounded-b-lg rounded-t-md border-2 border-card/80 bg-card/40 pb-1 text-sm">
                  {["🧷", "🪡", "🔘"][i % 3]}
                </Tap>
              ))}
              <span className="ml-1 text-2xl" aria-hidden>✏️</span>
            </div>
            {/* cuadro */}
            <Tap label="Cuadro enmarcado" onClick={() => secret("cuadro", finalReached ? secretos.fotoFinal : secretos.cuadro)}
              className="h-16 w-14 rounded-sm border-4 border-wood-dark bg-cream p-1 shadow-soft">
              {finalReached ? <Img src={secretos.fotoFinal} className="h-full w-full !p-0 text-[6px]" /> : isPlaceholder(secretos.laminaBotanica) ? <span className="text-2xl">🌿</span> : <img src={secretos.laminaBotanica} alt="" className="h-full w-full object-cover" />}
            </Tap>
          </div>
          <div className="h-3 rounded-sm bg-wood-dark shadow-soft" />

          {/* hilo rojo */}
          <HiloRojo onPull={pullThread} />
        </div>

        {/* cordel con letras de sobres */}
        {state.opened.length > 0 && (
          <div className="relative mt-3 pr-24">
            <div className="h-px w-full bg-ink/50" />
            <div className="-mt-px flex flex-wrap gap-1.5 pl-2">
              {state.opened.map((l, i) => (
                <span key={l} className="animate-sway kraft rounded-b-md px-1.5 pb-0.5 pt-1 font-hand text-lg leading-none text-ink shadow-soft" style={{ animationDelay: `${i * 0.4}s` }}>{l}</span>
              ))}
            </div>
          </div>
        )}

        {/* tablón */}
        <div className="relative mt-4 grid grid-cols-3 gap-3 pr-20">
          {visibleItems.map((t, i) => (
            <button key={t.id} onClick={() => { setItem(t); setModal("item"); }}
              className={`tappable relative rounded-sm p-1.5 shadow-soft ${t.tipo === "postit" ? "bg-glow" : "bg-card"} ${shining.includes(t.id) ? "animate-shine" : ""}`}
              style={{ transform: `rotate(${((i * 37) % 9) - 4}deg)` }}>
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-thread shadow" />
              {t.tipo === "postit" ? <p className="font-hand line-clamp-3 h-12 text-sm leading-tight">{t.texto}</p> : <Img src={t.imagen || t.texto} className="h-12 w-full text-[8px]" />}
            </button>
          ))}
        </div>

        {paso.vacaciones && (
          <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center">
            <div className="animate-sway text-center">
              <div className="mx-auto h-8 w-28 border-x-2 border-t-2 border-ink/50 rounded-t-full" />
              <div className="rounded-lg border-4 border-wood-dark bg-wood px-5 py-2 shadow-soft">
                <p className="font-hand text-3xl text-ink">{general.cartelVacaciones}</p>
                <p className="text-lg">🏖️ 🇵🇹</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== MESA ===== */}
      <section className="relative bg-wood px-3 pb-6 pt-3">
        <div className="absolute inset-x-0 top-0 h-2 bg-wood-dark/60" />
        <div className="rounded-2xl bg-sage p-3 shadow-soft">
          <Cuacfesionario state={state} goTo={goTo} reset={reset} onBrioche={() => secret("brioche", secretos.brioche)} />

          <div className="mt-4 grid grid-cols-3 items-end gap-3">
            {/* flexo */}
            <Tap label="Flexo" onClick={() => { setLamp(!lamp); secret("flexo", secretos.flexo); }} className="relative flex flex-col items-center">
              <div className={`h-6 w-12 rounded-t-full bg-sage-dark ${lamp ? "shadow-[0_14px_24px_6px_var(--glow)]" : ""}`} />
              <div className="h-10 w-1 rotate-12 bg-sage-dark" />
              <div className="h-2 w-10 rounded bg-sage-dark" />
              <span className="mt-1 text-[10px] text-ink/70">🕯️</span>
            </Tap>
            {/* cuaderno */}
            <Tap label={cuaderno.titulo} onClick={() => setModal("cuaderno")} className="flex flex-col items-center">
              <div className="flex h-14 w-full rotate-[-4deg] overflow-hidden rounded bg-card shadow-soft">
                <div className="flex-1 border-r border-border bg-[repeating-linear-gradient(transparent_0_7px,var(--border)_7px_8px)]" />
                <div className="flex-1 bg-[repeating-linear-gradient(transparent_0_7px,var(--border)_7px_8px)]" />
              </div>
              <span className="font-hand mt-1 text-base leading-none">{cuaderno.titulo}</span>
            </Tap>
            {/* radio */}
            <Tap label="Radio" onClick={() => { setRadioOn(true); setModal("radio"); }} className="relative flex flex-col items-center">
              {radioOn && <span className="animate-float-up absolute -top-4 text-lg">🎵</span>}
              <div className="flex h-12 w-full items-center gap-1 rounded-lg bg-wood-dark p-1.5 shadow-soft">
                <div className="h-full flex-1 rounded bg-[repeating-linear-gradient(90deg,var(--ink)_0_1px,transparent_1px_4px)] opacity-60" />
                <span className={`h-2 w-2 rounded-full ${radioOn ? "bg-glow shadow-[0_0_6px_var(--glow)]" : "bg-ink/40"}`} />
              </div>
              <span className="font-hand mt-1 text-base leading-none">Radio</span>
            </Tap>
          </div>

          <div className="mt-4 grid grid-cols-2 items-end gap-3">
            {/* cajonera */}
            <div className="rounded-md bg-wood-dark p-1 shadow-soft">
              {secretos.cajones.map((t, i) => (
                <button key={i} aria-label={`Cajón ${i + 1}`} onClick={() => { setDrawers((d) => [...d, i]); secret(`cajon${i}`, t); }}
                  className={`tappable mb-1 flex h-7 w-full items-center justify-center rounded-sm bg-wood transition-transform last:mb-0 ${drawers.includes(i) ? "translate-x-2" : ""}`}>
                  <span className="h-1.5 w-5 rounded-full bg-ink/50" />
                </button>
              ))}
            </div>
            {/* pila de libros */}
            <Tap label={manual.titulo} onClick={() => setModal("manual")} className="flex flex-col items-center gap-0.5">
              <div className="h-4 w-[80%] rounded-sm bg-sage-dark" />
              <div className="font-hand flex h-6 w-full items-center justify-center rounded-sm bg-wood-dark text-sm text-primary-foreground">{manual.titulo}</div>
              <div className="h-5 w-[90%] rounded-sm bg-kraft" />
            </Tap>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-ink/60">
          {general.contadorSecretos}: {state.found.filter((f) => SECRET_IDS.includes(f)).length}/{SECRET_IDS.length}
        </p>
      </section>

      {/* ===== MODALES ===== */}
      <Modal open={modal === "nota"} onClose={() => setModal(null)}>
        <div className="kraft rounded-xl p-5 shadow-soft">
          <div className="tape mx-auto -mt-8 mb-3 h-5 w-20 rotate-[-3deg]" />
          {isPlaceholder(nota) && /FOTO/.test(nota) ? <Img src={nota} className="h-48 w-full" /> : <p className="font-hand text-2xl leading-snug">{nota}</p>}
        </div>
      </Modal>

      <Modal open={modal === "item"} onClose={() => setModal(null)}>
        {item && (item.tipo === "postit"
          ? <div className="bg-glow rounded p-6 shadow-soft"><p className="font-hand text-3xl">{item.texto}</p></div>
          : <div className="bg-card rounded p-3 shadow-soft"><Img src={item.imagen || item.texto} className="h-72 w-full" /></div>)}
      </Modal>

      <Modal open={modal === "radio"} onClose={() => setModal(null)} title={`📻 ${radio.titulo}`}>
        {playlistEmbed(general.playlist)
          ? <iframe src={playlistEmbed(general.playlist)!} className="h-96 w-full rounded-xl" allow="autoplay; encrypted-media" title="Playlist" />
          : <p className="text-sm">{radio.sinPlaylist}</p>}
      </Modal>

      <Modal open={modal === "manual"} onClose={() => setModal(null)} title={manual.titulo}>
        <p className="-mt-2 mb-3 text-sm text-muted-foreground">{manual.subtitulo}</p>
        <div className="space-y-2">
          {manual.preguntas.map((q) => (
            <details key={q.p} className="group rounded-xl bg-muted px-4 py-3">
              <summary className="cursor-pointer list-none font-semibold">{q.p}</summary>
              <p className="mt-2 text-sm">🐥 {q.r}</p>
            </details>
          ))}
        </div>
      </Modal>

      <Cuaderno open={modal === "cuaderno"} onClose={() => setModal(null)} fichasOk={fichasOk} />
    </main>
  );
}

function HiloRojo({ onPull }: { onPull: () => void }) {
  const [drag, setDrag] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const pull = () => { setDrag(40); setTimeout(() => setDrag(0), 500); onPull(); };
  return (
    <div className="absolute right-3 top-3 z-10 flex flex-col items-center"
      onPointerDown={(e) => setStart(e.clientY)}
      onPointerMove={(e) => start !== null && setDrag(Math.max(0, Math.min(60, e.clientY - start)))}
      onPointerUp={() => { if (start !== null && drag > 30) pull(); else if (start !== null && drag < 5) pull(); else setDrag(0); setStart(null); }}
      style={{ touchAction: "none" }}>
      <div className="w-0.5 bg-thread transition-all" style={{ height: 70 + drag }} />
      <button aria-label={general.placaHilo} className="animate-sway w-20 rounded-md border-2 border-thread bg-card px-1 py-1 text-center text-[9px] font-bold leading-tight text-thread shadow-soft">
        {general.placaHilo}
      </button>
    </div>
  );
}

function Cuacfesionario({ state, goTo, reset, onBrioche }: { state: GameState; goTo: (i: number) => void; reset: () => void; onBrioche: () => void }) {
  const paso = pasos[state.step];
  const next = pasos[state.step + 1];
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [party, setParty] = useState(0);

  const advance = (i: number) => { goTo(i); setParty((p) => p + 1); setError(""); setValue(""); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // en el paso 1 (sin código) no se puede saltar; en vacaciones se acepta el código del paso 2
    if (next && codesMatch(value, next.codigo)) advance(state.step + 1);
    else setError(randomError());
  };

  return (
    <div className="relative rounded-2xl bg-cream p-3 shadow-soft">
      <p className="font-hand absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sage-dark px-3 text-lg leading-6 text-primary-foreground">{general.rotuloCuacfesionario}</p>
      {party > 0 && (
        <div key={party} className="pointer-events-none absolute inset-0 flex justify-around" aria-hidden>
          {["🎉", "🐥", "✨", "🥐", "🎊", "✨"].map((c, i) => (
            <span key={i} className="animate-float-up text-2xl" style={{ animationDelay: `${i * 0.08}s`, marginTop: 60 }}>{c}</span>
          ))}
        </div>
      )}
      <div className="mt-2 flex items-start gap-2">
        <PatitoAvatar size={84} onReset={reset} onBrioche={onBrioche} />
        <div key={state.step} className="animate-pop relative flex-1 rounded-2xl bg-card p-3 text-sm leading-relaxed shadow-soft">
          {paso.mensaje} <span>{general.firma}</span>
        </div>
      </div>
      {paso.construccion && (
        <a href={waLink(general.mensajeFoto, paso.numero)} target="_blank" rel="noreferrer"
          className="mt-3 block rounded-xl bg-kraft py-2 text-center text-sm font-bold shadow-soft tappable">{cuaderno.botonFoto}</a>
      )}
      {paso.botonAvanzar && next ? (
        <button onClick={() => advance(state.step + 1)} className="font-hand mt-3 w-full rounded-xl bg-primary py-2 text-2xl text-primary-foreground shadow-soft tappable">{paso.botonAvanzar}</button>
      ) : next ? (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Código" autoCapitalize="characters"
            className="min-w-0 flex-1 rounded-xl border border-input bg-card px-3 py-2 tracking-widest outline-none focus:ring-2 focus:ring-ring" />
          <button className="font-hand shrink-0 rounded-xl bg-primary px-3 text-xl text-primary-foreground shadow-soft tappable">{general.botonCodigo}</button>
        </form>
      ) : null}
      {error && <p className="font-hand animate-pop mt-2 text-center text-xl text-thread">{error}</p>}
    </div>
  );
}

function Cuaderno({ open, onClose, fichasOk }: { open: boolean; onClose: () => void; fichasOk: typeof fichas }) {
  const [tab, setTab] = useState(0);
  useEffect(() => { if (open) setTab(Math.max(0, fichasOk.length - 1)); }, [open, fichasOk.length]);
  if (!open) return null;
  const f = fichasOk[tab];
  const numero = f ? pasos.find((p) => p.ficha === f.id)?.numero ?? f.id : 0;
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-ink/60">
      <div className="animate-pop flex h-dvh w-full max-w-xl flex-col bg-card">
        <div className="flex items-center justify-between bg-sage-dark px-4 py-3 text-primary-foreground">
          <h2 className="font-hand text-3xl">{cuaderno.titulo}</h2>
          <button onClick={onClose} className="rounded-full bg-card/20 px-3 py-1 text-sm tappable">Cerrar</button>
        </div>
        {fichasOk.length > 0 && (
          <div className="flex gap-1 overflow-x-auto bg-sage px-2 pt-2">
            {fichasOk.map((x, i) => (
              <button key={x.id} onClick={() => setTab(i)} className={`font-hand shrink-0 rounded-t-lg px-3 py-1 text-lg ${i === tab ? "bg-card" : "bg-kraft/70"}`}>Ficha {x.id}</button>
            ))}
          </div>
        )}
        <div className="flex-1 overflow-y-auto bg-[repeating-linear-gradient(transparent_0_27px,var(--border)_27px_28px)] p-5">
          {!f ? <p className="font-hand text-2xl">{cuaderno.vacio}</p> : (
            <article>
              <h3 className="font-hand text-4xl leading-none">Ficha {f.id} · {f.titulo}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Sobres: {f.sobres}</p>
              <p className="mt-3 rounded-lg bg-muted p-3 text-sm"><b>{cuaderno.necesitas}:</b> {f.necesitas}</p>
              <ol className="mt-4 space-y-4">
                {f.pasos.map((p, i) => (
                  <li key={i} className="rounded-xl bg-card/90 p-3 shadow-soft">
                    <p className="text-sm"><b className="font-hand mr-1 text-2xl text-sage-dark">{i + 1}.</b>{p.texto}</p>
                    {p.ilustracion && <Img src={p.ilustracion} className="mt-2 h-28 w-full" />}
                  </li>
                ))}
              </ol>
              <div className="mt-4 space-y-2">
                {f.notas.map((n, i) => <p key={i} className="font-hand rounded-lg bg-glow/60 p-3 text-xl leading-snug">{n}</p>)}
              </div>
              <a href={waLink(general.mensajeFoto, numero)} target="_blank" rel="noreferrer"
                className="mt-5 block rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground shadow-soft tappable">{cuaderno.botonFoto}</a>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
