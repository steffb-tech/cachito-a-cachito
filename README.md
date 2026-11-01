# Cachito A Cachito

Crea una web llamada "Cachito a Cachito" (subtítulo: "Un taller con mucha miga"). Es un juego tipo escape room para un amigo, José ("Cachito"), que va montando una manualidad paso a paso con 12 sobres físicos que tiene en una caja. La web es su taller: le guía, le da los códigos para avanzar y esconde sorpresas. Todos los textos en español de España. El tono es cálido, con humor irónico e inteligente.
== REGLAS TÉCNICAS ==
- React + Tailwind. Una sola página. Sin backend, sin base de datos, sin login.
- MOBILE FIRST: se abrirá desde un QR en el móvil. Todo debe verse y usarse perfecto en un móvil vertical; en escritorio, centrado.
- El progreso se guarda en localStorage (paso actual, sobres abiertos, fichas desbloqueadas, secretos encontrados). Si recarga, sigue donde estaba y no vuelve a pedir la contraseña.
- TODOS los textos, códigos, pasos, fichas, FAQ, post-its, mensajes de error, número de WhatsApp y enlace de playlist van en UN ÚNICO archivo src/config/content.ts, bien comentado, para poder editarlos sin tocar componentes. Donde falte un dato, usa el marcador indicado entre corchetes.
- Los códigos se comparan sin distinguir mayúsculas, tildes ni espacios al principio o final.
- Reinicio secreto para pruebas: si se toca 5 veces seguidas (en menos de 3 segundos) el avatar de Patito, pide confirmación y borra el progreso, volviendo a la puerta.
- PROHIBIDO que aparezcan en ninguna parte visible ni en el título o metadatos de la página las palabras: globo aerostático, volar, vuelo, Capadocia. Título de la pestaña: "Cachito a Cachito".
== ESTILO VISUAL ==
Un rincón de taller artesanal DIY, acogedor y bonito, vista frontal ilustrada:
- Al fondo, un tablero perforado (pegboard) con formas onduladas orgánicas en verde salvia y madera clara, baldas de madera, botes de cristal, vasitos con lápices, rollos de cuerda en varillas, herramientas colgadas en ganchos (tijeras, pistola de silicona, alicates), plantas colgantes tipo potus y una guirnalda de lucecitas cálidas arriba.
- Delante, una mesa de madera clara con alfombrilla verde salvia, lámpara de flexo verde salvia, vela, una cajonera pequeña de madera, una pila de libros, una radio vintage y un cuaderno abierto.
- Paleta: verde salvia #A8B5A0 y #7F8F78, madera clara #D9BC94, crema #F5F0E6, kraft #C9A87C, texto #3E3A35, y rojo #C8102E solo para el hilo rojo.
- Tipografías: títulos y notas manuscritas con "Caveat"; textos con "Nunito".
- Detalles: papel kraft, cinta de carrocero, chinchetas, sombras suaves, microanimaciones delicadas (balanceo, brillo de lucecitas). Nada recargado.
== PERSONAJE: PATITO ==
Patito es la guía del juego (la que lo ve todo, como el "Súper" de Gran Hermano). Avatar ilustrado: un patito amarillo con melena morena y larga, sujetando un brioche (el brioche es Cachito). Usa una ilustración de marcador que luego sustituiré por mi imagen [AVATAR_PATITO]. Patito habla siempre en primera persona y firma con 🐥.
== PANTALLA 1: LA PUERTA ==
Puerta de madera del taller cerrada, con un cartelito colgado "Cachito a Cachito · Un taller con mucha miga". Patito asomada con un bocadillo:
"¡Alto ahí! Sin contraseña no se entra. La sabe un patito que se ha escondido en tu caja. Encuéntralo."
Campo de contraseña y botón "¡Manos a la miga!". Contraseña: FRIKI.
Si falla: el candado tiembla y sale un mensaje aleatorio de la lista de errores. Si acierta: la puerta se abre con una animación y entra al taller.
Mensajes de error (aleatorios, sin repetir el anterior):
- "Frío, frío, Cachito."
- "Eso no es. Pero valoro el esfuerzo."
- "Casi. Bueno, no. Ni casi."
- "¿Has probado a pensar? Dicen que funciona."
- "Patito no está impresionada."
- "Mi paciencia es infinita. Casi."
== PANTALLA 2: EL TALLER ==
La escena ilustrada descrita arriba. Elementos interactivos (todos con una pista visual sutil de que se pueden tocar):
1. CUACFESIONARIO (sobre la mesa): Patito con su bocadillo de diálogo. Es el centro del juego. Muestra el mensaje del paso actual y tiene un campo para escribir códigos con el botón "¡Manos a la miga!". Aciertos: animación de celebración y nuevo mensaje. Errores: mensajes de la lista de errores. Arriba, un pequeño rótulo "Cuacfesionario".
2. CUADERNO DE OBRA (cuaderno abierto en la mesa): al tocarlo se abre a pantalla completa como un cuaderno con pestañas. Solo muestra las fichas desbloqueadas, en orden. Cada ficha: título, sobres que usa, "Necesitas", pasos numerados con hueco para ilustración [ILUSTRACION_FICHA_X_PASO_Y], comentarios de Patito, y al final el botón "📸 Enviar foto a Patito".
3. BOTÓN "ENVIAR FOTO A PATITO": abre WhatsApp a 34669835821 con el texto: "📸 Paso {n} terminado, Patito. ¿Me das el visto bueno?". Usa https://wa.me/{numero}?text={texto codificado}.
4. HILO ROJO DE EMERGENCIA: un hilo rojo que cuelga de una balda, con una plaquita estilo freno de emergencia: "¿Cachito en apuros? Tire del hilo rojo". Al tirar (tocar o arrastrar hacia abajo), animación del hilo y se abre WhatsApp a 34669835821 con: "🧵 Han tirado del hilo rojo. Cachito en apuros en el paso {n}."
5. TABLÓN (el pegboard): post-its con mensajes y fotos con chinchetas o pinzas. Se definen en content.ts con un campo unlockAtStep, para que vayan apareciendo cosas nuevas según avanza (con un brillo la primera vez). Al tocar una foto o un post-it se amplía. Deja 6 post-its [POSTIT_1..6] y 6 fotos [FOTO_1..6] de marcador.
6. RADIO: al tocarla se enciende (luz y notas musicales animadas) y muestra un reproductor incrustado de la playlist [URL_PLAYLIST] (Spotify o YouTube).
7. MANUAL DEL TALLER: un libro de la pila. Al tocarlo se abre con las preguntas frecuentes (texto más abajo), en formato acordeón.
8. RINCONES PARA COTILLEAR (secretos, cada uno con su texto en content.ts [SECRETO_X]):
- Los cajones de la cajonera: cada uno se abre y esconde una nota o foto.
- Los botes de cristal de la balda: al tocarlos, sale un papelito.
- El flexo y la guirnalda: se encienden y apagan.
- El brioche que sujeta Patito: al tocarlo, Patito dice una frase cariñosa sobre Cachito [SECRETO_BRIOCHE].
- El cuadro enmarcado de la balda: muestra una lámina botánica; al completar el paso 8 cambia por [FOTO_FINAL].
- Un contador discreto "Secretos encontrados: x/y".
9. CARTEL "CERRADO POR VACACIONES": cuando el paso actual es el de vacaciones, cuelga un cartel de madera sobre la escena, pero el taller sigue siendo explorable y el Cuacfesionario acepta códigos.
== LÓGICA DE PASOS (en content.ts) ==
Cada paso tiene: id, código que lo desbloquea, mensaje de Patito, sobres a abrir, ficha que desbloquea y si es de construcción (muestra el botón de foto).
Paso 1 · se desbloquea con la contraseña de la puerta.
Patito: "¡Por fin! Bienvenido a Cachito a Cachito, un taller con mucha miga. Primera misión: en tu caja hay dos sobres esperándote, la G y la M. Encuéntralos y ábrelos. Tranquilo, no muerden… pero no te acostumbres: el resto no será tan fácil."
Botón: "¡Abiertos!" → pasa al paso de vacaciones.
Paso vacaciones · Patito: "¡Buen comienzo! Guarda bien lo que has encontrado. El taller cierra por vacaciones: disfruta del viaje y nos vemos a la vuelta de Portugal."
Paso 2 · código MENINAS · sobres N y C · ficha 2 · construcción.
Patito: "¡MENINAS! Velázquez estaría orgulloso, las gemelas no tanto. Ahora busca los sobres de la N y la C: se acabaron las vacaciones. Tienes las instrucciones en el cuaderno de obra. Cuando termines, mándame una foto."
Paso 3 · código [CODIGO_3] · sobres O (la del patito 🐥) y E · ficha 3 · construcción.
Patito: "¡Visto bueno de Patito! Ahora toca la O del patito y la E. Al cuaderno, que hay trabajo."
Paso 4 · código [CODIGO_4] · sobre I · ficha 4 · construcción.
Patito: "Muy bien. Un solo sobre esta vez: la I."
Paso 5 · código [CODIGO_5] · sobres A y U · ficha 5 · construcción.
Patito: "Abre la A y la U. Este paso tiene miga: tómatelo con calma."
Paso 6 · código [CODIGO_6] · sobres L y O (la del hilo rojo 🧵) · ficha 6 · construcción.
Patito: "Abre la L y la O del hilo rojo. Hoy te toca ser artista."
Paso 7 · código [CODIGO_7] · sobre V · ficha 7 · construcción.
Patito: "Último sobre: la V. Ya casi lo tienes."
Paso 8 · código [CODIGO_8] · final de esta fase.
Patito: "Misión cumplida. ¿O no?"
Deja preparada en el código una sección vacía "Fase 2" que se añadirá más adelante. No la muestres todavía.
Muestra en la escena, de forma discreta, las letras de los sobres ya abiertos como etiquetas colgadas de un cordel, en el orden en que los abrió.
== FICHAS DEL CUADERNO DE OBRA ==
FICHA 2 · La cesta (sobres N y C)
Necesitas: cesta, rollos finos, pistola y tijeras.
1. Pega con silicona el extremo de la cuerda en la base de la cesta.
2. Ve enrollando hacia arriba, vueltas bien juntas, con un punto de silicona cada poco.
3. Combina los dos rollos como quieras: franjas, mitad y mitad, un remate en el borde…
4. Remata arriba con una vuelta doble y corta.
🐥 Regla número uno de la pistola de silicona: se coge por el mango. La número dos la aprenderás solo si te saltas la primera.
🐥 Guarda lo que sobre. En este taller, los restos tienen futuro.
✨ Esto es una idea. El taller es tuyo: si se te ocurre algo mejor, adelante.
FICHA 3 · Escalera, adornos y saquitos (sobres O🐥 y E)
Necesitas: la vallita de madera, los adornos de tela, el kit de saquitos, cuerda sobrante, pistola y tijeras.
1. La escalera: pon la vallita en vertical. Fórrala con cuerda o déjala al natural, y acórtala si la ves larga. Cuélgala de un lado de la cesta.
2. Los adornos: rodea con ellos el borde de la cesta.
3. Los saquitos: recorta cuadrados de tela de unos 10 cm, pon una cucharada de arroz en el centro, junta las puntas y ciérralo con una goma. Tapa la goma con un lazo de cuerda.
4. Cuelga los saquitos de la cesta con un trocito de cuerda.
🐥 Un grano de arroz en el suelo es un accidente. Cien son una paella. Controla la situación.
FICHA 4 · Los palos (sobre I)
Necesitas: los 4 palos, cuerda sobrante, pistola y tijeras.
1. Forra cada palo con la cuerda, de punta a punta.
2. Pega uno en cada esquina de la cesta, por dentro, bien rectos hacia arriba.
3. Puedes cortarlos, pero sin pasarte: tienen que llegar alto, porque lo que van a sujetar es bastante más grande que la cesta.
🐥 Sí, ya sé que te pica la curiosidad. Aguanta.
FICHA 5 · El globo (sobres A y U)
Necesitas: globos, cola, pincel, las tiras de periódico y un cuenco.
1. Infla un globo hasta que sea unas dos o tres veces más ancho que la cesta, y átalo.
2. Apóyalo sobre un cuenco o un vaso, con el nudo hacia abajo, para que no ruede.
3. Mezcla mitad de cola y mitad de agua.
4. Moja las tiras, quita el exceso y pégalas bien lisas, sin burbujas ni arrugas. Deja sin cubrir un círculo alrededor del nudo.
5. Deja secar cada capa antes de poner la siguiente y cruza la dirección de las tiras. Pon tantas capas como necesites hasta que al tocarlo lo notes firme.
Este es el paso más delicado, y por eso tienes varios globos: si uno se pincha, se arruga o no te convence, empieza con otro. Inténtalo las veces que haga falta.
🐥 La paciencia también es una herramienta. Es la única que no venía en la caja.
🐥 Hay varios globos por algo: el primero es de prueba, el segundo de práctica y el tercero, de campeonato.
🆘 Y si se tuerce del todo, ya sabes: tira del hilo rojo.
FICHA 6 · El color (sobres L y O🧵)
Necesitas: pinturas, pinceles y paleta.
1. Pincha el globo por el nudo, déjalo desinflar y sácalo con cuidado.
2. Recorta el borde del agujero de abajo para que quede limpio.
3. Da una primera mano de blanco para tapar el periódico.
4. Y ahora, tu diseño: franjas, líneas, gajos, un color, cinco… lo que quieras.
🐥 Aquí no hay instrucciones: sorpréndeme.
FICHA 7 · El montaje final (sobre V)
Necesitas: cuerda gorda, pistola, tijeras y todo lo que has construido.
1. Coloca el globo encima de la cesta, con el agujero hacia abajo, y encájalo entre los 4 palos.
2. Pega cada palo a la parte baja del globo, para que lo abracen y lo sujeten.
3. Corta 4 tramos de cuerda gorda. Pega cada uno en la punta de un palo y súbelo por fuera del globo hasta arriba, siguiendo su curva, con puntos de silicona.
4. Junta las 4 cuerdas en lo alto, átalas con un buen nudo y haz un lazo: de ahí lo colgarás.
5. Con la cuerda que sobre, decora: por ejemplo, ondas alrededor de la parte de arriba del globo.
🔍 ¿Te has atascado o no terminas de ver cómo hacerlo? Consulta a Patito: tiene referencias guardadas. Y sí, a estas alturas, se te permite. 😏
🐥 Si algo queda torcido, dilo con seguridad: "es estilo artesanal". Yo te respaldo.
Misión cumplida. ¿O no?
== MANUAL DEL TALLER (FAQ) ==
Título: "Manual del taller" · subtítulo: "Preguntas frecuentes (y alguna impertinente)"
¿Qué estoy construyendo? — Si te lo dijera, esto sería un mueble de IKEA. Tú sigue: las piezas acaban hablando solas.
¿Puedo abrir un sobre solo para echar un vistazo? — Poder, puedes. Pero ya sabes lo que le pasó al gato por curioso.
¿Por qué los sobres tienen letras y no números? — Porque los números están muy vistos y yo soy más de letras. Guárdalas todas, que no están de adorno.
¿Puedo tirar el periódico? — Ni se te ocurra. Ese papel tiene más futuro que muchos titulares… y puede que acabes necesitándolo.
¿Cómo consigo un código? — Cada paso tiene su llave. A veces la encontrarás resolviendo un acertijo, otras superando una prueba y otras terminando tu obra y mandándome una foto. Sea como sea, todas acaban en el mismo sitio: el Cuacfesionario.
¿Y si me equivoco de código? — No pasa nada. Puedes intentarlo las veces que quieras. Mi paciencia es infinita. Casi.
¿Tengo que seguir las instrucciones al pie de la letra? — Son como una receta: te marcan el camino, pero el toque lo pones tú. Si improvisas, que sea con estilo.
¿Y si rompo algo? — Respira. Hay repuestos justo donde suelen pasar los dramas. Y si el drama es gordo, tira del hilo rojo.
¿Puedo pedir ayuda a alguien más? — Ni a Google, ni a tu familia, ni a una inteligencia artificial. Patito tiene celos profesionales, chs.
¿Cuánto dura todo esto? — ¿Ya con prisas? Empezamos bien.
¿Patito me está vigilando? — ¿Vigilarte yo? Qué cosas tienes. Por cierto, bonita camiseta la de hoy.
¿Hay premio al final? — ¡Uy, qué descarado! Y yo que pensaba que lo hacías por amor al arte. Tú a lo tuyo, que de eso ya me encargo yo.
¿Ya he cotilleado todo el taller? — Nadie lo ha cotilleado todo nunca. Vuelve a mirar.
Cuando termines, explícame brevemente cómo editar content.ts para cambiar códigos, textos y marcadores.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cachito-a-cachito.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a16bb2c8-901b-4a8e-815e-5ddb61a5d509).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
