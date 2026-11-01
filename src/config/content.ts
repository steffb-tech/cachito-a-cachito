/* =====================================================================
 * CACHITO A CACHITO · ARCHIVO ÚNICO DE CONTENIDO
 * ---------------------------------------------------------------------
 * Aquí está TODO lo editable: textos, códigos, pasos, fichas, FAQ,
 * post-its, fotos, secretos, WhatsApp y playlist.
 * Lo que va entre [CORCHETES] es un marcador pendiente de rellenar.
 * Los códigos se comparan sin mayúsculas, tildes ni espacios extremos.
 * ===================================================================== */

// [AVATAR_PATITO] → sustituye este archivo por tu imagen (misma ruta) o cambia el import.
import patitoImg from "@/assets/patito.png";
import fotoRecuerdo from "@/assets/foto-recuerdo.png.asset.json";
import laminaCapadocia from "@/assets/lamina-capadocia.png.asset.json";
import bingo from "@/assets/recuerdo-bingo.jpg";
import guatafac from "@/assets/recuerdo-guatafac.jpg";
import shakira from "@/assets/recuerdo-shakira.jpg";
import ticket from "@/assets/recuerdo-ticket.jpg";
import mapas from "@/assets/recuerdo-mapas.jpg";
import sanFrutos from "@/assets/recuerdo-san-frutos.jpg";

export const avatarPatito: string = patitoImg;

// ---------- GENERAL ----------
export const general = {
  titulo: "Cachito a Cachito",
  subtitulo: "Un taller con mucha miga",
  firma: "🐥",
  botonCodigo: "¡Manos a la miga!",
  // Número de WhatsApp sin "+" ni espacios
  whatsapp: "34669835821",
  // {n} se sustituye por el número del paso actual
  mensajeFoto: "📸 Paso {n} terminado, Patito. ¿Me das el visto bueno?",
  mensajeHilo: "🧵 Han tirado del hilo rojo. Cachito en apuros en el paso {n}.",
  // Enlace de Spotify o YouTube (playlist). Se convierte solo a reproductor.
  playlist: "https://youtube.com/playlist?list=PLAPbJOs-QqLc&si=S_r0r2QBryVc5u8H",
  placaHilo: "¿Cachito en apuros? Tire del hilo rojo",
  cartelVacaciones: "Cerrado por vacaciones",
  rotuloCuacfesionario: "Cuacfesionario",
  contadorSecretos: "Secretos encontrados",
  confirmarReinicio: "🐥 ¿Borro todo el progreso y volvemos a la puerta?",
};

// ---------- LA PUERTA ----------
export const puerta = {
  contrasena: "FRIKI",
  cartel: "Cachito a Cachito · Un taller con mucha miga",
  bocadillo:
    "¡Alto ahí! Sin contraseña no se entra. La sabe un patito que se ha escondido en tu caja. Encuéntralo.",
  placeholder: "Contraseña",
};

// ---------- MENSAJES DE ERROR (aleatorios, sin repetir el anterior) ----------
export const errores = [
  "Frío, frío, Cachito.",
  "Eso no es. Pero valoro el esfuerzo.",
  "Casi. Bueno, no. Ni casi.",
  "¿Has probado a pensar? Dicen que funciona.",
  "Patito no está impresionada.",
  "Mi paciencia es infinita. Casi.",
];

// ---------- PASOS ----------
// id: identificador (también usado en unlockAtStep)
// numero: número que aparece en los WhatsApp
// codigo: código que DESBLOQUEA este paso (null = se llega por botón/contraseña)
// botonAvanzar: si existe, se muestra un botón que pasa al siguiente paso sin código
// sobres: letras que se abren en este paso
// ficha: id de la ficha del cuaderno que desbloquea
// construccion: muestra botón de foto
// vacaciones: cuelga el cartel de "Cerrado por vacaciones"
export type Paso = {
  id: string;
  numero: number;
  codigo: string | null;
  mensaje: string;
  sobres: string[];
  ficha?: number;
  construccion?: boolean;
  botonAvanzar?: string;
  vacaciones?: boolean;
};

