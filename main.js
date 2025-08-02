// Obtener usuarios desde localStorage
function getUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

// Guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registro
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

// Login
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
        localStorage.setItem('loggedInUser', user.username);
        window.location.href = "tienda.html";
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Logout común
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "index.html";
}

// --- Tienda ---
const productos = [
    { nombre: "Pan", descripcion: "Pan fresco del día", cantidad: 30, precio: "$0.50" },
    { nombre: "Leche", descripcion: "Leche entera 1L", cantidad: 20, precio: "$1.20" },
    { nombre: "Arroz", descripcion: "Arroz blanco 1Kg", cantidad: 50, precio: "$0.90" },
    { nombre: "Huevos", descripcion: "Docena de huevos", cantidad: 15, precio: "$1.80" },
    { nombre: "Queso", descripcion: "Queso fresco 250g", cantidad: 10, precio: "$2.50" }
];

function mostrarProductos() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'product-img';
        const imagePath = `img/${p.nombre.toLowerCase()}.jpg`; // e.g., img/pan.jpg
        imageDiv.style.backgroundImage = `url('${imagePath}')`;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'product-name';
        nameSpan.textContent = p.nombre;

        imageDiv.appendChild(nameSpan);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'product-info';
        infoDiv.innerHTML = `
            <p>${p.descripcion}</p>
            <p><strong>Cantidad:</strong> ${p.cantidad}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
            <button class="add-btn" onclick="agregarProducto('${p.nombre}')">+</button>
        `;

        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        container.appendChild(card);
    });
}


function agregarProducto(nombre) {
    const modal = document.getElementById('modalAgregado');
    if (modal) {
        document.getElementById('modalText').textContent = `Producto "${nombre}" agregado a la compra.`;
        modal.showModal();
    }
}

function cerrarModal() {
    const modal = document.getElementById('modalAgregado');
    if (modal) modal.close();
}

// Detectar página actual y ejecutar código según corresponda
window.onload = function () {
    const path = window.location.pathname;

    // Página de inicio (index.html)
    if (path.includes("index.html") || path.endsWith("/")) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('welcomeContainer').style.display = 'block';
            document.getElementById('welcomeUser').textContent = loggedInUser;
        }
    }

    // Página de registro
    else if (path.includes("registro.html")) {
        // Nada que ejecutar automáticamente aquí
    }

    // Página de tienda
    else if (path.includes("tienda.html")) {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            window.location.href = "index.html";
        } else {
            const userText = document.getElementById("loggedUser");
            if (userText) userText.textContent = `Sesión iniciada como: ${user}`;
            mostrarProductos();
        }
    }
};
