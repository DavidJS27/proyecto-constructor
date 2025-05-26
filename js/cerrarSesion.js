// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
    return false; // Prevenir navegación por defecto
}