export const pasos: Paso[] = [
  {
    id: "1",
    numero: 1,
    codigo: null, // se desbloquea con la contraseña de la puerta
    mensaje:
      "¡Por fin! Bienvenido a Cachito a Cachito, un taller con mucha miga. Primera misión: en tu caja hay dos sobres esperándote, la G y la M. Encuéntralos y ábrelos. Tranquilo, no muerden… pero no te acostumbres: el resto no será tan fácil.",
    sobres: ["G", "M"],
    botonAvanzar: "¡Abiertos!",
  },
  {
    id: "vacaciones",
    numero: 1,
    codigo: null,
    mensaje:
      "¡Buen comienzo! Guarda bien lo que has encontrado. El taller cierra por vacaciones: disfruta del viaje y nos vemos a la vuelta de Portugal.",
    sobres: [],
    vacaciones: true,
  },
  {
    id: "2",
    numero: 2,
    codigo: "MENINAS",
    mensaje:
      "¡MENINAS! Velázquez estaría orgulloso, las gemelas no tanto. Ahora busca los sobres de la N y la C: se acabaron las vacaciones. Tienes las instrucciones en el cuaderno de obra. Cuando termines, mándame una foto.",
    sobres: ["N", "C"],
    ficha: 2,
    construccion: true,
  },
  {
    id: "3",
    numero: 3,
    codigo: "[CODIGO_3]",
    mensaje: "¡Visto bueno de Patito! Ahora toca la O del patito y la E. Al cuaderno, que hay trabajo.",
    sobres: ["O🐥", "E"],
    ficha: 3,
    construccion: true,
  },
  {
    id: "4",
    numero: 4,
    codigo: "[CODIGO_4]",
    mensaje: "Muy bien. Un solo sobre esta vez: la I.",
    sobres: ["I"],
    ficha: 4,
    construccion: true,
  },
  {
    id: "5",
    numero: 5,
    codigo: "[CODIGO_5]",
    mensaje: "Abre la A y la U. Este paso tiene miga: tómatelo con calma.",
    sobres: ["A", "U"],
    ficha: 5,
    construccion: true,
  },
  {
    id: "6",
    numero: 6,
    codigo: "[CODIGO_6]",
    mensaje: "Abre la L y la O del hilo rojo. Hoy te toca ser artista.",
    sobres: ["L", "O🧵"],
    ficha: 6,
    construccion: true,
  },
  {
    id: "7",
    numero: 7,
    codigo: "[CODIGO_7]",
    mensaje: "Último sobre: la V. Ya casi lo tienes.",
    sobres: ["V"],
    ficha: 7,
    construccion: true,
  },
  {
    id: "8",
    numero: 8,
    codigo: "[CODIGO_8]",
    mensaje: "Misión cumplida. ¿O no?",
    sobres: [],
  },
];

// ---------- FASE 2 (preparada, aún no se muestra) ----------
// Cuando toque, añade aquí los pasos y pon mostrarFase2 = true.
export const mostrarFase2 = false;
export const pasosFase2: Paso[] = [];

// ---------- FICHAS DEL CUADERNO DE OBRA ----------
// ilustracion: marcador o ruta de imagen para cada paso
export type Ficha = {
  id: number;
  titulo: string;
  sobres: string;
  necesitas: string;
  pasos: { texto: string; ilustracion?: string }[];
  notas: string[];
};

// Ilustraciones de las fichas (src/assets/fichas/fichaX_pasoY.webp.asset.json)
const ilustraciones = import.meta.glob<{ url: string }>("@/assets/fichas/*.asset.json", { eager: true, import: "default" });
const ilu = (f: number, p: number) =>
  Object.entries(ilustraciones).find(([k]) => k.endsWith(`/ficha${f}_paso${p}.webp.asset.json`))?.[1].url ??
  `[ILUSTRACION_FICHA_${f}_PASO_${p}]`;

