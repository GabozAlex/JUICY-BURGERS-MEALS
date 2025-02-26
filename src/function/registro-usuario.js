document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const cerrarModal = document.getElementById('cerrarModal');

    registroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            mensaje.textContent = 'Las contraseñas no coinciden.';
            mensaje.style.color = 'red';
            return;
        }

        // Validar que el campo de usuario no esté vacío
        if (!username || !password) {
            mensaje.textContent = 'Por favor, completa todos los campos.';
            mensaje.style.color = 'red';
            return;
        }

        // Obtener usuarios existentes del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el usuario ya existe
        const usuarioExistente = usuarios.find(user => user.username === username);
        if (usuarioExistente) {
            mensaje.textContent = 'El usuario ya existe.';
            mensaje.style.color = 'red';
            return;
        }

        // Guardar el nuevo usuario
        usuarios.push({ username, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar el modal de éxito
        modal.classList.add('active');
        modalOverlay.classList.add('active');

        // Limpiar el formulario
        registroForm.reset();
    });

    // Cerrar el modal al hacer clic en el botón "Cerrar"
    cerrarModal.addEventListener('click', function() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });

    // Cerrar el modal al hacer clic fuera del modal
    modalOverlay.addEventListener('click', function() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });
});