const WHATSAPP = "543794662177";

const productos = [
  { id: 1, nombre: "Botella térmica estilo Stanley", categoria: "Botellas, mates y termos", descripcion: "Botellas térmicas en distintos modelos y colores.", precio: null, etiqueta: "Destacado", imagen: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
  { id: 2, nombre: "Mates", categoria: "Botellas, mates y termos", descripcion: "Consultá por diseños, colores y modelos disponibles.", precio: null, etiqueta: "", imagen: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80" },
  { id: 3, nombre: "Termos", categoria: "Botellas, mates y termos", descripcion: "Opciones para acompañar tus mates donde vayas.", precio: null, etiqueta: "Popular", imagen: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
  { id: 4, nombre: "Auriculares", categoria: "Tecnología", descripcion: "Consultá por modelos y compatibilidad.", precio: null, etiqueta: "", imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
  { id: 5, nombre: "Cargadores", categoria: "Tecnología", descripcion: "Preguntá por tipo de conexión y modelos disponibles.", precio: null, etiqueta: "", imagen: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80" },
  { id: 6, nombre: "Billeteras", categoria: "Accesorios", descripcion: "Consultá por estilos y colores disponibles.", precio: null, etiqueta: "", imagen: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80" },
  { id: 7, nombre: "Relojes", categoria: "Accesorios", descripcion: "Preguntá por modelos y disponibilidad.", precio: null, etiqueta: "Destacado", imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
  { id: 8, nombre: "Accesorios para celular", categoria: "Tecnología", descripcion: "Consultá por accesorios disponibles para tu equipo.", precio: null, etiqueta: "", imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" }
];

const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");
let categoriaActual = "Todos";

function formatoPrecio(precio) {
  if (precio === null || precio === undefined || precio === "") return "Consultar precio";
  return Number(precio).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}
function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caracter]);
}
function crearTarjeta(producto) {
  const nombre = escaparHTML(producto.nombre);
  const categoria = escaparHTML(producto.categoria);
  const descripcion = escaparHTML(producto.descripcion);
  const etiqueta = producto.etiqueta ? `<span class="product-tag">${escaparHTML(producto.etiqueta)}</span>` : "";
  const mensaje = encodeURIComponent(`Hola, quisiera consultar por "${producto.nombre}" en Bazar lo de Ester. ¿Me pasan el precio y la disponibilidad?`);
  return `<article class="product-card">
    <div class="product-image"><img src="${escaparHTML(producto.imagen)}" alt="${nombre}" loading="lazy" onerror="this.style.display='none'">${etiqueta}</div>
    <div class="product-info"><span class="product-category">${categoria}</span><h3>${nombre}</h3><p class="product-description">${descripcion}</p>
      <div class="product-bottom"><div class="product-price">${formatoPrecio(producto.precio)}<small>Precio por consulta</small></div>
      <a class="product-consult" href="https://wa.me/${WHATSAPP}?text=${mensaje}" target="_blank" rel="noopener">Consultar ↗</a></div>
    </div></article>`;
}
function renderizarProductos() {
  const busqueda = searchInput.value.trim().toLocaleLowerCase("es");
  const filtrados = productos.filter(producto => {
    const coincideCategoria = categoriaActual === "Todos" || producto.categoria === categoriaActual;
    const texto = `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLocaleLowerCase("es");
    return coincideCategoria && texto.includes(busqueda);
  });
  productsGrid.innerHTML = filtrados.map(crearTarjeta).join("");
  emptyState.hidden = filtrados.length > 0;
}
filters.addEventListener("click", event => {
  const boton = event.target.closest("button[data-category]");
  if (!boton) return;
  categoriaActual = boton.dataset.category;
  filters.querySelectorAll(".filter").forEach(filtro => filtro.classList.toggle("active", filtro === boton));
  renderizarProductos();
});
searchInput.addEventListener("input", renderizarProductos);

document.querySelectorAll(".service-link").forEach(boton => {
  boton.addEventListener("click", () => {
    const servicio = boton.dataset.service;
    const mensaje = encodeURIComponent(`Hola, quisiera consultar por el servicio de ${servicio} en Bazar lo de Ester.`);
    window.open(`https://wa.me/${WHATSAPP}?text=${mensaje}`, "_blank", "noopener");
  });
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(abierto));
  menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = abierto ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(enlace => enlace.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

// Aparición elegante al desplazarse por la página.
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("is-visible");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(elemento => observador.observe(elemento));

renderizarProductos();

async function actualizarClimaLavado() {
  const temperatura = document.getElementById("clima-temperatura");
  if (!temperatura) return;

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=-27.47&longitude=-58.83" +
      "&current=temperature_2m,weather_code,precipitation" +
      "&daily=precipitation_probability_max,temperature_2m_max" +
      "&forecast_days=1&timezone=America%2FArgentina%2FCordoba";

    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("No se pudo consultar el clima");

    const datos = await respuesta.json();
    const actual = datos.current;
    const codigo = actual.weather_code;

    const estados = {
      0: ["☀️", "Despejado"],
      1: ["🌤️", "Mayormente despejado"],
      2: ["⛅", "Parcialmente nublado"],
      3: ["☁️", "Nublado"],
      45: ["🌫️", "Con niebla"],
      48: ["🌫️", "Con niebla"],
      51: ["🌦️", "Llovizna leve"],
      53: ["🌦️", "Llovizna"],
      55: ["🌧️", "Llovizna intensa"],
      61: ["🌧️", "Lluvia leve"],
      63: ["🌧️", "Lluvia"],
      65: ["🌧️", "Lluvia intensa"],
      71: ["🌨️", "Nevada leve"],
      80: ["🌦️", "Chaparrones"],
      81: ["🌧️", "Chaparrones"],
      82: ["⛈️", "Chaparrones fuertes"],
      95: ["⛈️", "Tormenta"],
      96: ["⛈️", "Tormenta con granizo"],
      99: ["⛈️", "Tormenta fuerte"]
    };

    const estado = estados[codigo] || ["🌤️", "Tiempo variable"];
    const lluvia = datos.daily.precipitation_probability_max[0];
    const maxima = Math.round(datos.daily.temperature_2m_max[0]);

    document.getElementById("clima-icono").textContent = estado[0];
    temperatura.textContent = `${Math.round(actual.temperature_2m)}°C`;
    document.getElementById("clima-descripcion").textContent = estado[1];
    document.getElementById("clima-lluvia").textContent =
      lluvia == null ? "Sin dato" : `${lluvia}%`;

    let consejo;

    if ([95, 96, 99, 65, 82].includes(codigo) ||
        (lluvia != null && lluvia >= 60)) {
      consejo = "Mejor esperar a que mejore el tiempo para el secado.";
    } else if ([61, 63, 80, 81, 51, 53, 55].includes(codigo)) {
      consejo = "Hay precipitaciones: revisá el pronóstico antes de lavar.";
    } else if (lluvia != null && lluvia <= 20) {
      consejo = `Máxima de ${maxima}°C y poca lluvia prevista. ¡Consultanos!`;
    } else {
      consejo = `Máxima de ${maxima}°C. Consultá cómo estará el día para secar.`;
    }

    document.getElementById("clima-consejo").textContent = consejo;

  } catch (error) {
    document.getElementById("clima-descripcion").textContent =
      "No pudimos cargar el clima ahora.";
    document.getElementById("clima-consejo").textContent =
      "Consultá el pronóstico y preguntanos por el lavado.";
  }
}

actualizarClimaLavado();
