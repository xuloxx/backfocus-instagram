// Contenido de las piezas. Los textos se pueden editar aquí o directamente en el estudio
// (los cambios hechos en el estudio se guardan en el navegador y tienen prioridad).

window.ZINE = {
  numero: "#01",
  nombre: "BackFocus",
  bajada: "Fanzine de fotografía",
  fecha: "agosto 2026",
  web: "backfocus.cl",
  webUrl: "https://backfocus.cl/",
  editorial: { titulo: "Esa sospechosa nueva forma de mirar", autor: "Freddy Briones Parra", url: "https://backfocus.cl/esa-sospechosa-nueva-forma-de-mirar/" },
  precio: "$0.000",
  dondeComprar: "Puntos de venta por confirmar · Pídelo por mensaje directo",
  descripcion:
    "Un fanzine dedicado a reflexionar sobre el vínculo entre fotografía, imagen y nuevas tecnologías. Ideas complejas en un lenguaje simple, directo y accesible.",
  invitados: ["Leonora Vicuña", "Loreto Vergara", "Marcela Toledo", "Camilo Durán"],
  equipo: [
    { nombre: "Christian Carl", rol: "Comunicador audiovisual y fotógrafo" },
    { nombre: "Domingo Fernández K.", rol: "Fotógrafo y gestor cultural" },
    { nombre: "Freddy Briones Parra", rol: "Diseñador editorial y fotógrafo" },
  ],
};

// Un elemento por texto del número. "foto" es el nombre del archivo en /fotos (sin .jpg).
window.TEXTOS = [
  {
    id: "resistir",
    categoria: "Ensayo",
    titulo: "Resistir es volver el cuerpo",
    bajada: "La protesta como acto performático",
    autor: "Marcela Toledo",
    pagina: 4,
    foto: "resistir-marcela-toledo",
    cita: "No conozco belleza más pura que esa libertad en movimiento.",
    url: "https://backfocus.cl/resistir-es-volver-el-cuerpo/",
  },
  {
    id: "error",
    categoria: "Artículo",
    titulo: "Un error en la matrix",
    bajada: "Una reflexión acerca de lo real y lo accidental en fotografía",
    autor: "Freddy Briones Parra",
    pagina: 6,
    foto: "error-matrix-lartigue",
    cita: "El error pasó de ser un obstáculo a convertirse en una herramienta para la experimentación creativa.",
    url: "https://backfocus.cl/un-error-en-la-matrix/",
  },
  {
    id: "esto-ha-sido",
    categoria: "Ensayo",
    titulo: "Esto ha sido",
    bajada: "Notas sobre fotografía y memoria",
    autor: "Camilo Durán",
    pagina: 10,
    foto: "esto-ha-sido-camilo-duran",
    cita: "Quizá las fotografías sí roban el alma. Solo que nunca fue la del retratado, sino la del fotógrafo.",
    url: "https://backfocus.cl/esto-ha-sido/",
  },
  {
    id: "leonora",
    categoria: "Entrevista",
    titulo: "Proceso análogo e hipertecnología",
    bajada: "Entrevista a Leonora Vicuña",
    autor: "Domingo Fernández K.",
    pagina: 12,
    foto: "leonora-vicuna",
    cita: "Como fotógrafa: amar los errores, propios y ajenos, porque son buen alimento.",
    citaAutor: "Leonora Vicuña",
    url: "https://backfocus.cl/proceso-analogo-e-hipertecnologia/",
  },
  {
    id: "sandy",
    categoria: "Ensayo",
    titulo: "Sandy, la Marilyn del Puerto",
    bajada: "Una memoria personal en diálogo con la historia social del puerto",
    autor: "Loreto Vergara",
    pagina: 18,
    foto: "sandy-loreto-vergara",
    cita: "Una memoria personal en diálogo con la historia social del puerto y sus dinámicas nocturnas.",
    url: "https://backfocus.cl/sandy-la-marilyn-del-puerto/",
  },
  {
    id: "qawaq",
    categoria: "Artículo",
    titulo: "QAWAQ",
    bajada: "Interpretación algorítmica de imágenes",
    autor: "Domingo Fernández K.",
    pagina: 22,
    foto: "qawaq",
    cita: "Una selección de imágenes puede funcionar como una forma de autorretrato indirecto.",
    url: "https://backfocus.cl/qawaq-interpretacion-algoritmica-de-imagenes/",
  },
  {
    id: "sospecha",
    categoria: "Artículo",
    titulo: "La sospecha permanente",
    bajada: "Muy perfecto para ser real",
    autor: "Christian Carl",
    pagina: 26,
    foto: "sospecha-permanente",
    cita: "Tal vez la pregunta ya no sea si una imagen fue creada por una inteligencia artificial, sino por qué una fotografía real comenzó a parecernos artificial.",
    url: "https://backfocus.cl/la-sospecha-permanente/",
  },
  {
    id: "purismo",
    categoria: "Artículo",
    titulo: "Acerca del purismo en fotografía",
    bajada: "El desacuerdo permanente entre defensores y detractores",
    autor: "Freddy Briones Parra",
    pagina: 30,
    foto: "purismo-muhammad-ali",
    cita: "No tendría por qué molestarnos la libertad del otro, después de todo, somos libres de hacer lo que queramos con nuestras fotografías.",
    url: "https://backfocus.cl/acerca-del-purismo-en-fotografia/",
  },
];

