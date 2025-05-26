//---------------------------------------------------------------------------------------
function cerrarSesion() {
    alertify.confirm("Nombre del sistema", "¿Quieres cerrar la sesión del usuario?",
        function(){
            localStorage.removeItem("nomUsuario"); //Elimina el nombre del usuario
            window.location.href = "login.html"; // Redirige al login
        },
        function(){
            
        }
    ).set('labels', {ok:'Sí', cancel:'No'}).set('transition', 'slide');
}
//---------------------------------------------------------------------------------------