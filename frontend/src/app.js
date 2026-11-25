
let documentos = [];

const tabla = document.getElementById("tabla-documentos");
const categoria = document.getElementById("categoria");
const buscar = document.getElementById("buscar");
const mensaje = document.getElementById("mensaje");
const estado = document.getElementById("service-status");

// Verificar el estado de la API
async function verificarServicio() {
    try {
        const respuesta = await fetch("/health", {
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error("Servicio no disponible");
        }

        const datos = await respuesta.json();

        if (datos.status !== "ok") {
            throw new Error("Estado incorrecto");
        }

        estado.textContent = "Operativo";
        estado.className = "status online";

    } catch (error) {
        estado.textContent = "No disponible";
        estado.className = "status offline";
    }
}

// Obtener documentos desde la API
async function cargarDocumentos() {
    mensaje.textContent = "Cargando documentos...";

    try {
        const respuesta = await fetch("/api/documentos", {
            cache: "no-store"
        });

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();
        documentos = datos.documentos;

        document.getElementById("total-documentos")
            .textContent = datos.total;

        cargarCategorias();
        mostrarDocumentos();

        document.getElementById("ultima-actualizacion")
            .textContent = "Última actualización: " +
            new Date().toLocaleString("es-CL");

    } catch (error) {
        documentos = [];
        tabla.replaceChildren();
        cargarCategorias();

        document.getElementById("total-documentos")
            .textContent = "0";

        mensaje.textContent =
            "No fue posible conectar con la API.";

        document.getElementById("ultima-actualizacion")
            .textContent = "";

        console.error(error);
    }
}

// Generar categorias a partir de los datos recibidos
function cargarCategorias() {
    const seleccion = categoria.value;

    const categorias = [
        ...new Set(documentos.map(doc => doc.categoria))
    ].sort();

    categoria.replaceChildren(
        new Option("Todas las categorías", "")
    );

    categorias.forEach(nombre => {
        categoria.add(new Option(nombre, nombre));
    });

    if (categorias.includes(seleccion)) {
        categoria.value = seleccion;
    }

    document.getElementById("total-categorias")
        .textContent = categorias.length;
}

// Mostrar y filtrar los documentos
function mostrarDocumentos() {
    const texto = buscar.value.toLowerCase();
    const filtro = categoria.value;

    const resultados = documentos.filter(doc => {
        return doc.nombre.toLowerCase().includes(texto)
            && (!filtro || doc.categoria === filtro);
    });

    tabla.replaceChildren();

    resultados.forEach(doc => {
        const fila = document.createElement("tr");

        [
            doc.id,
            doc.nombre,
            doc.categoria,
            doc.version
        ].forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const celdaEstado = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = "badge " +
            (doc.estado === "Vigente"
                ? "vigente"
                : "revision");

        etiqueta.textContent = doc.estado;

        celdaEstado.appendChild(etiqueta);
        fila.appendChild(celdaEstado);
        tabla.appendChild(fila);
    });

    mensaje.textContent = resultados.length
        ? `Mostrando ${resultados.length} de ${documentos.length} documentos.`
        : "No se encontraron documentos.";
}

// Actualizar informacion del portal
async function actualizarPortal() {
    await Promise.all([
        verificarServicio(),
        cargarDocumentos()
    ]);
}

// Eventos de interaccion
buscar.addEventListener("input", mostrarDocumentos);
categoria.addEventListener("change", mostrarDocumentos);

document.getElementById("actualizar")
    .addEventListener("click", actualizarPortal);

// Carga inicial
actualizarPortal();
