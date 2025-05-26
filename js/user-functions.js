// Guardar usuario (nuevo o editar)
function guardarUsuario() {
    const form = document.getElementById("formUsuario");
    
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }
    
    const idUsuario = document.getElementById("idUsuario").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const usuarioData = {
        cedula: document.getElementById("cedula").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        celular: document.getElementById("celular").value,
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        cnfrm_password: document.getElementById("confirm-contrasena").value,
        rol: document.getElementById("role").value,
        estado: document.getElementById("estado").value,
        permisos: []
    };
    
    if (idUsuario) {
        // document.getElementById('estado-wrapper').classList.add("editar")

        // Editar usuario existente
        const index = usuarios.findIndex(u => u.idusuario == idUsuario);
        if (index !== -1) {
            // Mantener los permisos existentes si los tiene
            if (usuarios[index].permisos) {
                usuarioData.permisos = usuarios[index].permisos;
            }
            usuarioData.idusuario = parseInt(idUsuario);
            usuarios[index] = usuarioData;
            alertify.success('Usuario actualizado correctamente.');
        }
    } else {
        // Nuevo usuario
        usuarioData.estado = 'activo';      // PRUEBA
        usuarioData.idusuario = generarNuevoId(usuarios);
        usuarios.push(usuarioData);
        alertify.success('Usuario creado correctamente.');
    }
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
    // Cerrar modal y recargar datos
    bootstrap.Modal.getInstance(document.getElementById("modalUsuario")).hide();
    cargarUsuarios();
}

// Editar usuario
function editarUsuario(id) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.idusuario === id);

    document.getElementById('estado-wrapper').style.display = 'block';

    if (usuario) {
        document.getElementById("idUsuario").value = usuario.idusuario;
        document.getElementById("cedula").value = usuario.cedula;
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("apellido").value = usuario.apellido;
        document.getElementById("celular").value = usuario.celular;
        document.getElementById("usuario").value = usuario.usuario;
        document.getElementById("contrasena").value = usuario.contrasena;
        document.getElementById("confirm-contrasena").value = '';   // pureba
        document.getElementById("role").value = usuario.rol;
        document.getElementById("estado").value = usuario.estado || 'activo';

        document.getElementById("modalUsuarioLabel").textContent = "Editar Usuario";
        
        // Abrir modal
        new bootstrap.Modal(document.getElementById("modalUsuario")).show();
    }
}

function checkInputs() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let isValid = true;

    const cedulaInput = document.getElementById('cedula');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const telefonoInput = document.getElementById('celular');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('contrasena');
    const cnfrmInput = document.getElementById('confirm-contrasena');

    const cedula = cedulaInput.value.trim();
    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();
    const cnfrm_password = cnfrmInput.value.trim();

    // TODO: Agregar estilos necesarios a la validación.

    if (!/^[1-9]\d{5,6}$/.test(cedula)) {
        alertify.error('La cédula debe tener entre 6 y 7 dígitos.Sin puntos. No empezar por 0.');
        isValid = false;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(nombre)) {
        alertify.error('El nombre puede tener solo letras y mínimo 2 caracteres.')
        isValid = false;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(apellido)) {
        alertify.error('El apellido puede tener solo letras y mínimo 2 caracteres.')
        isValid = false;
    } 

    if (!/^(09\d{8}|02\d{7})$/.test(telefono)) {
        alertify.error('El número de teléfono debe comenzar con 09 o 02 y tener 9 o 10 dígitos. Solo permite números');
        isValid = false;
    }

    if (!/^[a-zA-Z0-9_.]{4,20}$/.test(usuario)) {
        alertify.error('El nombre de usuario puede tener solo letras, números, "." o "_" (4-20 caracteres).');
        isValid = false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
        alertify.error('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales (!@#$%^&*).');
        isValid = false;
    }

    if (password !== cnfrm_password) {
        alertify.error('Las contraseñas con coinciden');
        isValid = false;
    }

    if(usuarios.find(u => u.cedula === cedula)) {
        alertify.error('El campo cédula de identidad es único. Ya existe el valor ingresado.');
        isValid = false;
    }

    if(usuarios.find(u => u.usuario === usuario)) {
        alertify.error(`Ya existe un usuario con el nombre de usuario ${usuario}.`);
        isValid = false;
    }

    return isValid;    
}

// function setInvalid(inputElement, message) {
//     inputElement.classList.add('is-invalid');
//     inputElement.nextElementSibling.textContent = message;
// }

// function setValid(inputElement) {
//     inputElement.classList.remove('is-invalid');
//     inputElement.classList.add('is-valid');
//     inputElement.nextElementSibling.textContent = '';
// }