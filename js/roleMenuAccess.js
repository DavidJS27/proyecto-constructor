// Función principal para inicializar el control de acceso
function initRoleBasedAccess() {
    // Obtener el usuario actual del localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Si no hay usuario, redirigir a la página de error
        window.location.href = "error.html";
        return;
    }

    // Actualizar la interfaz según el rol
    if(currentUser.permisos.length === 0) {
        configureMenuByRole(currentUser.rol);
        // Verificar permisos para la página actual
        checkPagePermission(currentUser.rol);
    } else {
        customMenuConfiguration(currentUser.permisos);
        customPagePermission(currentUser.permisos)
    }
}

// Configurar el menú según el rol
function configureMenuByRole(role) {
    // Elementos del menú
    const menuFinanzas = document.getElementById("collapseFinanzas");
    const menuObras = document.getElementById("collapseObras");
    const menuMantenimiento = document.getElementById("collapseMantenimiento");
    
    // Enlaces del menú
    const linkFinanzas = document.querySelector('a[data-bs-target="#collapseFinanzas"]');
    const linkObras = document.querySelector('a[data-bs-target="#collapseObras"]');
    const linkMantenimiento = document.querySelector('a[data-bs-target="#collapseMantenimiento"]');
    
    // Por defecto, ocultar todos los módulos especializados
    if (menuFinanzas) menuFinanzas.classList.remove('show');
    if (menuObras) menuObras.classList.remove('show');
    if (menuMantenimiento) menuMantenimiento.classList.remove('show');
    
    // Configurar acceso según el rol
    switch (role) {
        case 'administrador':
            // Administrador tiene acceso completo, no se oculta nada
            break;
            
        case 'gerente':
            // Gerente tiene acceso a casi todo, excepto algunos elementos de administración
            hideMenuItems('.admin-only');
            break;
            
        case 'contador':
            // Contador solo ve finanzas
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            // Mostrar automáticamente el menú de finanzas
            if (menuFinanzas) menuFinanzas.classList.add('show');
            break;
            
        case 'jefe_obra':
            // Jefe de obra solo ve módulo de obras
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            // Mostrar automáticamente el menú de obras
            if (menuObras) menuObras.classList.add('show');
            break;
            
        case 'codificador':
            // Codificador solo ve algunos elementos de mantenimiento
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            // Solo mostrar ciertos elementos de mantenimiento
            hideMenuItems('.not-for-codifier');
            // Mostrar automáticamente el menú de mantenimiento
            if (menuMantenimiento) menuMantenimiento.classList.add('show');
            if (linkMantenimiento) linkMantenimiento.style.display = 'block';
            break;
            
        case 'obrero':
            // Obrero solo ve el dashboard, ocultar todo lo demás
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            break;
            
        default:
            // Por defecto, mostrar solo dashboard
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
    }
}

// Configurar el menu según permisos personalizados
function customMenuConfiguration(permisos) {
    const pages = ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                    'facturas-proveedores', 'facturas-clientes', 'pagos-proveedores', 
                    'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros',
                    'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                    'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];

    const administracionModule = ['usuarios', 'clientes', 'proveedores', 'materiales'];
    const finanzasModule = ['facturas-proveedores', 'facturas-clientes', 'pagos-proveedores', 'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros'];
    const obrasModule = ['mantenimiento-obras', 'asignar-materiales', 'control-existencias', 'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];

    // Enlaces del menú
    const linkFinanzas = document.querySelector('a[data-bs-target="#collapseFinanzas"]');
    const linkObras = document.querySelector('a[data-bs-target="#collapseObras"]');
    const linkMantenimiento = document.querySelector('a[data-bs-target="#collapseMantenimiento"]');

    let flagFinanzas = false;
    let flagObras = false;

    if(!permisos.some(permiso => administracionModule.includes(permiso))) {
       linkMantenimiento.style.display = 'none';
       document.getElementById('administracion').style.display = 'none';
    } 

    if(!permisos.some(permiso => finanzasModule.includes(permiso))) {
        linkFinanzas.style.display = 'none';
        flagFinanzas = true;
    }

    if(!permisos.some(permiso => obrasModule.includes(permiso))) {
        linkObras.style.display = 'none';
        flagObras = true;
    }

    if(flagFinanzas && flagObras) {
        document.getElementById('modulos').style.display = 'none';
    }

    if(!permisos.includes('dashboard')) document.getElementById('principal').style.display = 'none';

    const notAllowed = pages.filter(elem => !permisos.includes(elem));

    notAllowed.forEach(elem => {
        document.getElementById(elem).style.display = 'none';
    });
}

// Ocultar elementos del menú según selector
function hideMenuItems(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.style.display = 'none';
    });
}

// Verificar permisos para la página actual
function checkPagePermission(role) {
    // Obtener la página actual (última parte de la URL)
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().split('.')[0];
    
    // Definir las páginas permitidas por rol
    const allowedPages = {
        administrador: ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                        'facturas-proveedores', 'mantenimiento-facturas', 'facturas-clientes', 'mantenimiento-facturas-clientes', 'pagos-proveedores', 
                        'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-pagos',
                        'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                        'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        gerente: ['dashboard', 'clientes', 'proveedores', 'materiales', 
                 'facturas-proveedores', 'mantenimiento-facturas', 'mantenimiento-facturas-clientes','facturas-clientes', 'pagos-proveedores', 
                 'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-pagos',
                 'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                 'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        contador: ['dashboard', 'facturas-proveedores', 'mantenimiento-facturas', 'facturas-clientes', 'mantenimiento-facturas-clientes', 'pagos-proveedores', 
                  'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-pagos'],
        
        jefe_obra: ['dashboard', 'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                   'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        codificador: ['dashboard', 'clientes', 'proveedores', 'materiales'],
        
        obrero: ['dashboard']
    };
    
    // Páginas globales permitidas para todos los roles
    const globalAllowedPages = ['menu', 'error', '', 'login'];
    
    // Verificar si la página actual está permitida para el rol
    if (pageName && !globalAllowedPages.includes(pageName)) {
        const pagesForRole = allowedPages[role] || [];
        
        if (!pagesForRole.includes(pageName)) {
            // Si la página no está permitida, redirigir a error
            // alertify.error("No tienes permisos para acceder a esta página");
            // setTimeout(() => {
                window.location.href = "error.html";
            // }, 1500);
        }
    }
}

function customPagePermission(permisos) {
    const pages = ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                    'facturas-proveedores', 'facturas-clientes','mantenimiento-facturas-clientes', 'pagos-proveedores',
                    'historial-pagos',
                    'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros',
                    'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                    'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];
                        
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().split('.')[0];

    const notAllowed = pages.filter(elem => !permisos.includes(elem));

    if(notAllowed.includes(pageName)) {
        // Si la página no está permitida, redirigir a error
        // alertify.error("No tienes permisos para acceder a esta página");
        // setTimeout(() => {
            window.location.href = "error.html";
        // }, 1500);        
    }
}

// Inicializar el control de acceso cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initRoleBasedAccess);