window.HASHTAGS =
  "#BackFocusZine #fanzine #zine #fotografía #fotografíachilena #fotografíacontemporánea #fotografíaanáloga #culturavisual #inteligenciaartificial #fotolibro #zinechile #publicacionesindependientes";

// ---------- Slides 2 y 3 de cada post (foto + texto destacado) ----------
// foto: archivo en /fotos (sin .jpg) · texto: destacado · pie: pie de foto (opcional)
// pos: encuadre inicial de la foto { x, y (0–100 %), z (zoom) } · t: tamaño del texto (1 = normal)
// objeto: true muestra la foto entera como objeto con sombra (para páginas del zine)
window.SLIDES = {
  // Posts de cada texto
  "texto-resistir": [
    { foto: "resistir-marcela-toledo-2", texto: "Para mí, la manifestación callejera es un acto de libertad pura; una develación de emociones, un instante profundo en cada gesto." },
    { foto: "resistir-marcela-toledo-3", texto: "Existe un hilo invisible entre el fotógrafo y el fotografiado, un mismo pulso que se encuentra en la trinchera de lo performático.", pos: { x: 50, y: 30, z: 1 } },
  ],
  "texto-error": [
    { foto: "error-matrix-lartigue", texto: "Una imagen imperfecta puede comunicar con mayor intensidad otros aspectos más implícitos que una fotografía técnicamente impecable, como la experiencia del tiempo, la memoria…", pie: "Jacques-Henri Lartigue. Grand Prix del Automobile Club de Francia, 1912.", pos: { x: 72, y: 40, z: 1.7 } },
    { foto: "error-matrix-retrato-doble", texto: "Estamos siendo simulados, y nos guste o no, lo queramos o no, lo veamos o no, la marea seguirá subiendo sin parar.", pie: "Retrato doble de un aficionado anónimo de un álbum de principios del siglo XX.", pos: { x: 50, y: 35, z: 1 } },
  ],
  "texto-esto-ha-sido": [
    { foto: "esto-ha-sido-camilo-duran-2", texto: "Cuando el obturador se cierra, esa versión de la persona deja de existir." },
    { foto: "esto-ha-sido-camilo-duran-3", texto: "Empiezo a dudar de si la memoria termina pareciéndose a las imágenes que conservamos, o si son las imágenes las que terminan reemplazando a la memoria." },
  ],
  "texto-leonora": [
    { foto: "leonora-vicuna-2", autor: "Leonora Vicuña", texto: "Vivimos agitados, queremos tener el resultado antes siquiera de haber tomado la foto. Era un placer ese tiempo no tanto de espera, sino de incertidumbre.", pie: "Fotografía por Domingo Fernández K.", pos: { x: 50, y: 40, z: 1 } },
    { foto: "leonora-vicuna-3", autor: "Leonora Vicuña", texto: "Si la foto ya no es humana, se acabó la cosa.", pos: { x: 50, y: 40, z: 1 } },
  ],
  "texto-sandy": [
    { foto: "sandy-loreto-vergara-3", texto: "Reconstruye la memoria de una trabajadora sexual del puerto de San Antonio a partir del cuerpo entendido como archivo de experiencia y tiempo." },
    { foto: "sandy-loreto-vergara-4", texto: "Una mirada sensible que recupera memorias íntimas y experiencias históricamente relegadas al margen de los relatos oficiales.", pos: { x: 50, y: 35, z: 1 } },
  ],
  "texto-qawaq": [
    { foto: "qawaq-2", texto: "¿Qué aspectos de nuestra forma de mirar aparecen cuando escogemos imágenes de manera intuitiva? ¿Tenemos un punto ciego frente a nuestra propia mirada?" },
    { foto: "qawaq-3", texto: "La inteligencia artificial no reemplaza la interpretación humana. Su función es actuar como mediadora.", pie: "QAWAQ, proyecto en fase experimental.", pos: { x: 50, y: 42, z: 1 } },
  ],
  "texto-sospecha": [
    { foto: "sospecha-ia-pareja", texto: "La IA no inventó un lenguaje visual, aprendió el lenguaje que la fotografía construyó durante casi dos siglos.", pie: "Imagen generada de una pareja de recién casados simulando un Sigma 85mm F1.4 Art para Sony.", pos: { x: 50, y: 25, z: 1 } },
    { foto: "sospecha-ia-gaviota", texto: "No desconfiamos porque descubrimos una mentira. Desconfiamos porque reconocemos una estética.", pie: "Imagen generada con IA simulando un Sigma 85mm F1.4 Art para Sony." },
  ],
  "texto-purismo": [
    { foto: "purismo-le-gray", texto: "La primera fusión de negativos para obtener una gama dinámica total (el primer HDR) se realizó hace 177 años.", pie: "Gustave Le Gray, 1849: el primer fotógrafo en mezclar dos negativos para obtener una gama de luminosidad completa." },
    { foto: "purismo-lincoln-calhoun", texto: "Conceptos de uso más contemporáneo como el deepfake existían ya desde los inicios de la disciplina.", pie: "Cuadro de John Calhoun (1852) junto al grabado de 1865 con la cabeza de Abraham Lincoln." },
  ],

  // Posts de citas
  "cita-sospecha": [
    { foto: "sospecha-sigma-real", texto: "Una fotografía ópticamente perfecta puede parecernos falsa, mientras que una ficción elaboradamente construida puede parecernos auténtica gracias a las marcas físicas de su proceso.", pie: "Fotografía hecha con un Sigma 85mm F1.4 Art para Sony." },
    { foto: "sospecha-permanente", texto: "La imagen puede seguir siendo la misma; quien cambió fue el espectador.", pie: "Fotografía de banco de fotos de Envato.", pos: { x: 50, y: 30, z: 1 } },
  ],
  "cita-leonora": [
    { foto: "leonora-vicuna", autor: "Leonora Vicuña", texto: "Creo que lo que le faltaba a mi imagen era luz. El color es luz.", pie: "Fotografía por Domingo Fernández K.", pos: { x: 52, y: 50, z: 1.5 } },
    { foto: "leonora-vicuna-2", autor: "Leonora Vicuña", texto: "Lo que me sigue embriagando siempre en la fotografía es la luz, la belleza de la luz, aunque el tema pueda ser muy descarnado…", pie: "Fotografía por Domingo Fernández K.", pos: { x: 50, y: 60, z: 1 } },
  ],
  "cita-esto-ha-sido": [
    { foto: "esto-ha-sido-camilo-duran-4", texto: "¿Quién deja de existir cada vez que tomo una fotografía? Un poco el modelo, pero también el fotógrafo." },
    { foto: "esto-ha-sido-camilo-duran-5", texto: "Hay días en que abro mis archivadores de negativos y siento que conozco mejor a esas personas en sus fotografías que en mis propios recuerdos.", pos: { x: 50, y: 35, z: 1 } },
  ],
  "cita-error": [
    { foto: "error-matrix-lartigue", texto: "¿Quién decide o bajo qué parámetros se cataloga una foto como errónea?", pie: "Jacques-Henri Lartigue. Grand Prix del Automobile Club de Francia, 1912.", pos: { x: 35, y: 55, z: 1.6 } },
    { foto: "error-matrix-retrato-doble", texto: "Tal vez sea un buen momento para volver a pensar y comenzar a repensarnos, ya que incluso el dominio del error lo estamos perdiendo.", pie: "Retrato doble de un aficionado anónimo de un álbum de principios del siglo XX.", pos: { x: 50, y: 60, z: 1 } },
  ],

  // Posts generales
  lanzamiento: [
    { foto: "gaviota-portada", texto: "Un fanzine dedicado a reflexionar sobre el vínculo entre fotografía, imagen y nuevas tecnologías.", autor: "BackFocus", obra: "Fanzine de fotografía", pie: "Fotografía de portada por Christian Carl.", pos: { x: 50, y: 45, z: 1 } },
    { foto: "editorial", texto: "Reunir distintas miradas desde la zona gris nos da la perspectiva de observar en múltiples direcciones.", autor: "Freddy Briones Parra", obra: "Editorial", pie: "Fotografía por Domingo Fernández K.", pos: { x: 50, y: 40, z: 1 } },
  ],
  invitados: [
    { foto: "resistir-marcela-toledo-2", texto: "No conozco belleza más pura que esa libertad en movimiento.", autor: "Marcela Toledo", obra: "Resistir es volver el cuerpo" },
    { foto: "sandy-loreto-vergara", texto: "Una memoria personal en diálogo con la historia social del puerto y sus dinámicas nocturnas.", autor: "Loreto Vergara", obra: "Sandy, la Marilyn del Puerto" },
  ],
  comprar: [
    { foto: "contraportada-zine", texto: "36 páginas sobre fotografía, imagen y nuevas tecnologías: ensayos, artículos y una entrevista.", autor: "BackFocus #01", obra: "agosto 2026", pie: "Contraportada de BackFocus #01.", objeto: true },
    { foto: "pagina-editorial", texto: "Edición independiente, hecha entre Pucón y Santiago de Chile.", autor: "BackFocus #01", obra: "Editorial", objeto: true },
  ],
};
