const STORAGE_KEY = 'jc_mesas';
const VENTAS_KEY = 'jc_ventas';

function cargarMesas() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
}

function guardarMesas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mesas));
}

function guardarVenta(items) {
    const ventas = JSON.parse(localStorage.getItem(VENTAS_KEY)) || [];
    ventas.push({ items, total: items.reduce((s, i) => s + i.precio, 0), fecha: new Date().toISOString() });
    localStorage.setItem(VENTAS_KEY, JSON.stringify(ventas));
}

let mesas = cargarMesas();
let mesaSeleccionada = null;

const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modal-message');
const cerrarModal = document.getElementById('cerrarModal');

function mostrarModal(mensaje) {
    modalMessage.innerHTML = mensaje;
    modal.classList.add('active');
    modalOverlay.classList.add('active');
}

function ocultarModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
}

cerrarModal.addEventListener('click', ocultarModal);
modalOverlay.addEventListener('click', ocultarModal);

function inicializarEventos() {
    document.querySelectorAll('.mesa').forEach(mesa => {
        mesa.addEventListener('click', () => {
            const numeroMesa = parseInt(mesa.id.split('-')[1]);
            seleccionarMesa(numeroMesa);
        });
    });

    document.querySelectorAll('.menu .item').forEach(item => {
        item.addEventListener('click', () => {
            const nombre = item.getAttribute('data-nombre');
            const precio = parseFloat(item.getAttribute('data-precio'));
            agregarItem(nombre, precio);
        });
    });

    document.getElementById('facturar').addEventListener('click', facturar);

    // Restaurar estados visuales de mesas
    for (const mesa in mesas) {
        if (mesas[mesa].length > 0) {
            const el = document.getElementById(`mesa-${mesa}`);
            if (el) el.classList.add('ocupada');
        }
    }
}

function seleccionarMesa(mesa) {
    if (!mesas[mesa]) {
        mostrarModal('Mesa no válida');
        return;
    }
    mesaSeleccionada = mesa;
    document.getElementById('mesa-seleccionada').textContent = `Mesa ${mesa} seleccionada`;

    document.querySelectorAll('.mesa').forEach(m => m.classList.remove('seleccionada'));
    document.getElementById(`mesa-${mesa}`).classList.add('seleccionada');

    actualizarComanda();
}

function agregarItem(nombre, precio) {
    if (!mesaSeleccionada) {
        mostrarModal('Selecciona una mesa primero');
        return;
    }
    mesas[mesaSeleccionada].push({ nombre, precio });
    document.getElementById(`mesa-${mesaSeleccionada}`).classList.add('ocupada');
    guardarMesas();
    actualizarComanda();
}

function actualizarComanda() {
    const lista = document.getElementById('lista-comanda');
    lista.innerHTML = '';
    let total = 0;

    (mesas[mesaSeleccionada] || []).forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)} <button class="btn-delete-item" onclick="eliminarItem(${index})">✕</button></li>`;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarItem(index) {
    if (!mesaSeleccionada) {
        mostrarModal('Selecciona una mesa primero');
        return;
    }
    mesas[mesaSeleccionada].splice(index, 1);
    if (mesas[mesaSeleccionada].length === 0) {
        document.getElementById(`mesa-${mesaSeleccionada}`).classList.remove('ocupada');
    }
    guardarMesas();
    actualizarComanda();
}

function facturar() {
    if (!mesaSeleccionada) {
        mostrarModal('Selecciona una mesa primero');
        return;
    }
    if (mesas[mesaSeleccionada].length === 0) {
        mostrarModal('No hay ítems en la comanda');
        return;
    }

    const items = mesas[mesaSeleccionada];
    const total = items.reduce((sum, item) => sum + item.precio, 0);
    const lista = items.map(item => `${item.nombre} - $${item.precio.toFixed(2)}`).join('<br>');

    guardarVenta(items);

    mostrarModal(`<strong>Factura Mesa ${mesaSeleccionada}</strong><br><br>${lista}<br><br><strong>Total: $${total.toFixed(2)}</strong>`);

    mesas[mesaSeleccionada] = [];
    document.getElementById(`mesa-${mesaSeleccionada}`).classList.remove('ocupada');
    guardarMesas();
    actualizarComanda();
}

document.addEventListener('DOMContentLoaded', inicializarEventos);