export const fichas: Ficha[] = [
  {
    id: 2,
    titulo: "La cesta",
    sobres: "N y C",
    necesitas: "cesta, rollos finos, pistola y tijeras.",
    pasos: [
      { texto: "Pega con silicona el extremo de la cuerda en la base de la cesta.", ilustracion: ilu(2, 1) },
      { texto: "Ve enrollando hacia arriba, vueltas bien juntas, con un punto de silicona cada poco.", ilustracion: ilu(2, 2) },
      { texto: "Combina los dos rollos como quieras: franjas, mitad y mitad, un remate en el borde…", ilustracion: ilu(2, 3) },
      { texto: "Remata arriba con una vuelta doble y corta.", ilustracion: ilu(2, 4) },
    ],
    notas: [
      "🐥 Regla número uno de la pistola de silicona: se coge por el mango. La número dos la aprenderás solo si te saltas la primera.",
      "🐥 Guarda lo que sobre. En este taller, los restos tienen futuro.",
      "✨ Esto es una idea. El taller es tuyo: si se te ocurre algo mejor, adelante.",
    ],
  },
  {
    id: 3,
    titulo: "Escalera, adornos y saquitos",
    sobres: "O🐥 y E",
    necesitas: "la vallita de madera, los adornos de tela, el kit de saquitos, cuerda sobrante, pistola y tijeras.",
    pasos: [
      { texto: "La escalera: pon la vallita en vertical. Fórrala con cuerda o déjala al natural, y acórtala si la ves larga. Cuélgala de un lado de la cesta.", ilustracion: ilu(3, 1) },
      { texto: "Los adornos: rodea con ellos el borde de la cesta.", ilustracion: ilu(3, 2) },
      { texto: "Los saquitos: recorta cuadrados de tela de unos 10 cm, pon una cucharada de arroz en el centro, junta las puntas y ciérralo con una goma. Tapa la goma con un lazo de cuerda.", ilustracion: ilu(3, 3) },
      { texto: "Cuelga los saquitos de la cesta con un trocito de cuerda.", ilustracion: ilu(3, 4) },
    ],
    notas: ["🐥 Un grano de arroz en el suelo es un accidente. Cien son una paella. Controla la situación."],
  },
  {
    id: 4,
    titulo: "Los palos",
    sobres: "I",
    necesitas: "los 4 palos, cuerda sobrante, pistola y tijeras.",
    pasos: [
      { texto: "Forra cada palo con la cuerda, de punta a punta.", ilustracion: ilu(4, 1) },
      { texto: "Pega uno en cada esquina de la cesta, por dentro, bien rectos hacia arriba.", ilustracion: ilu(4, 2) },
      { texto: "Puedes cortarlos, pero sin pasarte: tienen que llegar alto, porque lo que van a sujetar es bastante más grande que la cesta.", ilustracion: ilu(4, 3) },
    ],
    notas: ["🐥 Sí, ya sé que te pica la curiosidad. Aguanta."],
  },
  {
    id: 5,
    titulo: "El globo",
    sobres: "A y U",
    necesitas: "globos, cola, pincel, las tiras de periódico y un cuenco.",
    pasos: [
      { texto: "Infla un globo hasta que sea unas dos o tres veces más ancho que la cesta, y átalo.", ilustracion: ilu(5, 1) },
      { texto: "Apóyalo sobre un cuenco o un vaso, con el nudo hacia abajo, para que no ruede.", ilustracion: ilu(5, 2) },
      { texto: "Mezcla mitad de cola y mitad de agua.", ilustracion: ilu(5, 3) },
      { texto: "Moja las tiras, quita el exceso y pégalas bien lisas, sin burbujas ni arrugas. Deja sin cubrir un círculo alrededor del nudo.", ilustracion: ilu(5, 4) },
      { texto: "Deja secar cada capa antes de poner la siguiente y cruza la dirección de las tiras. Pon tantas capas como necesites hasta que al tocarlo lo notes firme.", ilustracion: ilu(5, 5) },
    ],
    notas: [
      "Este es el paso más delicado, y por eso tienes varios globos: si uno se pincha, se arruga o no te convence, empieza con otro. Inténtalo las veces que haga falta.",
      "🐥 La paciencia también es una herramienta. Es la única que no venía en la caja.",
      "🐥 Hay varios globos por algo: el primero es de prueba, el segundo de práctica y el tercero, de campeonato.",
      "🆘 Y si se tuerce del todo, ya sabes: tira del hilo rojo.",
    ],
  },
  {
    id: 6,
    titulo: "El color",
    sobres: "L y O🧵",
    necesitas: "pinturas, pinceles y paleta.",
    pasos: [
      { texto: "Pincha el globo por el nudo, déjalo desinflar y sácalo con cuidado.", ilustracion: ilu(6, 1) },
      { texto: "Recorta el borde del agujero de abajo para que quede limpio.", ilustracion: ilu(6, 2) },
      { texto: "Da una primera mano de blanco para tapar el periódico.", ilustracion: ilu(6, 3) },
      { texto: "Y ahora, tu diseño: franjas, líneas, gajos, un color, cinco… lo que quieras.", ilustracion: ilu(6, 4) },
    ],
    notas: ["🐥 Aquí no hay instrucciones: sorpréndeme."],
  },
  {
    id: 7,
    titulo: "El montaje final",
    sobres: "V",
    necesitas: "cuerda gorda, pistola, tijeras y todo lo que has construido.",
    pasos: [
      { texto: "Coloca el globo encima de la cesta, con el agujero hacia abajo, y encájalo entre los 4 palos.", ilustracion: ilu(7, 1) },
      { texto: "Pega cada palo a la parte baja del globo, para que lo abracen y lo sujeten.", ilustracion: ilu(7, 2) },
      { texto: "Corta 4 tramos de cuerda gorda. Pega cada uno en la punta de un palo y súbelo por fuera del globo hasta arriba, siguiendo su curva, con puntos de silicona.", ilustracion: ilu(7, 3) },
      { texto: "Junta las 4 cuerdas en lo alto, átalas con un buen nudo y haz un lazo: de ahí lo colgarás.", ilustracion: ilu(7, 4) },
      { texto: "Con la cuerda que sobre, decora: por ejemplo, ondas alrededor de la parte de arriba del globo.", ilustracion: ilu(7, 5) },
    ],
    notas: [
      "🔍 ¿Te has atascado o no terminas de ver cómo hacerlo? Consulta a Patito: tiene referencias guardadas. Y sí, a estas alturas, se te permite. 😏",
      "🐥 Si algo queda torcido, dilo con seguridad: \"es estilo artesanal\". Yo te respaldo.",
      "Misión cumplida. ¿O no?",
    ],
  },
];

