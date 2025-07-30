// Lee el array de usuarios desde localStorage o crea uno vacío
function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// Guarda el array actualizado de usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registro de usuario: agrega nuevo usuario si no existe
function register() {
    const user = document.getElementById('regUser').value.trim();
    const pass = document.getElementById('regPass').value.trim();

    if (!user || !pass) {
        alert('Por favor completa todos los campos.');
        return;
    }

    let users = getUsers();
    const userExists = users.some(u => u.username.toLowerCase() === user.toLowerCase());

    if (userExists) {
        alert('El usuario ya existe. Elige otro nombre.');
        return;
    }

    users.push({ username: user, password: pass });
    saveUsers(users);

    alert('¡Registrado con éxito! Ya puedes iniciar sesión.');
    document.getElementById('regUser').value = '';
    document.getElementById('regPass').value = '';
}

// Login: valida credenciales en JSON usuarios
function login() {
    const loginUser = document.getElementById('loginUser').value.trim();
    const loginPass = document.getElementById('loginPass').value.trim();

    if (!loginUser || !loginPass) {
        alert('Por favor completa todos los campos.');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.username.toLowerCase() === loginUser.toLowerCase() && u.password === loginPass);

    if (user) {
        // Mostrar mensaje bienvenida y ocultar formularios
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('welcomeContainer').style.display = 'block';
        document.getElementById('welcomeUser').textContent = user.username;
        // Guardar sesión simple (opcional)
        localStorage.setItem('loggedInUser', user.username);
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
}

// Mantener sesión activa si hay usuario logueado
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('welcomeContainer').style.display = 'block';
        document.getElementById('welcomeUser').textContent = loggedInUser;
    }
}