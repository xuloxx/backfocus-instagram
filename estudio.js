(() => {
  const iniciar = () => {
  const Z = window.ZINE;
  const T = window.TEXTOS;
  const HASHTAGS = window.HASHTAGS;
  const FOTOS = window.FOTOS || {};
  const texto = (id) => T.find((t) => t.id === id);

  // ---------- Ayudantes de plantilla ----------
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Texto editable
  const E = (campo, txt, cls = "", attrs = "") =>
    `<div class="${cls}" data-edit="${campo}" contenteditable="true" spellcheck="false" ${attrs}>${esc(txt)}</div>`;
  // Foto reemplazable (arrastrar para encuadrar)
  const F = (campo, foto, estilo, cls = "", velo = "", pos) =>
    `<div class="foto ${cls}" data-foto="${campo}" data-src="${foto}" style="${estilo}"${pos ? ` data-pos='${JSON.stringify(pos)}'` : ""}>` +
    (velo ? `<div class="velo ${velo}"></div>` : "") +
    `<button class="ui ui-foto" type="button">Cambiar foto</button></div>`;
  // Guía visible solo en el estudio (no se exporta)
  const G = (estilo, txt) => `<div class="ui guia" style="${estilo}">${txt}</div>`;
  const marcaArriba = (sub = Z.bajada) => `
    <div class="abs" style="top:60px;left:72px">${E("marca", Z.nombre, "marca")}${E("sub", sub, "marca-sub")}</div>
    <div class="abs numero" style="top:70px;right:72px">${E("num", Z.numero)}</div>`;
  const pie = (izq, der) => `<div class="pie">${izq}${der}</div>`;
  const marcaPie = `<span class="slab">${Z.nombre}</span>`;
  // Firma del texto destacado: «— Autor, Obra»
  const fuente = (s, d) => `— ${s.autor || d?.autor || Z.nombre}, ${s.obra || d?.titulo || Z.bajada}`;
  // Tamaño del destacado según su largo
  const tamañoDestacado = (txt) => (txt.length > 150 ? 0.72 : txt.length > 110 ? 0.8 : txt.length > 70 ? 0.9 : txt.length > 45 ? 1.05 : 1.25);

  // ---------- Plantillas ----------
  const P = {
    lanzamiento: () => ({
      html: `
        <div class="abs" style="top:72px;left:72px">${E("etq", "Ya disponible", "etiqueta")}</div>
        <div class="abs slab" style="top:74px;right:72px;font-weight:900;font-size:44px;line-height:1">${E("num", `${Z.numero} · ${Z.fecha}`)}</div>
        ${F("portada", "portada-zine", "top:170px;left:230px;width:620px;height:807px", "objeto")}
        <div class="abs" style="left:72px;right:72px;top:1040px;text-align:center">
          ${E("titulo", Z.bajada, "titulo")}
          ${E("bajada", "Fotografía, imagen y nuevas tecnologías", "bajada", 'style="margin-top:14px"')}
        </div>
        ${pie(marcaPie, E("desliza", "Desliza →"))}`,
    }),

    invitados: () => ({
      clase: "sobre-foto",
      html: `
        <div class="abs" style="inset:0;background:var(--claro)"></div>
        ${F("foto", "mujeres-ventana-contraportada", "top:290px;left:0;width:1080px;height:1060px", "", "abajo")}
        <div style="color:var(--negro)">${marcaArriba()}</div>
        <div class="abs" style="left:72px;bottom:150px">
          ${E("tit", "Invitados:", "caja-titulo")}
          ${Z.invitados.map((n, i) => E("inv" + i, n, "caja")).join("")}
        </div>
        ${pie(E("fecha", Z.fecha), E("desliza", "Desliza →"))}`,
    }),

    articulo: (d) => ({
      html: `
        ${F("foto", d.foto, "top:0;left:0;width:1080px;height:780px")}
        <div class="abs" style="top:742px;left:72px">${E("etq", d.categoria, "etiqueta")}</div>
        <div class="abs" style="left:72px;right:72px;top:830px">
          ${E("titulo", d.titulo, "titulo")}
          ${E("bajada", d.bajada, "bajada", 'style="margin-top:16px"')}
          ${E("autor", "Por " + d.autor, "autor", 'style="margin-top:18px"')}
        </div>
        ${pie(E("pag", `${Z.nombre} ${Z.numero} · pág. ${d.pagina}`), E("desliza", "Desliza →"))}`,
    }),

    cita: (d) => ({
      clase: "oscura",
      html: `
        <div class="abs" style="top:72px;left:72px">${E("etq", d.categoria, "etiqueta clara")}</div>
        <div class="abs" style="left:72px;right:72px;top:200px;bottom:330px;display:flex;align-items:center">${E("cita", d.cita, "cita")}</div>
        <div class="abs" style="left:72px;right:72px;bottom:150px">
          ${E("autor", "— " + (d.citaAutor || d.autor), "autor")}
          ${E("obra", `${d.titulo}, ${Z.nombre} ${Z.numero}`, "bajada", 'style="margin-top:6px"')}
        </div>
        ${pie(marcaPie, E("desliza", "Desliza →"))}`,
    }),

    comprar: () => ({
      html: `
        ${marcaArriba(`${Z.bajada} · ${Z.fecha}`)}
        ${F("portada", "portada-zine", "top:330px;left:72px;width:430px;height:560px", "objeto")}
        <div class="abs" style="top:340px;left:560px;right:72px">
          ${E("etq", "Consigue tu ejemplar", "etiqueta")}
          ${E("precio", Z.precio, "precio", 'style="margin-top:40px"')}
          ${E("donde", Z.dondeComprar, "texto", 'style="margin-top:30px"')}
        </div>
        <div class="abs" style="left:72px;right:72px;top:970px">${E("leer", "Y lee los textos en " + Z.web, "texto-slab")}</div>
        ${pie(marcaPie, E("desliza", "Desliza →"))}`,
    }),

    // ----- Slides 2 y 3 de los posts: foto + texto destacado -----
    // s: { foto, texto, autor, obra, pie, pos } · d: texto del número al que pertenece (o null)
    slideFotoArriba: (s, d) => ({
      html: `
        ${s.objeto ? F("foto", s.foto, "top:70px;left:294px;width:492px;height:640px", "objeto") : F("foto", s.foto, "top:0;left:0;width:1080px;height:760px", "", "", s.pos)}
        ${s.pie ? `<div class="abs" style="left:72px;right:72px;top:782px">${E("pie-foto", s.pie, "pie-foto")}</div>` : ""}
        <div class="abs bloque-destacado" style="left:72px;right:72px;top:${s.pie ? 840 : 790}px;bottom:150px">
          ${E("cita", s.texto, "cita")}
          ${E("autor", fuente(s, d), "autor", 'style="margin-top:22px"')}
        </div>
        ${pie(marcaPie, '<span class="contador">2/3</span>')}`,
    }),
    slideFotoAbajo: (s, d) => ({
      clase: "oscura",
      html: `
        <div class="abs bloque-destacado" style="left:72px;right:72px;top:40px;height:550px">
          ${E("cita", s.texto, "cita")}
          ${E("autor", fuente(s, d), "autor", 'style="margin-top:22px"')}
        </div>
        ${s.objeto ? F("foto", s.foto, "top:600px;left:324px;width:432px;height:562px", "objeto") : F("foto", s.foto, "top:590px;left:0;width:1080px;height:760px", "", "abajo", s.pos)}
        ${s.pie && !s.objeto ? `<div class="abs sobre-foto" style="left:72px;right:72px;bottom:118px">${E("pie-foto", s.pie, "pie-foto")}</div>` : ""}
        <div class="pie sobre-foto">${E("web", "Lee en " + Z.web)}<span class="contador">3/3</span></div>`,
    }),

    // ----- Carrusel -----
    c1: () => ({
      html: `
        ${marcaArriba()}
        ${F("foto", "gaviota-portada", "top:290px;left:0;width:1080px;height:1060px")}
        <div class="abs" style="left:72px;bottom:160px">
          ${E("tit", "Conoce el número 01", "caja", 'style="font-weight:700;font-size:56px"')}
          ${E("sub2", "Fotografía, imagen y nuevas tecnologías", "caja")}
        </div>
        ${pie(E("fecha", Z.fecha), E("desliza", "Desliza →"))}`,
    }),
    c2: () => ({
      html: `
        <div class="abs" style="top:72px;left:72px">${E("etq", "¿Qué es BackFocus?", "etiqueta")}</div>
        <div class="abs" style="left:72px;right:72px;top:200px">
          ${E("desc", Z.descripcion, "texto-slab")}
          ${E("desc2", "En un contexto donde la inmediatez y el exceso de información y desinformación lo inundan todo, creemos necesario detenernos a pensar en los grandes cambios que están sucediendo.", "texto", 'style="margin-top:50px;color:#454545"')}
        </div>
        ${pie(marcaPie, '<span class="contador">2/7</span>')}`,
    }),
    c3: () => ({
      clase: "oscura",
      html: `
        ${F("foto", "editorial", "top:0;left:0;width:1080px;height:560px")}
        <div class="abs" style="top:600px;left:72px">${E("etq", "Editorial", "etiqueta clara")}</div>
        <div class="abs" style="left:72px;right:72px;top:700px">
          ${E("cita", "Podemos ver las cosas como blanco o negro si lo queremos, sin embargo, reunir distintas miradas desde la zona gris nos da la perspectiva de observar en múltiples direcciones.", "cita")}
          ${E("autor", "— Freddy Briones Parra", "autor", 'style="margin-top:24px"')}
        </div>
        ${pie(marcaPie, '<span class="contador">3/7</span>')}`,
    }),
    c4: () => ({
      html: `
        <div class="abs" style="inset:0;background:var(--blanco)"></div>
        <div class="abs" style="top:64px;left:72px;right:72px;display:flex;justify-content:space-between;align-items:baseline">
          ${E("tit", "Contenidos", "titulo-grande")}<span class="numero" style="font-size:60px">${Z.numero}</span>
        </div>
        <ul class="indice abs" style="left:72px;right:72px;top:230px">
          ${T.map((d, i) => `<li><span class="pag">${d.pagina}</span><div>${E("n" + i, d.titulo, "nom")}${E("p" + i, `${d.categoria} · ${d.autor}`, "por")}</div></li>`).join("")}
        </ul>
        ${pie(marcaPie, '<span class="contador">4/7</span>')}`,
    }),
    c5: () => ({
      clase: "oscura",
      html: `
        <div class="abs" style="top:72px;left:72px">${E("etq", "Invitados", "etiqueta clara")}</div>
        <div class="personas abs" style="left:72px;right:72px;top:190px">
          ${[["leonora", "Leonora Vicuña"], ["sandy", "Loreto Vergara"], ["resistir", "Marcela Toledo"], ["esto-ha-sido", "Camilo Durán"]]
            .map(([id, n], i) => {
              const d = texto(id);
              return `<div class="persona">${E("nom" + i, n, "nombre")}${E("rol" + i, `${d.categoria} · ${d.titulo}`, "rol")}</div>`;
            })
            .join("")}
        </div>
        <div class="abs" style="left:72px;right:72px;top:930px">${E("nota", "Gracias por mirar con nosotros.", "texto-slab")}</div>
        ${pie(marcaPie, '<span class="contador">5/7</span>')}`,
    }),
    c6: () => ({
      html: `
        <div class="abs" style="top:72px;left:72px">${E("etq", "Hecho por", "etiqueta")}</div>
        <div class="personas clara abs" style="left:72px;right:72px;top:190px">
          ${Z.equipo.map((p, i) => `<div class="persona">${E("nom" + i, p.nombre, "nombre")}${E("rol" + i, p.rol, "rol")}</div>`).join("")}
        </div>
        <div class="abs" style="left:72px;right:72px;top:780px">
          ${E("nota", "Editado, diseñado e impreso de forma independiente entre Pucón y Santiago de Chile, en julio y agosto de 2026.", "texto")}
          ${E("gracias", "Gracias a Wallmapu Foto por generar la instancia que impulsó este proyecto.", "bajada", 'style="margin-top:30px"')}
        </div>
        ${pie(marcaPie, '<span class="contador">6/7</span>')}`,
    }),
    c7: () => ({
      clase: "sobre-foto",
      html: `
        ${F("foto", "mujeres-ventana-contraportada", "top:0;left:0;width:1080px;height:1350px", "", "total")}
        <div class="abs" style="left:72px;right:72px;top:64px">${E("marca", Z.nombre, "marca")}${E("sub", `${Z.bajada} · ${Z.numero}`, "marca-sub")}</div>
        <div class="abs" style="left:72px;right:72px;bottom:170px">
          ${E("tit", "Consigue tu ejemplar", "titulo-grande")}
          ${E("donde", Z.dondeComprar, "texto", 'style="margin-top:30px"')}
          ${E("web", "Lee los textos en " + Z.web, "texto-slab", 'style="margin-top:30px"')}
        </div>
        ${pie(E("guarda", "Guarda y comparte"), '<span class="contador">7/7</span>')}`,
    }),

    // ----- Historias (zona segura: 220 px arriba, 300 px abajo) -----
    hLanzamiento: () => ({
      html: `
        <div class="abs" style="top:250px;left:72px">${E("etq", "Ya salió", "etiqueta")}</div>
        <div class="abs slab" style="top:252px;right:72px;font-weight:900;font-size:44px;line-height:1">${E("num", Z.numero)}</div>
        ${F("portada", "portada-zine", "top:350px;left:190px;width:700px;height:912px", "objeto")}
        <div class="abs" style="left:72px;right:72px;top:1300px;text-align:center">
          ${E("titulo", Z.bajada, "titulo")}
          ${E("bajada", `${Z.nombre} ${Z.numero} · ${Z.fecha}`, "bajada", 'style="margin-top:12px"')}
        </div>
        ${G("left:240px;width:600px;top:1460px;height:140px", "Espacio para el sticker de enlace")}`,
    }),
    hCita: (d) => ({
      clase: "oscura",
      html: `
        ${F("foto", d.foto, "top:0;left:0;width:1080px;height:900px")}
        <div class="abs" style="top:950px;left:72px">${E("etq", d.categoria, "etiqueta clara")}</div>
        <div class="abs" style="left:72px;right:72px;top:1050px">
          ${E("cita", d.cita, "cita")}
          ${E("autor", "— " + (d.citaAutor || d.autor), "autor", 'style="margin-top:28px"')}
          ${E("obra", `${d.titulo}, ${Z.nombre} ${Z.numero}`, "bajada", 'style="margin-top:6px"')}
        </div>`,
    }),
    hTexto: (d) => ({
      clase: "sobre-foto",
      html: `
        ${F("foto", d.foto, "top:0;left:0;width:1080px;height:1920px", "", "historia")}
        <div class="abs" style="top:250px;left:72px">${E("etq", "Nuevo en la web", "etiqueta")}</div>
        <div class="abs" style="left:72px;right:72px;bottom:520px">
          ${E("cat", `${d.categoria} · ${Z.nombre} ${Z.numero}`, "bajada")}
          ${E("titulo", d.titulo, "titulo-grande", 'style="margin-top:16px"')}
          ${E("autor", "Por " + d.autor, "autor", 'style="margin-top:24px"')}
          ${E("leer", "Lee el texto completo ↓", "texto", 'style="margin-top:40px;font-weight:700"')}
        </div>
        ${G("left:240px;width:600px;top:1450px;height:140px", "Espacio para el sticker de enlace")}`,
    }),
    hPregunta: () => ({
      clase: "oscura",
      html: `
        <div class="abs" style="top:250px;left:72px">${E("etq", "Pregunta", "etiqueta clara")}</div>
        <div class="abs" style="left:72px;right:72px;top:380px">${E("preg", "¿Una foto perfecta te parece hecha con IA?", "titulo-grande")}</div>
        ${G("left:140px;width:800px;top:900px;height:330px", "Espacio para el sticker de encuesta")}
        <div class="abs" style="left:72px;right:72px;top:1300px">${E("nota", "Lo conversamos en «La sospecha permanente», de Christian Carl. BackFocus #01.", "texto")}</div>`,
    }),
    hComprar: () => ({
      html: `
        <div class="abs" style="top:250px;left:72px">${E("marca", Z.nombre, "marca")}${E("sub", `${Z.bajada} · ${Z.numero}`, "marca-sub")}</div>
        ${F("portada", "portada-zine", "top:560px;left:72px;width:480px;height:625px", "objeto")}
        <div class="abs" style="top:570px;left:600px;right:72px">
          ${E("etq", "Consíguelo", "etiqueta")}
          ${E("precio", Z.precio, "precio", 'style="margin-top:40px"')}
          ${E("donde", Z.dondeComprar, "texto", 'style="margin-top:30px"')}
        </div>
        <div class="abs" style="left:72px;right:72px;top:1260px">${E("leer", "Y lee los textos en " + Z.web, "texto-slab")}</div>
        ${G("left:240px;width:600px;top:1450px;height:140px", "Espacio para el sticker de enlace")}`,
    }),
  };

  // ---------- Textos para publicar ----------
  const lineaCompra = `→ ${Z.dondeComprar}\n→ Precio: ${Z.precio}`;
  // Enlace a la web de cada texto (la editorial incluida)
  const enlace = (d) => `→ ${d.titulo} (${(d.categoria || "Editorial").toLowerCase()} de ${d.autor}):\n${d.url}`;
  const indiceEnlaces = () => `Lee los textos de este número en la web:\n\n${[Z.editorial, ...T].map(enlace).join("\n\n")}`;
  const C = {
    lanzamiento: () =>
      `Ya está disponible ${Z.nombre} ${Z.numero}, ${Z.fecha}.\n\n${Z.descripcion}\n\nEn este número escriben Freddy Briones Parra, Christian Carl y Domingo Fernández K., y nos acompañan ${Z.invitados.slice(0, -1).join(", ")} y ${Z.invitados.at(-1)}.\n\n${lineaCompra}\n\n${indiceEnlaces()}\n\n${HASHTAGS}`,
    invitados: () =>
      `En ${Z.nombre} ${Z.numero} nos acompañan:\n\n${["leonora", "sandy", "resistir", "esto-ha-sido"].map((id, i) => `→ ${Z.invitados[i]}: ${texto(id).titulo}\n${texto(id).url}`).join("\n\n")}\n\nGracias por mirar con nosotros.\n\n${lineaCompra}\n\n${HASHTAGS}`,
    articulo: (d) =>
      `${d.titulo}\n${d.bajada}\n${d.categoria} de ${d.autor} · ${Z.nombre} ${Z.numero}, pág. ${d.pagina}\n\n«${d.cita}»${d.citaAutor ? ` — ${d.citaAutor}` : ""}\n\nLee el texto completo en la web:\n${d.url}\n\nTambién en la edición impresa.\n\n${HASHTAGS}`,
    cita: (d) =>
      `«${d.cita}»\n— ${d.citaAutor || d.autor}, en «${d.titulo}».\n\n${Z.nombre} ${Z.numero} · ${Z.bajada}.\n\nLee el texto completo en la web:\n${d.url}\n\n${HASHTAGS}`,
    comprar: () =>
      `Consigue tu ejemplar de ${Z.nombre} ${Z.numero}.\n\n36 páginas sobre fotografía, imagen y nuevas tecnologías: ensayos, artículos y una entrevista a Leonora Vicuña.\n\n${lineaCompra}\n\n${indiceEnlaces()}\n\n${HASHTAGS}`,
    carrusel: () =>
      `Conoce ${Z.nombre} ${Z.numero} →\n\nUn fanzine para pensar la fotografía en tiempos de inteligencia artificial, redes sociales y sospecha permanente.\n\nDesliza para ver qué trae este número, quiénes participan y cómo conseguirlo.\n\n${lineaCompra}\n\n${indiceEnlaces()}\n\n${HASHTAGS}`,

    // Las historias no llevan texto al pie: estas son las indicaciones de stickers para publicarlas.
    hLanzamiento: () =>
      `Sticker de enlace: ${Z.webUrl}\nTexto del sticker: Conoce el ${Z.numero}\n\nOpcional: sticker de mención con las cuentas de los invitados (${Z.invitados.join(", ")}).\nGuárdala en una historia destacada «${Z.nombre} ${Z.numero}».`,
    hCita: (d) =>
      `Sticker de enlace: ${d.url}\nTexto del sticker: Leer «${d.titulo}»\n\nOpcional: menciona a ${d.citaAutor || d.autor}.`,
    hPregunta: () =>
      `Sticker de encuesta:\nPregunta: ¿Una foto perfecta te parece hecha con IA?\nOpción 1: Sí, cada vez más\nOpción 2: No, se nota la diferencia\n\nSticker de enlace: ${texto("sospecha").url}\nTexto del sticker: Leer «La sospecha permanente»\n\nAl día siguiente, comparte los resultados junto a la historia de ese texto.`,
    hTexto: (d) =>
      `Sticker de enlace: ${d.url}\nTexto del sticker: Leer «${d.titulo}»\n\nOpcional: menciona a ${d.autor}${d.citaAutor ? ` y ${d.citaAutor}` : ""}.`,
    hComprar: () =>
      `Sticker de enlace: ${Z.webUrl}\nTexto del sticker: Conseguir el ${Z.numero}\n\nPrecio: ${Z.precio}\n${Z.dondeComprar}\n\nOpcional: sticker de pregunta «¿Dónde lo quieres encontrar?» para sumar puntos de venta.`,
  };

  // ---------- Lista de piezas ----------
  const PIEZAS = [
    // Cada post es un carrusel de 3: portada + 2 slides de foto y texto destacado (window.SLIDES).
    // Las tres comparten el texto para publicar.
    ...[
      { clave: "lanzamiento", nombre: "Lanzamiento", tpl: P.lanzamiento, copy: C.lanzamiento },
      { clave: "invitados", nombre: "Invitados", tpl: P.invitados, copy: C.invitados },
      ...T.map((d) => ({ clave: "texto-" + d.id, d, nombre: d.titulo, tipo: "Texto destacado", tpl: () => P.articulo(d), copy: () => C.articulo(d) })),
      ...[["sospecha", 1.1], ["leonora", 1.2], ["esto-ha-sido", 1.1], ["error", 1.1]].map(([id, t]) => {
        const d = texto(id);
        return { clave: "cita-" + id, d, nombre: d.citaAutor || d.autor, tipo: "Cita", t, tpl: () => P.cita(d), copy: () => C.cita(d) };
      }),
      { clave: "comprar", nombre: "Dónde conseguirlo", tpl: P.comprar, copy: C.comprar },
    ].flatMap((g, i) => {
      const id = "feed-" + g.clave;
      const grupo = { id, nombre: g.nombre, tipo: g.tipo, n: i + 1 };
      const comun = { seccion: "feed", grupo, copy: g.copy, copyKey: id };
      const [s2, s3] = window.SLIDES[g.clave];
      return [
        { ...comun, id, slide: 1, nombre: "1 · Portada", tpl: g.tpl, t: g.t },
        { ...comun, id: id + "-2", slide: 2, nombre: "2 · Foto y destacado", tpl: () => P.slideFotoArriba(s2, g.d), t: s2.t || tamañoDestacado(s2.texto) },
        { ...comun, id: id + "-3", slide: 3, nombre: "3 · Foto y destacado", tpl: () => P.slideFotoAbajo(s3, g.d), t: s3.t || tamañoDestacado(s3.texto) },
      ];
    }),

    // Las 7 diapositivas comparten un solo texto para publicar (copyKey).
    ...[
      ["1 · Portada", P.c1],
      ["2 · ¿Qué es?", P.c2],
      ["3 · Editorial", P.c3, 0.8],
      ["4 · Contenidos", P.c4],
      ["5 · Invitados", P.c5],
      ["6 · Equipo", P.c6],
      ["7 · Consíguelo", P.c7],
    ].map(([nombre, tpl, t], i) => ({ id: `carrusel-${i + 1}`, seccion: "carrusel", nombre, tpl, t, copy: C.carrusel, copyKey: "carrusel" })),

    { id: "historia-lanzamiento", seccion: "historias", formato: "historia", nombre: "Ya salió", tpl: P.hLanzamiento, copy: C.hLanzamiento },
    { id: "historia-cita", seccion: "historias", formato: "historia", nombre: "Cita", t: 1.05, tpl: () => P.hCita(texto("sospecha")), copy: () => C.hCita(texto("sospecha")) },
    { id: "historia-pregunta", seccion: "historias", formato: "historia", nombre: "Pregunta con encuesta", tpl: P.hPregunta, copy: C.hPregunta },
    ...T.map((d) => ({ id: "historia-texto-" + d.id, seccion: "historias", formato: "historia", nombre: d.titulo, tipo: "Nuevo en la web", t: d.titulo.length > 22 ? 0.8 : 1, tpl: () => P.hTexto(d), copy: () => C.hTexto(d) })),
    { id: "historia-comprar", seccion: "historias", formato: "historia", nombre: "Dónde conseguirlo", tpl: P.hComprar, copy: C.hComprar },
  ];
  const claveCopy = (p) => `bf:c:${p.copyKey || p.id}`;
  const tituloCopy = (p) =>
    p.formato === "historia" ? "Indicaciones para publicar (enlace y stickers)"
      : p.copyKey ? "Texto para publicar (el mismo para todo el carrusel)"
      : "Texto para publicar";

  // ---------- Almacenamiento (textos en localStorage, fotos en IndexedDB) ----------
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
    borrarPrefijo(p) {
      try { Object.keys(localStorage).filter((k) => k.startsWith(p)).forEach((k) => localStorage.removeItem(k)); } catch {}
    },
  };
  const idb = (() => {
    let db;
    const abrir = () => db || (db = new Promise((ok, mal) => {
      const r = indexedDB.open("backfocus-estudio", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("fotos");
      r.onsuccess = () => ok(r.result);
      r.onerror = () => mal(r.error);
    }));
    const tx = async (modo, fn) => {
      try {
        const d = await abrir();
        return await new Promise((ok, mal) => {
          const req = fn(d.transaction("fotos", modo).objectStore("fotos"));
          req.onsuccess = () => ok(req.result);
          req.onerror = () => mal(req.error);
        });
      } catch { return undefined; }
    };
    return {
      get: (k) => tx("readonly", (s) => s.get(k)),
      set: (k, v) => tx("readwrite", (s) => s.put(v, k)),
      del: (k) => tx("readwrite", (s) => s.delete(k)),
      borrarPrefijo: (p) => tx("readwrite", (s) => s.delete(IDBKeyRange.bound(p, p + "￿"))),
    };
  })();

  // ---------- Render ----------
  const tarjetas = new Map();
  const aviso = document.getElementById("aviso");
  const avisar = (msg) => {
    aviso.textContent = msg;
    aviso.classList.add("visible");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => aviso.classList.remove("visible"), 2200);
  };

  function confirmar(mensaje, accion) {
    return new Promise((ok) => {
      const fondo = document.createElement("div");
      fondo.className = "dialogo-fondo";
      fondo.innerHTML = `<div class="dialogo" role="dialog" aria-modal="true"><p></p><div class="controles"><button type="button" class="b-no">Cancelar</button><button type="button" class="principal b-si"></button></div></div>`;
      fondo.querySelector("p").textContent = mensaje;
      fondo.querySelector(".b-si").textContent = accion;
      const cerrar = (v) => { fondo.remove(); ok(v); };
      fondo.querySelector(".b-no").onclick = () => cerrar(false);
      fondo.querySelector(".b-si").onclick = () => cerrar(true);
      fondo.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(false); });
      document.body.append(fondo);
      fondo.querySelector(".b-si").focus();
    });
  }

  const alto = (p) => (p.formato === "historia" ? 1920 : 1350);

  function pintarPieza(p, tarjeta) {
    const { html, clase = "" } = p.tpl();
    const pieza = tarjeta.querySelector(".pieza");
    pieza.className = `pieza ${p.formato === "historia" ? "historia" : ""} ${clase}`;
    pieza.innerHTML = html;
    const t = Number(ls.get(`bf:s:${p.id}`) || p.t || 1);
    pieza.style.setProperty("--t", t);
    tarjeta.querySelector(".rango-texto").value = t;

    pieza.querySelectorAll("[data-edit]").forEach((el) => {
      const k = `bf:t:${p.id}:${el.dataset.edit}`;
      const guardado = ls.get(k);
      if (guardado !== null) el.innerHTML = guardado;
      el.addEventListener("input", () => ls.set(k, el.innerHTML));
      el.addEventListener("paste", (e) => {
        e.preventDefault();
        document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
      });
    });

    pieza.querySelectorAll(".foto").forEach((f) => prepararFoto(p, f, tarjeta));
    actualizarZoom(tarjeta);
  }

  async function prepararFoto(p, f, tarjeta) {
    const campo = f.dataset.foto;
    const kImg = `${p.id}:${campo}`;
    const kPos = `bf:p:${p.id}:${campo}`;
    const img = document.createElement("img");
    img.alt = "";
    f.prepend(img);
    const pos = JSON.parse(ls.get(kPos) || f.dataset.pos || '{"x":50,"y":50,"z":1}');
    const aplicar = () => {
      f.style.setProperty("--x", pos.x + "%");
      f.style.setProperty("--y", pos.y + "%");
      f.style.setProperty("--z", pos.z);
    };
    aplicar();
    f._pos = pos;
    f._aplicar = () => { aplicar(); ls.set(kPos, JSON.stringify(pos)); };
    img.src = (await idb.get(kImg)) || FOTOS[f.dataset.src] || `fotos/${f.dataset.src}.jpg`;

    f.querySelector(".ui-foto").addEventListener("click", (e) => {
      e.stopPropagation();
      elegirArchivo(async (dataUrl) => {
        await idb.set(kImg, dataUrl);
        img.src = dataUrl;
        Object.assign(pos, { x: 50, y: 50, z: 1 });
        f._aplicar();
        actualizarZoom(tarjeta);
      });
    });

    // Arrastrar para encuadrar
    f.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".ui")) return;
      e.preventDefault();
      f.setPointerCapture(e.pointerId);
      let ux = e.clientX, uy = e.clientY;
      const r = f.getBoundingClientRect();
      const mover = (ev) => {
        const k = 160 / pos.z;
        pos.x = Math.min(100, Math.max(0, pos.x - ((ev.clientX - ux) / r.width) * k));
        pos.y = Math.min(100, Math.max(0, pos.y - ((ev.clientY - uy) / r.height) * k));
        ux = ev.clientX; uy = ev.clientY;
        aplicar();
      };
      const soltar = () => {
        f.removeEventListener("pointermove", mover);
        f.removeEventListener("pointerup", soltar);
        f._aplicar();
      };
      f.addEventListener("pointermove", mover);
      f.addEventListener("pointerup", soltar);
    });
  }

  function actualizarZoom(tarjeta) {
    const f = tarjeta.querySelector(".foto");
    const rango = tarjeta.querySelector(".rango-zoom");
    rango.parentElement.style.display = f ? "" : "none";
    if (f && f._pos) rango.value = f._pos.z;
  }

  const entrada = document.createElement("input");
  entrada.type = "file";
  entrada.accept = "image/*";
  function elegirArchivo(cb) {
    entrada.value = "";
    entrada.onchange = () => {
      const archivo = entrada.files[0];
      if (!archivo) return;
      const lector = new FileReader();
      lector.onload = () => cb(lector.result);
      lector.readAsDataURL(archivo);
    };
    entrada.click();
  }

  function crearTarjeta(p, n) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    const h = alto(p);
    tarjeta.innerHTML = `
      <h3>${esc(p.nombre)} ${p.tipo ? `<span>· ${esc(p.tipo)}</span>` : ""}</h3>
      <div class="marco" style="--ar:1080/${h}"><div class="pieza"></div></div>
      <div class="controles">
        <button class="principal b-png" type="button">Descargar PNG</button>
        <button class="b-reset" type="button" title="Volver al texto y foto originales">Restablecer</button>
      </div>
      <div class="controles">
        <span class="etq">Texto</span><input class="rango-texto" type="range" min="0.6" max="1.5" step="0.05">
        <span><span class="etq">Zoom foto</span> <input class="rango-zoom" type="range" min="1" max="3" step="0.05"></span>
      </div>
      `;
    // En los posts agrupados el texto va una sola vez, debajo de las 3 slides
    if (p.copy && !p.grupo) tarjeta.append(crearCopy(p));
    tarjeta.dataset.n = n;
    const marco = tarjeta.querySelector(".marco");
    new ResizeObserver(() => marco.style.setProperty("--escala", marco.clientWidth / 1080)).observe(marco);
    pintarPieza(p, tarjeta);

    tarjeta.querySelector(".b-png").addEventListener("click", async (e) => {
      const b = e.currentTarget;
      b.disabled = true;
      try {
        await descargar(await exportar(p, tarjeta), nombreArchivo(p, n));
      } catch (err) {
        console.error(err);
        avisar("No se pudo exportar: " + err.message);
      }
      b.disabled = false;
    });
    tarjeta.querySelector(".b-reset").addEventListener("click", async () => {
      if (!(await confirmar(`¿Restablecer «${p.nombre}» a su versión original?`, "Restablecer"))) return;
      ls.borrarPrefijo(`bf:t:${p.id}:`);
      ls.borrarPrefijo(`bf:p:${p.id}:`);
      ls.borrarPrefijo(`bf:s:${p.id}`);
      if (p.copy && (!p.grupo || p.slide === 1)) {
        ls.borrarPrefijo(claveCopy(p));
        document.querySelectorAll(`textarea[data-copy="${claveCopy(p)}"]`).forEach((ta) => (ta.value = p.copy()));
      }
      await idb.borrarPrefijo(`${p.id}:`);
      pintarPieza(p, tarjeta);
      avisar("Pieza restablecida");
    });
    tarjeta.querySelector(".rango-texto").addEventListener("input", (e) => {
      tarjeta.querySelector(".pieza").style.setProperty("--t", e.target.value);
      ls.set(`bf:s:${p.id}`, e.target.value);
    });
    tarjeta.querySelector(".rango-zoom").addEventListener("input", (e) => {
      tarjeta.querySelectorAll(".foto").forEach((f) => {
        if (!f._pos) return;
        f._pos.z = Number(e.target.value);
        f._aplicar();
      });
    });

    tarjetas.set(p.id, tarjeta);
    return tarjeta;
  }

  function crearCopy(p) {
    const caja = document.createElement("details");
    caja.className = "copy";
    caja.open = true;
    caja.innerHTML = `<summary>${tituloCopy(p)}</summary><textarea spellcheck="true"></textarea><div class="controles"><button class="b-copiar" type="button">Copiar texto</button></div>`;
    const ta = caja.querySelector("textarea");
    const k = claveCopy(p);
    ta.dataset.copy = k;
    ta.value = ls.get(k) ?? p.copy();
    ta.addEventListener("input", () => {
      ls.set(k, ta.value);
      // Mantiene sincronizadas las piezas que comparten texto (carrusel)
      document.querySelectorAll(`textarea[data-copy="${k}"]`).forEach((otra) => { if (otra !== ta) otra.value = ta.value; });
    });
    caja.querySelector(".b-copiar").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(ta.value); avisar("Texto copiado"); }
      catch { ta.select(); document.execCommand("copy"); avisar("Texto copiado"); }
    });
    return caja;
  }

  // ---------- Exportar ----------
  const dosCifras = (n) => String(n).padStart(2, "0");
  const baseGrupo = (p) => `${p.seccion}-${dosCifras(p.grupo.n)}-${p.grupo.id.replace(/^feed-/, "")}`;
  const nombreArchivo = (p, n) =>
    p.grupo ? `${baseGrupo(p)}-${p.slide}.png` : `${p.seccion}-${dosCifras(n)}-${p.id.replace(/^(feed|carrusel|historia)-/, "")}.png`;

  async function exportar(p, tarjeta) {
    const pieza = tarjeta.querySelector(".pieza");
    const conGuias = document.body.classList.contains("guias");
    document.activeElement?.blur();
    document.body.classList.add("exportando");
    document.body.classList.remove("guias");
    try {
      await document.fonts.ready;
      await Promise.all([...pieza.querySelectorAll("img")].map((i) => i.decode().catch(() => {})));
      return await htmlToImage.toBlob(pieza, {
        width: 1080,
        height: alto(p),
        pixelRatio: 1,
        style: { transform: "none" },
        filter: (n) => !(n.classList && n.classList.contains("ui")),
      });
    } finally {
      document.body.classList.remove("exportando");
      if (conGuias) document.body.classList.add("guias");
    }
  }

  const descargas = window.claude?.use ? window.claude.use("downloads").catch(() => null) : Promise.resolve(undefined);
  async function descargar(blob, nombre) {
    const dl = await descargas;
    if (dl === null) { avisar("Las descargas no están disponibles en esta vista"); return; }
    if (dl) {
      try { await dl.save({ filename: nombre, data: blob }); avisar("Archivo guardado"); }
      catch (err) { if (err?.code !== "declined") avisar("No se pudo guardar: " + (err?.message || err)); }
      return;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  const copyDe = (p) => document.querySelector(`textarea[data-copy="${claveCopy(p)}"]`)?.value ?? "";

  // Un bloque por texto: el carrusel aparece una sola vez, con la lista de sus diapositivas.
  function todosLosCopys() {
    const vistos = new Set();
    return PIEZAS.filter((p) => p.copy)
      .filter((p) => !vistos.has(claveCopy(p)) && vistos.add(claveCopy(p)))
      .map((p) => {
        const piezas = PIEZAS.filter((q) => q.copy && claveCopy(q) === claveCopy(p));
        const archivos = piezas.map((q) => nombreArchivo(q, tarjetas.get(q.id).dataset.n)).join(", ");
        const titulo = p.grupo ? `Carrusel «${p.grupo.nombre}»${p.grupo.tipo ? ` (${p.grupo.tipo.toLowerCase()})` : ""}`
          : p.copyKey === "carrusel" ? "Carrusel «Conoce el #01»" : p.nombre;
        return `=== ${p.seccion.toUpperCase()} · ${titulo} ===\nImágenes: ${archivos}\n\n${copyDe(p)}`;
      })
      .join("\n\n\n");
  }

  async function descargarTodo(boton) {
    boton.disabled = true;
    const original = boton.textContent;
    try {
      const zip = new JSZip();
      let i = 0;
      for (const p of PIEZAS) {
        boton.textContent = `Exportando ${++i}/${PIEZAS.length}…`;
        const tarjeta = tarjetas.get(p.id);
        const archivo = `${p.seccion}/${nombreArchivo(p, tarjeta.dataset.n)}`;
        zip.file(archivo, await exportar(p, tarjeta));
        // Cada imagen va con su texto al lado (mismo nombre, .txt); el carrusel lleva uno solo.
        if (p.grupo) zip.file(`${p.seccion}/${baseGrupo(p)}.txt`, copyDe(p));
        else if (p.copyKey === "carrusel") zip.file("carrusel/texto-para-publicar.txt", copyDe(p));
        else if (p.copy) zip.file(archivo.replace(/\.png$/, ".txt"), copyDe(p));
      }
      zip.file("textos-para-publicar.txt", todosLosCopys());
      boton.textContent = "Comprimiendo…";
      await descargar(await zip.generateAsync({ type: "blob" }), "backfocus-01-instagram.zip");
    } catch (err) {
      console.error(err);
      avisar("No se pudo exportar: " + err.message);
    }
    boton.textContent = original;
    boton.disabled = false;
  }

  // ---------- Inicio ----------
  const secciones = { feed: "rejilla-feed", carrusel: "rejilla-carrusel", historias: "rejilla-historias" };
  const contador = {};
  const grupos = new Map();
  for (const p of PIEZAS) {
    contador[p.seccion] = (contador[p.seccion] || 0) + 1;
    const rejilla = document.getElementById(secciones[p.seccion]);
    if (!p.grupo) { rejilla.append(crearTarjeta(p, contador[p.seccion])); continue; }
    // Posts agrupados: una fila con las 3 slides y el texto compartido debajo
    let g = grupos.get(p.grupo.id);
    if (!g) {
      g = document.createElement("div");
      g.className = "grupo";
      g.innerHTML = `<h3>${dosCifras(p.grupo.n)} · ${esc(p.grupo.nombre)} ${p.grupo.tipo ? `<span>· ${esc(p.grupo.tipo)}</span>` : ""} <span>· carrusel de 3</span></h3><div class="grupo-slides"></div>`;
      const copy = crearCopy(p);
      copy.classList.add("grupo-copy");
      g.append(copy);
      rejilla.append(g);
      grupos.set(p.grupo.id, g);
    }
    g.querySelector(".grupo-slides").append(crearTarjeta(p, contador[p.seccion]));
  }

  // Acceso desde la consola del navegador, por ejemplo: await BF_ESTUDIO.exportar("feed-lanzamiento")
  window.BF_ESTUDIO = {
    piezas: PIEZAS.map((p) => p.id),
    exportar: (id) => exportar(PIEZAS.find((p) => p.id === id), tarjetas.get(id)),
    nombreArchivo: (id) => nombreArchivo(PIEZAS.find((p) => p.id === id), tarjetas.get(id).dataset.n),
  };

  document.getElementById("b-todo").addEventListener("click", (e) => descargarTodo(e.currentTarget));
  document.getElementById("b-copys").addEventListener("click", () =>
    descargar(new Blob([todosLosCopys()], { type: "text/plain;charset=utf-8" }), "textos-para-publicar.txt"),
  );
  document.getElementById("b-guias").addEventListener("change", (e) => document.body.classList.toggle("guias", e.target.checked));
  document.getElementById("b-reset-todo").addEventListener("click", async () => {
    if (!(await confirmar("¿Borrar todos los cambios (textos, fotos y encuadres) y volver a las plantillas originales?", "Borrar todo"))) return;
    ls.borrarPrefijo("bf:");
    await idb.borrarPrefijo("");
    location.reload();
  });
  };
  // En la versión web las fotos se cargan antes de iniciar (ver herramientas/publicar.mjs)
  if (window.FOTOS_LISTAS) window.FOTOS_LISTAS.then(iniciar);
  else iniciar();
})();