export const cuaderno = {
  titulo: "Cuaderno de obra",
  vacio: "Aún no hay fichas. Paciencia, que todo llega. 🐥",
  necesitas: "Necesitas",
  botonFoto: "📸 Enviar foto a Patito",
};

// ---------- TABLÓN (post-its y fotos) ----------
// unlockAtStep: id del paso a partir del cual aparece ("1", "vacaciones", "2"…)
// imagen: ruta/URL de la foto (si está vacía, se muestra el marcador)
export type ItemTablon = {
  id: string;
  tipo: "postit" | "foto";
  texto: string;
  imagen?: string;
  unlockAtStep: string;
};

export const tablon: ItemTablon[] = [
  { id: "p1", tipo: "postit", texto: "¿Qué le apetece hoy al pequeño Cachito? Empieza por ahí.", unlockAtStep: "1" },
  { id: "f1", tipo: "foto", texto: "Patito y Cachito", imagen: fotoRecuerdo.url, unlockAtStep: "1" },
];

export function itemsTablonEnPaso(step: number) {
  const unlocked = tablon.filter((t) => pasos.findIndex((p) => p.id === t.unlockAtStep) <= step);
  return [unlocked.find((t) => t.tipo === "postit"), unlocked.find((t) => t.tipo === "foto")].filter((t): t is ItemTablon => Boolean(t));
}

