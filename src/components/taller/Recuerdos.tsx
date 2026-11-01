import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { cajonesRecuerdos, type Recuerdo } from "@/config/content";
import { Button, Modal } from "./ui";

export function Recuerdos({ cajon, onClose }: { cajon: number; onClose: () => void }) {
  const [objeto, setObjeto] = useState<Recuerdo | null>(null);
  const [reverso, setReverso] = useState(false);
  const objetos = cajonesRecuerdos[cajon] ?? [];
  return <Modal open onClose={onClose} title={`Cajón de recuerdos ${cajon + 1}`}>
    {objeto ? <>
      <Button aria-label="Volver al cajón" title="Volver al cajón" onClick={() => { setObjeto(null); setReverso(false); }} className="mb-3 rounded-full bg-muted p-2"><ArrowLeft size={20} /></Button>
      {reverso && objeto.reverso
        ? <div className="mx-auto flex aspect-[3/4] max-h-80 items-center justify-center rounded-md border border-ink bg-ink p-6 font-hand text-3xl text-card"><p>{objeto.reverso.prefijo} <s className="decoration-thread decoration-2">{objeto.reverso.tachado}</s></p></div>
        : <img src={objeto.imagen} alt={objeto.nombre} width={768} height={1024} loading="lazy" className="h-80 w-full rounded-md object-contain" />}
      {objeto.reverso && <Button aria-label="Dar la vuelta a la carta" title="Dar la vuelta a la carta" onClick={() => setReverso(!reverso)} className="mx-auto mt-2 flex rounded-full bg-sage p-2"><RotateCcw size={20} /></Button>}
      <div className="relative mt-6 bg-glow/70 p-5 shadow-soft"><span className="tape absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-4deg]" /><p className="font-hand text-2xl leading-snug">{objeto.nota}</p></div>
    </> : <div className={`relative min-h-72 rounded-md border-8 border-wood-dark bg-wood p-3 shadow-soft ${cajon === 2 ? "h-80" : "grid grid-cols-2 gap-3"}`}>
      {objetos.map((o, i) => <Button key={o.id} aria-label={o.nombre} onClick={() => setObjeto(o)} className={cajon === 2 ? (i === 0 ? "absolute bottom-3 left-2 h-[85%] w-[80%] rotate-[-5deg]" : "absolute right-3 top-5 h-[50%] w-[32%] rotate-[8deg] shadow-soft") : "h-64 rotate-[-3deg] overflow-hidden rounded-md"}>
        <img src={o.imagen} alt={o.nombre} width={768} height={1024} loading="lazy" className="h-full w-full object-contain" />
      </Button>)}
    </div>}
  </Modal>;
}