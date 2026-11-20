

const DATOS = {

  tutoriales: [
    {
      id: 1,
      titulo: "¿Qué es el crochet y por qué engancha tanto?",
      etiqueta: "Principiantes",
      fecha: "Publicado el 12 de marzo",
      resumen:
        "El crochet o ganchillo es una técnica artesanal con la que se crean tejidos a partir de un hilo y una aguja especial. Descubre por qué es un pasatiempo relajante ideal para empezar hoy.",
      imagenPortada: "imagenes/crochetwall.jpg",
      videoId: "",
      pasos: [
        {
          texto: "Elige un ovillo de hilo de algodón de grosor medio (número 4) y color claro para distinguir bien cada puntada.",
          imagen: "imagenes/yarn.jpg"
        },
        {
          texto: "Toma una aguja de crochet de aluminio de 4.0 mm, que resulta ergonómica y evita que el hilo se resbale demasiado.",
          imagen: "imagenes/tutorial2.jpg"
        },
        {
          texto: "Practica hacer un nudo deslizado inicial y tus primeras 10 cadenas manteniendo una tensión relajada en los dedos.",
          imagen: "imagenes/tutorial3.jpg"
        }
      ]
    },
    {
      id: 2,
      titulo: "Cómo sujetar la aguja y el hilo correctamente",
      etiqueta: "Tutorial",
      fecha: "Publicado el 8 de marzo",
      resumen:
        "La postura de las manos es lo primero que debes dominar. Aprende las dos formas más comunes de tomar la aguja y cómo controlar la tensión del hilo para lograr puntos parejos.",
      imagenPortada: "imagenes/chains2.jpg",
      videoId: "aAxGTnVNJiE",
      pasos: [
        {
          texto: "Agarre tipo lápiz: sujeta la parte plana de la aguja entre los dedos pulgar e índice de tu mano dominante, apoyándola sobre el dedo medio.",
          imagen: "imagenes/hook.png"
        },
        {
          texto: "Agarre tipo cuchillo: envuelve el mango de la aguja con toda la palma y guía la punta con el dedo índice.",
          imagen: "imagenes/hook2.png"
        },
        {
          texto: "Tensión del hilo: pasa la hebra por detrás del dedo meñique de tu mano contraria y súbela por encima del dedo índice para controlar el flujo.",
          imagen: "imagenes/hook3.png"
        }
      ]
    }
  ],

  puntos: [
    {
      nombre: "Punto cadena",
      abreviatura: "cad",
      dificultad: "Nivel 1 - Muy fácil",
      descripcion:
        "Es la base de casi todos los proyectos en crochet. Consiste en enlazar el hilo con el gancho y pasarlo a través de la argolla activa para formar una trenza flexible.",
      videoId: "q2agMbHxPg8"
    },
    {
      nombre: "Punto bajo",
      abreviatura: "pb",
      dificultad: "Nivel 1 - Muy fácil",
      descripcion:
        "Produce un tejido tupido, firme y sin agujeros. Se inserta la aguja en el punto base, se toma hebra, se saca y se vuelve a tomar hebra para cerrar ambos aritos.",
      videoId: "sub0FK6y8jI"
    },
    {
      nombre: "Punto medio alto",
      abreviatura: "pma",
      dificultad: "Nivel 2 - Fácil",
      descripcion:
        "Tiene una altura intermedia entre el punto bajo y el punto alto. Se toma lazada antes de insertar la aguja, se saca hebra y se cierran los tres aritos juntos.",
      videoId: "sub0FK6y8jI"
    },
    {
      nombre: "Punto alto",
      abreviatura: "pa",
      dificultad: "Nivel 2 - Fácil",
      descripcion:
        "Es un punto ligero y alto que avanza rápido. Se toma lazada, se inserta en la base y se cierran los aritos de dos en dos.",
      videoId: "sub0FK6y8jI"
    }
  ],


  patrones: [
    {
      titulo: "Bufanda básica en punto bajo",
      descripcion: "Tejida en hileras rectas de ida y vuelta. Es el ejercicio perfecto para practicar bordes rectos.",
      nivel: "Nivel 1 - Muy fácil",
      url: "https://vivcrochets.com/easy-crochet-ribbed-scarf-free-pattern-tutorial/?utm_source=Pinterest&utm_medium=organic",
      textoBoton: "Ver patrón externo"
    },
    {
      titulo: "Posavasos redondo",
      descripcion: "Se teje en círculo con aumentos progresivos. Ideal para dominar el anillo mágico desde cero.",
      nivel: "Nivel 2 - Fácil",
      url: "https://hayhaycrochet.com/crochet-patterns/home-decor/beginner-friendly-daisy-flower-coaster/",
      textoBoton: "Ver patrón externo"
    },
    {
      titulo: "Amigurumi osito mini",
      descripcion: "Figura tejida en espiral continua utilizando punto bajo, aumentos y disminuciones invisibles.",
      nivel: "Nivel 3 - Intermedio",
      url: "hhttps://handmadev.com/p/crochet-pattern-of-brown-bear-wearing-a-briefcase",
      textoBoton: "Ver patrón externo"
    }
  ],

  materiales: [
    {
      nombre: "Hilo de algodón peinado",
      resumen: "No se deshilacha y permite ver cada puntada con claridad.",
      consejo:
        "Para tus primeras prácticas elige hilo de algodón 100% de grosor medio (etiqueta número 4 o Worsted) en tonos pastel o claros. Evita los hilos oscuros o peludos al principio porque ocultan los puntos."
    },
    {
      nombre: "Aguja de crochet de 3.5 mm o 4.0 mm",
      resumen: "El calibre más cómodo y equilibrado para la mano.",
      consejo:
        "Las agujas de aluminio con mango ergonómico de goma reducen la fatiga en los dedos. Verifica siempre en la etiqueta del ovillo qué milímetro recomienda el fabricante."
    },
    {
      nombre: "Tijeras pequeñas de precisión",
      resumen: "Indispensables para rematar y cortar hebras limpiamente.",
      consejo:
        "Unas tijeras de bordado con punta fina permiten cortar el hilo al ras del nudo final sin riesgo de dañar el tejido terminado."
    },
    {
      nombre: "Aguja lanera de punta roma",
      resumen: "Sirve para esconder las hebras sobrantes y coser piezas.",
      consejo:
        "A diferencia de las agujas de coser tradicionales, su punta redondeada atraviesa entre las fibras del hilo sin partirlas. Elígela con ojo amplio."
    },
    {
      nombre: "Marcadores de puntos tipo candado",
      resumen: "Evitan que pierdas el inicio o el final de cada vuelta.",
      consejo:
        "Coloca un marcador en el primer punto de cada hilera o vuelta en espiral. Así sabrás exactamente dónde cerrar y tus tejidos mantendrán sus medidas."
    }
  ],
  sobreMi: {
    titulo: "Sobre este espacio",
    foto: "imagenes/uwu.jpg",
    bio: "Bienvenida a este cuaderno digital de ganchillo. Aquí comparto guías paso a paso, puntos fundamentales y recursos seleccionados para que aprendas a tejer con calma y seguridad."
  },

  videosSidebar: [
    {
      titulo: "Curso de crochet desde cero",
      url: "https://www.youtube.com/watch?v=XIwaiGu6H_c"
    },
    {
      titulo: "Cómo hacer el punto bajo",
      url: "https://www.youtube.com/watch?v=sub0FK6y8jI"
    },
    {
      titulo: "El anillo mágico paso a paso",
      url: "https://www.youtube.com/watch?v=q2agMbHxPg8"
    },
    {
      titulo: "Cómo leer patrones escritos",
      url: "https://www.youtube.com/watch?v=1ZhZOQqFEKM"
    },
    {
      titulo: "Primer amigurumi para principiantes",
      url: "https://www.youtube.com/watch?v=IAirqT2A0Yk"
    }
  ],

  etiquetas: [
    "Todas",
    "Principiantes",
    "Tutorial",
    "Patrones"
  ]
};