export type Recuerdo = { id: string; nombre: string; imagen: string; nota: string; reverso?: { prefijo: string; tachado: string }; };
export const cajonesRecuerdos: Recuerdo[][] = [
  [
    { id: "bingo", nombre: "Rotulador Bingo Canoe", imagen: bingo, nota: "Prueba de que la suerte existe. Te tengo a ti." },
    { id: "guatafac", nombre: "Carta GUATAFAC", imagen: guatafac, nota: "Partida pendiente. No creas que se me ha olvidado quién iba ganando.", reverso: { prefijo: "Patito 3 – Cachito", tachado: "2" } },
  ],
  [
    { id: "shakira", nombre: "Pulsera SHAKIRA", imagen: shakira, nota: "Últimamente nos gusta bailar bajo la lluvia." },
    { id: "ticket", nombre: "Ticket de Dunkin' Donuts", imagen: ticket, nota: "La tinta se borra con el tiempo. Lo nuestro, no." },
  ],
  [
    { id: "mapas", nombre: "Mapas de Alicante, Salamanca y Segovia", imagen: mapas, nota: "Por todas las aventuras que hemos vivido juntos… y las que están por llegar." },
    { id: "san-frutos", nombre: "Estampita de San Frutos", imagen: sanFrutos, nota: "Por todas las aventuras que hemos vivido juntos… y las que están por llegar." },
  ],
];
export const cuadroDecorativo = { imagen: laminaCapadocia.url, descripcion: "Acuarela de Capadocia" };

// ---------- SECRETOS ----------
export const secretos = {
  botes: ["[SECRETO_BOTE_1]", "[SECRETO_BOTE_2]", "[SECRETO_BOTE_3]"],
  flexo: "[SECRETO_FLEXO]",
  guirnalda: "[SECRETO_GUIRNALDA]",
  brioche: "[SECRETO_BRIOCHE]",
};

export const secretIds = [
  ...cajonesRecuerdos.map((_, i) => `cajon${i}`),
  ...secretos.botes.map((_, i) => `bote${i}`),
  "flexo", "guirnalda", "brioche",
];

// ---------- RADIO ----------
export const radio = {
  titulo: "Radio Miga FM",
  sinPlaylist: "Aquí sonará la playlist. Patito aún está eligiendo canciones. 🐥",
};

// ---------- MANUAL DEL TALLER (FAQ) ----------
export const manual = {
  titulo: "Manual del taller",
  subtitulo: "Preguntas frecuentes (y alguna impertinente)",
  preguntas: [
    { p: "¿Qué estoy construyendo?", r: "Si te lo dijera, esto sería un mueble de IKEA. Tú sigue: las piezas acaban hablando solas." },
    { p: "¿Puedo abrir un sobre solo para echar un vistazo?", r: "Poder, puedes. Pero ya sabes lo que le pasó al gato por curioso." },
    { p: "¿Por qué los sobres tienen letras y no números?", r: "Porque los números están muy vistos y yo soy más de letras. Guárdalas todas, que no están de adorno." },
    { p: "¿Puedo tirar el periódico?", r: "Ni se te ocurra. Ese papel tiene más futuro que muchos titulares… y puede que acabes necesitándolo." },
    { p: "¿Cómo consigo un código?", r: "Cada paso tiene su llave. A veces la encontrarás resolviendo un acertijo, otras superando una prueba y otras terminando tu obra y mandándome una foto. Sea como sea, todas acaban en el mismo sitio: el Cuacfesionario." },
    { p: "¿Y si me equivoco de código?", r: "No pasa nada. Puedes intentarlo las veces que quieras. Mi paciencia es infinita. Casi." },
    { p: "¿Tengo que seguir las instrucciones al pie de la letra?", r: "Son como una receta: te marcan el camino, pero el toque lo pones tú. Si improvisas, que sea con estilo." },
    { p: "¿Y si rompo algo?", r: "Respira. Hay repuestos justo donde suelen pasar los dramas. Y si el drama es gordo, tira del hilo rojo." },
    { p: "¿Puedo pedir ayuda a alguien más?", r: "Ni a Google, ni a tu familia, ni a una inteligencia artificial. Patito tiene celos profesionales, chs." },
    { p: "¿Cuánto dura todo esto?", r: "¿Ya con prisas? Empezamos bien." },
    { p: "¿Patito me está vigilando?", r: "¿Vigilarte yo? Qué cosas tienes. Por cierto, bonita camiseta la de hoy." },
    { p: "¿Hay premio al final?", r: "¡Uy, qué descarado! Y yo que pensaba que lo hacías por amor al arte. Tú a lo tuyo, que de eso ya me encargo yo." },
    { p: "¿Ya he cotilleado todo el taller?", r: "Nadie lo ha cotilleado todo nunca. Vuelve a mirar." },
  ],
};
