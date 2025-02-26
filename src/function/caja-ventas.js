let mesas = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
let mesaSeleccionada = null;

// Elementos del modal
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modal-message');
const cerrarModal = document.getElementById('cerrarModal');

// Función para mostrar el modal
function mostrarModal(mensaje) {
    modalMessage.textContent = mensaje;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
}

// Función para ocultar el modal
function ocultarModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
}

// Evento para cerrar el modal
cerrarModal.addEventListener('click', ocultarModal);
modalOverlay.addEventListener('click', ocultarModal);

// Función para inicializar los eventos
function inicializarEventos() {
    // Eventos para seleccionar mesas
    document.querySelectorAll('.mesa').forEach(mesa => {
        mesa.addEventListener('click', () => {
            const numeroMesa = parseInt(mesa.id.split('-')[1]);
            seleccionarMesa(numeroMesa);
        });
    });

    // Eventos para agregar ítems del menú
    document.querySelectorAll('.menu .item').forEach(item => {
        item.addEventListener('click', () => {
            const nombre = item.getAttribute('data-nombre');
            const precio = parseFloat(item.getAttribute('data-precio'));
            agregarItem(nombre, precio);
        });
    });

    // Evento para facturar
    document.getElementById('facturar').addEventListener('click', facturar);
}

// Función para seleccionar una mesa
function seleccionarMesa(mesa) {
    if (!mesas[mesa]) {
        mostrarModal("Mesa no válida");
        return;
    }
    mesaSeleccionada = mesa;
    document.getElementById("mesa-seleccionada").textContent = `Mesa ${mesa} seleccionada`;

    // Remover selección previa
    document.querySelectorAll('.mesa').forEach(m => m.classList.remove('seleccionada'));
    document.getElementById(`mesa-${mesa}`).classList.add('seleccionada');

    actualizarComanda();
}

// Función para agregar un ítem a la comanda
function agregarItem(nombre, precio) {
    if (!mesaSeleccionada) {
        mostrarModal("Selecciona una mesa primero");
        return;
    }
    mesas[mesaSeleccionada].push({ nombre, precio });
    document.getElementById(`mesa-${mesaSeleccionada}`).classList.add('ocupada');
    actualizarComanda();
}

// Función para actualizar la comanda
function actualizarComanda() {
    const lista = document.getElementById('lista-comanda');
    lista.innerHTML = '';
    let total = 0;

    mesas[mesaSeleccionada].forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)} <button class="btn-delete-item" onclick="eliminarItem(${index})">❌</button></li>`;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para eliminar un ítem de la comanda
function eliminarItem(index) {
    if (!mesaSeleccionada) {
        mostrarModal("Selecciona una mesa primero");
        return;
    }
    mesas[mesaSeleccionada].splice(index, 1);
    if (mesas[mesaSeleccionada].length === 0) {
        document.getElementById(`mesa-${mesaSeleccionada}`).classList.remove('ocupada');
    }
    actualizarComanda();
}

// Función para facturar
function facturar() {
    if (!mesaSeleccionada) {
        mostrarModal("Selecciona una mesa primero");
        return;
    }
    if (mesas[mesaSeleccionada].length === 0) {
        mostrarModal("No hay ítems en la comanda");
        return;
    }

    const itemsFacturados = mesas[mesaSeleccionada].map(item => `${item.nombre} - $${item.precio.toFixed(2)}`).join('\n');
    const total = mesas[mesaSeleccionada].reduce((sum, item) => sum + item.precio, 0);

    mostrarModal(`Factura generada para Mesa ${mesaSeleccionada}\n\n${itemsFacturados}\n\nTotal: $${total.toFixed(2)}`);

    mesas[mesaSeleccionada] = [];
    document.getElementById(`mesa-${mesaSeleccionada}`).classList.remove('ocupada');
    actualizarComanda();
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarEventos);