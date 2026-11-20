/* ==========================================================================
   ARCHIVO: script.js
   DESCRIPCIÓN: Lógica interactiva del blog de crochet.
   RELACIÓN: Lee el objeto global DATOS definido en data.js, dibuja cada
   sección en index.html, gestiona el filtro por etiquetas y controla los
   tres modales (tutorial completo, video de punto y guía de material).
   ========================================================================== */

(function () {
  "use strict";

  /* ==================== CONSTANTES Y ESTADO ==================== */
  const URL_BASE_YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed/";
  const URL_BASE_YOUTUBE_VER = "https://www.youtube.com/watch?v=";
  const ETIQUETA_TODAS = "Todas";

  let etiquetaSeleccionada = ETIQUETA_TODAS;
  let elementoEnfocadoAntesDelModal = null;

  /* ==================== FUNCIONES AUXILIARES ==================== */

  /**
   * Crea un elemento HTML con clases y texto opcionales para evitar duplicación.
   * @param {string} etiqueta - Etiqueta HTML a crear.
   * @param {string} [claseCss] - Clases CSS separadas por espacios.
   * @param {string} [texto] - Contenido de texto seguro.
   * @returns {HTMLElement} Elemento DOM configurado.
   */
  function crearElemento(etiqueta, claseCss, texto) {
    const elemento = document.createElement(etiqueta);
    if (claseCss) {
      elemento.className = claseCss;
    }
    if (texto) {
      elemento.textContent = texto;
    }
    return elemento;
  }

  /**
   * Crea un reproductor responsivo de YouTube bajo demanda junto con su enlace directo.
   * @param {string} videoId - Identificador único del video en YouTube.
   * @param {string} tituloAccesible - Título descriptivo para el atributo title del iframe.
   * @returns {HTMLDivElement} Contenedor con el iframe y enlace externo.
   */
  function crearReproductorYouTube(videoId, tituloAccesible) {
    const envoltura = document.createElement("div");

    const contenedorVideo = crearElemento("div", "contenedor-video-responsivo");
    const iframeVideo = document.createElement("iframe");
    iframeVideo.src = URL_BASE_YOUTUBE_EMBED + encodeURIComponent(videoId);
    iframeVideo.title = tituloAccesible;
    iframeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframeVideo.allowFullscreen = true;

    contenedorVideo.appendChild(iframeVideo);
    envoltura.appendChild(contenedorVideo);

    const enlaceDirecto = crearElemento("a", "enlace-directo-youtube", "Abrir video directamente en YouTube");
    enlaceDirecto.href = URL_BASE_YOUTUBE_VER + encodeURIComponent(videoId);
    enlaceDirecto.target = "_blank";
    enlaceDirecto.rel = "noopener noreferrer";
    envoltura.appendChild(enlaceDirecto);

    return envoltura;
  }

  /**
   * Crea el bloque visual de un paso individual dentro del modal de tutorial.
   * @param {Object} paso - Objeto con { texto, imagen }.
   * @param {number} indice - Posición del paso en la lista.
   * @param {string} tituloTutorial - Título del tutorial para el atributo alt.
   * @returns {HTMLLIElement} Elemento de lista configurado.
   */
  function crearElementoPaso(paso, indice, tituloTutorial) {
    const itemPaso = crearElemento("li", "item-paso-tutorial");

    const encabezadoPaso = crearElemento("p", "paso-encabezado", "Instrucción");
    const descripcionPaso = crearElemento("p", "", paso.texto);

    itemPaso.appendChild(encabezadoPaso);
    itemPaso.appendChild(descripcionPaso);

    if (paso.imagen) {
      const imagenPaso = document.createElement("img");
      imagenPaso.src = paso.imagen;
      imagenPaso.alt = "Paso " + (indice + 1) + " del tutorial: " + tituloTutorial;
      imagenPaso.loading = "lazy";
      itemPaso.appendChild(imagenPaso);
    }

    return itemPaso;
  }

  /* ==================== RENDERIZADO DE SECCIONES ==================== */

  /**
   * Dibuja las tarjetas de tutoriales filtradas según la etiqueta activa.
   */
  function renderizarTarjetasDeBlog() {
    const contenedorBlog = document.getElementById("contenedor-blog");
    const estadoFiltro = document.getElementById("estado-filtro-blog");

    if (!contenedorBlog || !Array.isArray(DATOS.tutoriales)) {
      return;
    }

    const tutorialesFiltrados = DATOS.tutoriales.filter(function (tutorial) {
      if (etiquetaSeleccionada === ETIQUETA_TODAS) {
        return true;
      }
      return tutorial.etiqueta.toLowerCase() === etiquetaSeleccionada.toLowerCase();
    });

    if (estadoFiltro) {
      estadoFiltro.textContent =
        etiquetaSeleccionada === ETIQUETA_TODAS
          ? "Mostrando todos los artículos (" + tutorialesFiltrados.length + ")"
          : "Categoría: " + etiquetaSeleccionada + " (" + tutorialesFiltrados.length + ")";
    }

    contenedorBlog.innerHTML = "";

    if (tutorialesFiltrados.length === 0) {
      const mensajeVacio = crearElemento(
        "p",
        "texto-ayuda",
        "Aún no hay tutoriales publicados bajo esta etiqueta."
      );
      contenedorBlog.appendChild(mensajeVacio);
      return;
    }

    tutorialesFiltrados.forEach(function (tutorial) {
      const articulo = crearElemento("article", "tarjeta-tutorial");

      const imagenPortada = document.createElement("img");
      imagenPortada.className = "tarjeta-tutorial-imagen";
      imagenPortada.src = tutorial.imagenPortada;
      imagenPortada.alt = "Imagen principal del tutorial: " + tutorial.titulo;
      imagenPortada.loading = "lazy";

      const cuerpoTarjeta = crearElemento("div", "tarjeta-tutorial-cuerpo");
      const metaSuperior = crearElemento("div", "tarjeta-meta-superior");
      const etiqueta = crearElemento("span", "etiqueta", tutorial.etiqueta);
      metaSuperior.appendChild(etiqueta);

      if (tutorial.videoId && tutorial.videoId.trim() !== "") {
        const insigniaVideo = crearElemento("span", "insignia-video", "Incluye video");
        metaSuperior.appendChild(insigniaVideo);
      }

      const titulo = crearElemento("h3", "", tutorial.titulo);
      const fecha = crearElemento("p", "fecha-publicacion", tutorial.fecha);
      const resumen = crearElemento("p", "", tutorial.resumen);

      const botonLeerMas = crearElemento("button", "boton-primario", "Leer tutorial completo");
      botonLeerMas.type = "button";
      botonLeerMas.addEventListener("click", function () {
        abrirDetalleDeTutorial(tutorial.id);
      });

      cuerpoTarjeta.appendChild(metaSuperior);
      cuerpoTarjeta.appendChild(titulo);
      cuerpoTarjeta.appendChild(fecha);
      cuerpoTarjeta.appendChild(resumen);
      cuerpoTarjeta.appendChild(botonLeerMas);

      articulo.appendChild(imagenPortada);
      articulo.appendChild(cuerpoTarjeta);
      contenedorBlog.appendChild(articulo);
    });
  }

  /**
   * Dibuja las tarjetas de patrones con enlaces externos opcionales.
   */
  function renderizarPatrones() {
    const contenedorPatrones = document.getElementById("contenedor-patrones");
    if (!contenedorPatrones || !Array.isArray(DATOS.patrones)) {
      return;
    }

    contenedorPatrones.innerHTML = "";

    DATOS.patrones.forEach(function (patron) {
      const tarjeta = crearElemento("article", "tarjeta-patron");
      const bloqueSuperior = document.createElement("div");

      const titulo = crearElemento("h3", "", patron.titulo);
      const descripcion = crearElemento("p", "", patron.descripcion);
      const nivel = crearElemento("p", "nivel-patron", patron.nivel);

      bloqueSuperior.appendChild(titulo);
      bloqueSuperior.appendChild(descripcion);
      bloqueSuperior.appendChild(nivel);
      tarjeta.appendChild(bloqueSuperior);

      if (patron.url && patron.url.trim() !== "") {
        const textoEnlace = patron.textoBoton || "Ver patrón completo";
        const enlacePatron = crearElemento("a", "boton-secundario", textoEnlace);
        enlacePatron.href = patron.url;
        enlacePatron.target = "_blank";
        enlacePatron.rel = "noopener noreferrer";
        tarjeta.appendChild(enlacePatron);
      }

      contenedorPatrones.appendChild(tarjeta);
    });
  }

  /**
   * Dibuja las filas interactivas de la tabla de puntos básicos.
   */
  function renderizarTablaDePuntos() {
    const cuerpoTabla = document.getElementById("cuerpo-tabla-puntos");
    if (!cuerpoTabla || !Array.isArray(DATOS.puntos)) {
      return;
    }

    cuerpoTabla.innerHTML = "";

    DATOS.puntos.forEach(function (punto) {
      const fila = document.createElement("tr");
      fila.tabIndex = 0;
      fila.setAttribute("role", "button");
      fila.setAttribute("aria-label", "Ver explicación y video de " + punto.nombre);

      const celdaNombre = crearElemento("td", "", punto.nombre);
      const celdaAbreviatura = crearElemento("td", "", punto.abreviatura);
      const celdaDificultad = crearElemento("td", "", punto.dificultad);
      const celdaAccion = crearElemento("td", "enlace-accion-tabla", "Ver video");

      fila.appendChild(celdaNombre);
      fila.appendChild(celdaAbreviatura);
      fila.appendChild(celdaDificultad);
      fila.appendChild(celdaAccion);

      fila.addEventListener("click", function () {
        abrirDetalleDePunto(punto.nombre);
      });

      fila.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          abrirDetalleDePunto(punto.nombre);
        }
      });

      cuerpoTabla.appendChild(fila);
    });
  }

  /**
   * Dibuja la lista interactiva de materiales esenciales.
   */
  function renderizarMateriales() {
    const listaMateriales = document.getElementById("lista-materiales");
    if (!listaMateriales || !Array.isArray(DATOS.materiales)) {
      return;
    }

    listaMateriales.innerHTML = "";

    DATOS.materiales.forEach(function (material, indice) {
      const item = crearElemento("li", "item-material");
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "Ver consejos sobre " + material.nombre);

      const bloqueInfo = crearElemento("div", "item-material-info");
      const tituloMaterial = crearElemento("strong", "", material.nombre);
      const resumenMaterial = crearElemento("span", "", material.resumen);
      bloqueInfo.appendChild(tituloMaterial);
      bloqueInfo.appendChild(resumenMaterial);

      const indicador = crearElemento("span", "etiqueta-ver-detalle", "Leer consejo");

      item.appendChild(bloqueInfo);
      item.appendChild(indicador);

      item.addEventListener("click", function () {
        abrirDetalleDeMaterial(indice);
      });

      item.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          abrirDetalleDeMaterial(indice);
        }
      });

      listaMateriales.appendChild(item);
    });
  }

  /**
   * Dibuja los widgets de la barra lateral: Sobre mí, Filtros por etiqueta y Videos.
   */
  function renderizarSidebar() {
    const widgetSobreMi = document.getElementById("widget-sobre-mi");
    const listaVideos = document.getElementById("lista-videos-sidebar");
    const contenedorEtiquetas = document.getElementById("contenedor-etiquetas");

    if (widgetSobreMi && DATOS.sobreMi) {
      widgetSobreMi.innerHTML = "";
      const titulo = crearElemento("h3", "", DATOS.sobreMi.titulo);
      const foto = document.createElement("img");
      foto.className = "avatar-perfil";
      foto.src = DATOS.sobreMi.foto;
      foto.alt = "Fotografía de perfil del blog de crochet";

      const biografia = crearElemento("p", "", DATOS.sobreMi.bio);

      widgetSobreMi.appendChild(titulo);
      widgetSobreMi.appendChild(foto);
      widgetSobreMi.appendChild(biografia);
    }

    if (contenedorEtiquetas && Array.isArray(DATOS.etiquetas)) {
      contenedorEtiquetas.innerHTML = "";
      DATOS.etiquetas.forEach(function (textoEtiqueta) {
        const botonFiltro = crearElemento("button", "boton-filtro-etiqueta", textoEtiqueta);
        botonFiltro.type = "button";

        if (textoEtiqueta === etiquetaSeleccionada) {
          botonFiltro.classList.add("activa");
        }

        botonFiltro.addEventListener("click", function () {
          filtrarTutorialesPorEtiqueta(textoEtiqueta);
        });

        contenedorEtiquetas.appendChild(botonFiltro);
      });
    }

    if (listaVideos && Array.isArray(DATOS.videosSidebar)) {
      listaVideos.innerHTML = "";
      DATOS.videosSidebar.forEach(function (video) {
        const item = document.createElement("li");
        const enlace = crearElemento("a", "", video.titulo);
        enlace.href = video.url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";

        item.appendChild(enlace);
        listaVideos.appendChild(item);
      });
    }
  }

  /**
   * Actualiza la categoría activa y vuelve a dibujar los artículos del blog.
   * @param {string} nuevaEtiqueta - Nombre de la etiqueta seleccionada.
   */
  function filtrarTutorialesPorEtiqueta(nuevaEtiqueta) {
    etiquetaSeleccionada = nuevaEtiqueta;
    renderizarSidebar();
    renderizarTarjetasDeBlog();
  }

  /* ==================== GESTIÓN DE MODALES ==================== */

  /**
   * Abre el modal con el tutorial completo, pasos numerados y video opcional.
   * @param {number} id - Identificador único del tutorial en DATOS.tutoriales.
   */
  function abrirDetalleDeTutorial(id) {
    const tutorialActual = DATOS.tutoriales.find(function (item) {
      return item.id === id;
    });

    const modalDetalleTutorial = document.getElementById("modal-detalle-tutorial");
    const contenidoModal = document.getElementById("contenido-modal-tutorial");

    if (!tutorialActual || !modalDetalleTutorial || !contenidoModal) {
      return;
    }

    contenidoModal.innerHTML = "";

    const etiqueta = crearElemento("span", "etiqueta", tutorialActual.etiqueta);
    const titulo = crearElemento("h2", "", tutorialActual.titulo);
    titulo.id = "titulo-modal-tutorial";

    const fecha = crearElemento("p", "fecha-publicacion", tutorialActual.fecha);

    const imagenPrincipal = document.createElement("img");
    imagenPrincipal.className = "modal-imagen-portada";
    imagenPrincipal.src = tutorialActual.imagenPortada;
    imagenPrincipal.alt = "Portada del tutorial: " + tutorialActual.titulo;

    contenidoModal.appendChild(etiqueta);
    contenidoModal.appendChild(titulo);
    contenidoModal.appendChild(fecha);
    contenidoModal.appendChild(imagenPrincipal);

    /* Si el tutorial tiene un videoId configurado, lo insertamos bajo demanda */
    if (tutorialActual.videoId && tutorialActual.videoId.trim() !== "") {
      const bloqueVideo = crearElemento("div", "bloque-video-tutorial");
      const subtituloVideo = crearElemento("h3", "", "Video guía de este tutorial");
      const reproductor = crearReproductorYouTube(
        tutorialActual.videoId,
        "Video tutorial: " + tutorialActual.titulo
      );

      bloqueVideo.appendChild(subtituloVideo);
      bloqueVideo.appendChild(reproductor);
      contenidoModal.appendChild(bloqueVideo);
    }

    const listaPasos = crearElemento("ol", "lista-pasos-tutorial");
    tutorialActual.pasos.forEach(function (paso, indice) {
      const elementoPaso = crearElementoPaso(paso, indice, tutorialActual.titulo);
      listaPasos.appendChild(elementoPaso);
    });

    contenidoModal.appendChild(listaPasos);
    mostrarModal(modalDetalleTutorial);
  }

  /**
   * Abre el modal con la ficha del punto básico y su video embebido de YouTube.
   * @param {string} nombre - Nombre exacto del punto en DATOS.puntos.
   */
  function abrirDetalleDePunto(nombre) {
    const puntoActual = DATOS.puntos.find(function (item) {
      return item.nombre === nombre;
    });

    const modalDetallePunto = document.getElementById("modal-detalle-punto");
    const contenidoModal = document.getElementById("contenido-modal-punto");

    if (!puntoActual || !modalDetallePunto || !contenidoModal) {
      return;
    }

    contenidoModal.innerHTML = "";

    const titulo = crearElemento("h2", "", puntoActual.nombre);
    titulo.id = "titulo-modal-punto";

    const metadatos = crearElemento(
      "p",
      "punto-metadatos",
      "Abreviatura: " + puntoActual.abreviatura + " | " + puntoActual.dificultad
    );

    const descripcion = crearElemento("p", "punto-descripcion", puntoActual.descripcion);
    const reproductor = crearReproductorYouTube(
      puntoActual.videoId,
      "Demostración en video de " + puntoActual.nombre
    );

    contenidoModal.appendChild(titulo);
    contenidoModal.appendChild(metadatos);
    contenidoModal.appendChild(descripcion);
    contenidoModal.appendChild(reproductor);

    mostrarModal(modalDetallePunto);
  }

  /**
   * Abre el modal con recomendaciones prácticas sobre un material específico.
   * @param {number} indice - Posición del material en DATOS.materiales.
   */
  function abrirDetalleDeMaterial(indice) {
    const materialActual = DATOS.materiales[indice];
    const modalDetalleMaterial = document.getElementById("modal-detalle-material");
    const contenidoModal = document.getElementById("contenido-modal-material");

    if (!materialActual || !modalDetalleMaterial || !contenidoModal) {
      return;
    }

    contenidoModal.innerHTML = "";

    const titulo = crearElemento("h2", "", materialActual.nombre);
    titulo.id = "titulo-modal-material";

    const resumen = crearElemento("p", "punto-metadatos", materialActual.resumen);
    const consejo = crearElemento("p", "material-detalle-texto", materialActual.consejo);

    contenidoModal.appendChild(titulo);
    contenidoModal.appendChild(resumen);
    contenidoModal.appendChild(consejo);

    mostrarModal(modalDetalleMaterial);
  }

  /**
   * Muestra un modal específico y traslada el foco de teclado a su interior.
   * @param {HTMLElement} elementoModal - Contenedor del modal a desplegar.
   */
  function mostrarModal(elementoModal) {
    elementoEnfocadoAntesDelModal = document.activeElement;
    elementoModal.hidden = false;
    document.body.classList.add("modal-abierto");

    const primerBoton = elementoModal.querySelector("button");
    if (primerBoton) {
      primerBoton.focus();
    }
  }

  /**
   * Cierra todos los modales abiertos, detiene los videos activos y restaura el foco.
   */
  function cerrarModal() {
    const modales = document.querySelectorAll(".modal-superposicion");
    modales.forEach(function (modal) {
      modal.hidden = true;
    });

    /* Limpiamos los contenedores con video para detener la reproducción al cerrar */
    const idsContenedoresConVideo = ["contenido-modal-tutorial", "contenido-modal-punto"];
    idsContenedoresConVideo.forEach(function (idContenedor) {
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        contenedor.innerHTML = "";
      }
    });

    document.body.classList.remove("modal-abierto");

    if (elementoEnfocadoAntesDelModal && typeof elementoEnfocadoAntesDelModal.focus === "function") {
      elementoEnfocadoAntesDelModal.focus();
    }
  }

  /**
   * Registra los eventos de cierre por botón, clic fuera de la caja o tecla Escape.
   */
  function configurarEventosDeCierre() {
    const botonesCerrar = document.querySelectorAll("[data-cerrar-modal]");
    botonesCerrar.forEach(function (boton) {
      boton.addEventListener("click", cerrarModal);
    });

    const modales = document.querySelectorAll(".modal-superposicion");
    modales.forEach(function (modal) {
      modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
          cerrarModal();
        }
      });
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") {
        cerrarModal();
      }
    });
  }

  /* ==================== INICIALIZACIÓN ==================== */

  document.addEventListener("DOMContentLoaded", function () {
    const elementoAnio = document.getElementById("anio-actual");
    if (elementoAnio) {
      elementoAnio.textContent = new Date().getFullYear();
    }

    renderizarTarjetasDeBlog();
    renderizarPatrones();
    renderizarTablaDePuntos();
    renderizarMateriales();
    renderizarSidebar();
    configurarEventosDeCierre();
  });
})();