document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Verificar si el usuario principal ya existe en el localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Si no existe el usuario principal, crearlo
    if (!usuarios.some(user => user.username === 'admin')) {
        const usuarioPrincipal = {
            username: 'admin',
            password: '1234' // Contraseña por defecto
        };
        usuarios.push(usuarioPrincipal);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validar que los campos no estén vacíos
        if (!username || !password) {
            showError('Por favor, completa todos los campos.');
            return;
        }

        // Buscar el usuario en la lista de usuarios registrados
        const usuario = usuarios.find(user => user.username === username && user.password === password);

        if (usuario) {
            // Inicio de sesión exitoso
            showError('Inicio de sesión exitoso.', 'green');

            // Guardar el estado de sesión en sessionStorage
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('currentUser', JSON.stringify(usuario));

            // Redirigir al usuario a la página principal después de 1 segundo
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1000);
        } else {
            // Credenciales incorrectas
            showError('Usuario o contraseña incorrectos.', 'red');
        }
    });

    function showError(message, color = 'red') {
        errorMessage.textContent = message;
        errorMessage.style.color = color;
        errorMessage.style.display = 'block';
    }
});