import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import { general, pasos, fichas, cuaderno, tablon, secretos, radio, manual, type ItemTablon } from "@/config/content";
import { codesMatch, randomError, stepIndexOf, waLink, type GameState } from "@/lib/game";
import escena from "@/assets/taller-escena.jpg";
import { avatarPatito } from "@/config/content";
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

function Spot({ label, box, onClick, style, tag, children }: { label: string; box: string; onClick: () => void; style?: CSSProperties; tag?: string; children?: ReactNode }) {
  return (
    <button aria-label={label} onClick={onClick} style={style}
      className={`group absolute rounded-xl transition-all active:scale-95 hover:bg-glow/15 hover:shadow-[0_0_0_2px_var(--glow)] ${box}`}>
      <span className="animate-twinkle pointer-events-none absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_6px_var(--glow)]" />
      {tag && <span className="font-hand pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-card/85 px-2 text-sm leading-5 text-ink shadow-soft">{tag}</span>}
      {children}
    </button>
  );
}

function playlistEmbed(url: string) {
  if (isPlaceholder(url)) return null;
  const sp = url.match(/open\.spotify\.com\/(playlist|album)\/([A-Za-z0-9]+)/);
  if (sp) return `https://open.spotify.com/embed/${sp[1]}/${sp[2]}`;
  const yt = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/videoseries?list=${yt[1]}&autoplay=1&playsinline=1`;
  return url;
}

export function Workshop({ state, goTo, find, markSeen, reset }: Props) {
  const paso = pasos[Math.min(state.step, pasos.length - 1)]!;
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
  const pullThread = () => { window.location.href = waLink(general.mensajeHilo, paso.numero); };

  return (
    <main className="mx-auto min-h-dvh max-w-md overflow-hidden bg-wood shadow-soft">
      {/* ===== ESCENA ILUSTRADA (zonas táctiles en %) ===== */}
      <section className="relative w-full" style={{ aspectRatio: "1088 / 1632" }}>
        <img src={escena} alt="El taller" width={1088} height={1632} className="absolute inset-0 h-full w-full object-cover" />
        {/* brillo cálido de lucecitas y flexo */}
        {lights && <div className="animate-twinkle pointer-events-none absolute left-[15%] top-[13%] h-[8%] w-[75%] rounded-full bg-glow/25 blur-xl" />}
        {!lights && <div className="pointer-events-none absolute left-[15%] top-[14%] h-[6%] w-[75%] bg-ink/25 blur-md" />}
        {lamp ? <div className="pointer-events-none absolute left-[12%] top-[50%] h-[18%] w-[30%] rounded-full bg-glow/30 blur-2xl" />
              : <div className="pointer-events-none absolute left-[0%] top-[40%] h-[30%] w-[35%] rounded-full bg-ink/30 blur-2xl" />}

        <Spot label="Guirnalda de luces" box="left-[15%] top-[14%] w-[75%] h-[6%]" onClick={() => { setLights(!lights); secret("guirnalda", secretos.guirnalda); }} />
        <Spot label="Cuadro enmarcado" box="left-[23%] top-[0%] w-[19%] h-[13%]" onClick={() => secret("cuadro", finalReached ? secretos.fotoFinal : secretos.cuadro)}>
          {finalReached && <div className="absolute inset-[12%] overflow-hidden"><Img src={secretos.fotoFinal} className="h-full w-full text-[7px]" /></div>}
          {!finalReached && !isPlaceholder(secretos.laminaBotanica) && <img src={secretos.laminaBotanica} alt="" className="absolute inset-[12%] h-[76%] w-[76%] object-cover" />}
        </Spot>
        {secretos.botes.map((t, i) => (
          <Spot key={i} label={`Bote de cristal ${i + 1}`} box={`top-[6%] h-[9%] w-[9%]`} style={{ left: `${56 + i * 10}%` }} onClick={() => secret(`bote${i}`, t)} />
        ))}
        <Spot label="Flexo" box="left-[0%] top-[40%] w-[32%] h-[24%]" onClick={() => { setLamp(!lamp); secret("flexo", secretos.flexo); }} />
        <Spot label={manual.titulo} box="left-[3%] top-[64%] w-[25%] h-[9%]" onClick={() => setModal("manual")} tag={manual.titulo} />
        <Spot label="Radio" box="left-[62%] top-[53%] w-[15%] h-[8%]" onClick={() => { setRadioOn(true); setModal("radio"); }}>
          {radioOn && <span className="animate-float-up absolute -top-2 left-1/2 text-xl">🎵</span>}
          {radioOn && <span className="absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-glow shadow-[0_0_8px_var(--glow)]" />}
        </Spot>
        {secretos.cajones.map((t, i) => (
          <Spot key={i} label={`Cajón ${i + 1}`} box="left-[77%] h-[3.2%] w-[15%]" style={{ top: `${51.8 + i * 3.1}%`, transform: drawers.includes(i) ? "translate(6%, 8%) scale(1.04)" : undefined }}
            onClick={() => { setDrawers((d) => [...d, i]); secret(`cajon${i}`, t); }} />
        ))}
        <Spot label={cuaderno.titulo} box="left-[43%] top-[64%] w-[36%] h-[9%]" onClick={() => setModal("cuaderno")} tag={cuaderno.titulo} />

        {/* hilo rojo colgando de la balda */}
        <div className="absolute left-[71%] top-[16.5%]"><HiloRojo onPull={pullThread} /></div>

        {/* tablón: post-its y fotos sobre el pegboard */}
        <div className="absolute left-[37%] top-[20%] z-[5] grid w-[38%] grid-cols-3 gap-[5%]">
          {visibleItems.map((t, i) => (
            <button key={t.id} onClick={() => { setItem(t); setModal("item"); }}
              className={`tappable relative aspect-square rounded-sm p-0.5 shadow-soft ${t.tipo === "postit" ? "bg-glow" : "bg-card"} ${shining.includes(t.id) ? "animate-shine" : ""}`}
              style={{ transform: `rotate(${((i * 37) % 9) - 4}deg)` }}>
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-thread shadow" />
              {t.tipo === "postit" ? <p className="font-hand line-clamp-4 text-[11px] leading-tight">{t.texto}</p> : <Img src={t.imagen || t.texto} className="h-full w-full !p-0 text-[6px]" />}
            </button>
          ))}
        </div>

        {/* cinta con luces y letras en la balda superior */}
        {state.opened.length > 0 && (
          <div className="pointer-events-none absolute left-[14%] top-[13.5%] z-[6] w-[78%]">
            <div className="h-0.5 w-full rounded bg-ink/70" />
            <div className="-mt-0.5 flex items-start justify-center gap-1">
              {state.opened.flatMap((l, i) => [
                <span key={`b${i}`} className={`mt-0.5 h-2.5 w-2 rounded-full ${lights ? "animate-twinkle bg-glow shadow-[0_0_8px_var(--glow)]" : "bg-muted"}`} style={{ animationDelay: `${i * 0.3}s` }} />,
                <span key={l} className="animate-sway kraft rounded-b-md border border-ink/20 px-1.5 pb-1 pt-1 font-hand text-2xl leading-none text-ink shadow-soft" style={{ animationDelay: `${i * 0.4}s` }}>{l}</span>,
              ])}
              <span className={`mt-0.5 h-2.5 w-2 rounded-full ${lights ? "animate-twinkle bg-glow shadow-[0_0_8px_var(--glow)]" : "bg-muted"}`} />
            </div>
          </div>
        )}

        {paso.vacaciones && (
          <div className="pointer-events-none absolute inset-x-0 top-[22%] z-10 flex justify-center">
            <div className="animate-sway text-center">
              <div className="mx-auto h-8 w-28 rounded-t-full border-x-2 border-t-2 border-ink/50" />
              <div className="rounded-lg border-4 border-wood-dark bg-wood px-5 py-2 shadow-soft">
                <p className="font-hand text-3xl text-ink">{general.cartelVacaciones}</p>
                <p className="text-lg">🏖️ 🇵🇹</p>
              </div>
            </div>
          </div>
        )}

        <p className="absolute bottom-2 left-2 rounded-full bg-card/80 px-2 py-0.5 text-[10px] text-ink/70">
          {general.contadorSecretos}: {state.found.filter((f) => SECRET_IDS.includes(f)).length}/{SECRET_IDS.length}
        </p>
      </section>

      {/* ===== CUACFESIONARIO ===== */}
      <section className="-mt-8 relative z-10 px-3 pb-6">
        <div className="rounded-2xl bg-sage p-3 pt-5 shadow-soft">
          <Cuacfesionario state={state} goTo={goTo} reset={reset} onBrioche={() => secret("brioche", secretos.brioche)} />
        </div>
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

      {/* Radio persistente: misma estructura siempre, solo cambian clases → el iframe no se destruye */}
      {radioOn && (() => {
        const big = modal === "radio";
        const src = playlistEmbed(general.playlist);
        return (
          <div className={big ? "fixed inset-0 z-40 flex items-center justify-center bg-ink/50 p-4" : "pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center"}
            onClick={() => big && setModal(null)}>
            <div onClick={(e) => e.stopPropagation()}
              className={big ? "w-full max-w-md rounded-2xl bg-card p-4 shadow-soft" : "pointer-events-auto flex w-[min(92vw,26rem)] items-center gap-2 rounded-full bg-card/95 p-1.5 pr-2 shadow-soft"}>
              <div className={big ? "mb-3 flex items-center justify-between gap-2" : "contents"}>
                <button onClick={() => setModal(big ? null : "radio")} className={big ? "font-hand text-left text-2xl" : "order-2 flex-1 truncate text-left text-sm"}>
                  {big ? "📻" : "🎵"} {radio.titulo}
                </button>
                <div className={big ? "flex gap-1" : "order-3 flex gap-1"}>
                  <button onClick={() => setModal(big ? null : "radio")} className="rounded-full bg-sage px-3 py-1 text-xs">{big ? "➖ Minimizar" : "⬆️"}</button>
                  <button aria-label="Apagar radio" onClick={() => { setRadioOn(false); setModal(null); }} className="rounded-full bg-muted px-3 py-1 text-xs">⏻</button>
                </div>
              </div>
              <div className={big ? "w-full" : "order-1 h-10 w-16 shrink-0 overflow-hidden rounded-full"}>
                {src
                  ? <iframe src={src} className={big ? "aspect-video w-full rounded-xl" : "h-full w-full"} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen title="Playlist" />
                  : <p className="text-sm">{radio.sinPlaylist}</p>}
              </div>
            </div>
          </div>
        );
      })()}

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
  const [hint, setHint] = useState(false);
  const THRESHOLD = 50;
  const release = () => {
    if (start === null) return;
    const d = drag;
    setStart(null);
    setDrag(0);
    if (d >= THRESHOLD) onPull();
    else { setHint(true); setTimeout(() => setHint(false), 1500); }
  };
  return (
    <div className="relative z-10 flex -translate-x-1/2 select-none flex-col items-center"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setStart(e.clientY); }}
      onPointerMove={(e) => start !== null && setDrag(Math.max(0, Math.min(110, e.clientY - start)))}
      onPointerUp={release}
      onPointerCancel={release}
      style={{ touchAction: "none", cursor: start !== null ? "grabbing" : "grab" }}>
      <div className={`w-0.5 bg-thread ${start === null ? "transition-all duration-300" : ""}`} style={{ height: 90 + drag, width: drag >= THRESHOLD ? 3 : 2 }} />
      <div role="button" aria-label={general.placaHilo}
        className={`${start === null ? "animate-sway" : ""} w-20 rounded-md border-2 border-thread bg-card px-1 py-1 text-center text-[9px] font-bold leading-tight text-thread shadow-soft`}>
        {general.placaHilo}
      </div>
      {(hint || (start !== null && drag < THRESHOLD)) && (
        <span className="mt-1 whitespace-nowrap rounded-full bg-card/90 px-2 text-[10px] text-thread shadow-soft">⬇️ Tira más fuerte</span>
      )}
    </div>
  );
}

function Cuacfesionario({ state, goTo, reset, onBrioche }: { state: GameState; goTo: (i: number) => void; reset: () => void; onBrioche: () => void }) {
  const paso = pasos[Math.min(state.step, pasos.length - 1)]!;
  const next = pasos[state.step + 1];
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [party, setParty] = useState(0);
  const [open, setOpen] = useState(false);

  const advance = (i: number) => { goTo(i); setParty((p) => p + 1); setError(""); setValue(""); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // en el paso 1 (sin código) no se puede saltar; en vacaciones se acepta el código del paso 2
    if (next && codesMatch(value, next.codigo)) advance(state.step + 1);
    else setError(randomError());
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="tappable flex w-full items-center gap-3 rounded-2xl bg-cream p-3 text-left shadow-soft">
      <img src={avatarPatito} alt="Patito" width={84} height={84} className="h-20 w-20 shrink-0 object-contain drop-shadow" />
      <span className="animate-pop relative flex-1 rounded-2xl bg-card p-3 font-hand text-2xl leading-tight text-ink shadow-soft">
        ¡Cuac! Púlsame, que tengo algo que contarte. 🐥
      </span>
    </button>
  );
  return (
    <div className="relative rounded-2xl bg-cream p-3 shadow-soft">
      <button onClick={() => setOpen(false)} aria-label="Plegar" className="absolute right-2 top-2 z-10 rounded-full bg-muted px-2 text-sm tappable">▾</button>
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
        <a href={waLink(general.mensajeFoto, paso.numero)} target="_blank" rel="noopener noreferrer"
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
                    {p.ilustracion && <Img src={p.ilustracion} className="mt-2 aspect-[4/3] w-full rounded-lg !object-contain" />}
                  </li>
                ))}
              </ol>
              <div className="mt-4 space-y-2">
                {f.notas.map((n, i) => <p key={i} className="font-hand rounded-lg bg-glow/60 p-3 text-xl leading-snug">{n}</p>)}
              </div>
              <a href={waLink(general.mensajeFoto, numero)} target="_blank" rel="noopener noreferrer"
                className="mt-5 block rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground shadow-soft tappable">{cuaderno.botonFoto}</a>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
