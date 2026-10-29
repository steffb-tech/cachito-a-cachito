import { useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { avatarPatito, general } from "@/config/content";

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title?: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className={`animate-pop relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 shadow-soft sm:rounded-3xl ${wide ? "max-w-xl" : "max-w-md"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button aria-label="Cerrar" onClick={onClose} className="absolute right-3 top-3 rounded-full bg-muted p-2 tappable">
          <X className="h-4 w-4" />
        </button>
        {title && <h2 className="font-hand mb-3 pr-8 text-3xl text-ink">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

/** Avatar de Patito. 5 toques en <3 s → reinicio secreto. */
export function PatitoAvatar({ size = 80, onReset, onBrioche }: { size?: number; onReset: () => void; onBrioche?: () => void }) {
  const taps = useRef<number[]>([]);
  const tap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 3000), now];
    if (taps.current.length >= 5) {
      taps.current = [];
      if (window.confirm(general.confirmarReinicio)) onReset();
    }
  };
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <button aria-label="Patito" onClick={tap} className="h-full w-full">
        <img src={avatarPatito} alt="Patito" width={size} height={size} className="h-full w-full object-contain drop-shadow" />
      </button>
      {onBrioche && (
        <button aria-label="El brioche" onClick={onBrioche} className="absolute left-[46%] top-[46%] h-[22%] w-[26%] rounded-full" />
      )}
    </div>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg border-2 border-dashed border-kraft bg-muted p-3 text-center text-xs text-muted-foreground ${className}`}>
      {label}
    </div>
  );
}

export function isPlaceholder(s?: string) {
  return !s || /^\[.*\]$/.test(s.trim());
}

export function Img({ src, className = "" }: { src: string; className?: string }) {
  return isPlaceholder(src) ? <Placeholder label={src || "[IMAGEN]"} className={className} /> : <img src={src} alt="" loading="lazy" className={`object-cover ${className}`} />;
}
