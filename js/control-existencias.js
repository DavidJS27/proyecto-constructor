// Función para cargar los materiales asignados a una obra
function registrarMovimientoMaterial(idMaterial, cantidad, tipoMovimiento, idObra) {
    const movimientos = JSON.parse(localStorage.getItem('movimientoMaterialCabecera')) || [];
    const detalles = JSON.parse(localStorage.getItem('movimientoMaterialDetalle')) || [];
    const nuevoMovimiento = {// Crear nuevo movimiento
        idMovimiento: movimientos.length + 1,
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        tipoMovimiento: tipoMovimiento, // 'ENTRADA' o 'SALIDA'
        origenObraId: tipoMovimiento === 'ENTRADA' ? '' : idObra, // Origen en caso de salida
        destinoObraId: tipoMovimiento === 'SALIDA' ? idObra : '', // Destino en caso de entrada
        observaciones: '',
        usuario: 1 
    }; 
    movimientos.push(nuevoMovimiento); // Agregar movimiento a la lista
    const detalleMovimiento = {  // Registrar el detalle del movimiento
        idDetalle: detalles.length + 1,
        idMovimiento: nuevoMovimiento.idMovimiento,
        idMaterial: idMaterial,
        cantidad: cantidad
    };
    detalles.push(detalleMovimiento);
    // Guardar los cambios en el localStorage
    localStorage.setItem('movimientoMaterialCabecera', JSON.stringify(movimientos));
    localStorage.setItem('movimientoMaterialDetalle', JSON.stringify(detalles));
}
function cargarObrasEnSelect() {
    const obras = JSON.parse(localStorage.getItem('obras')) || [];
    const select = document.getElementById('selectObra');
    select.innerHTML = '<option value=""></option>';
    obras.forEach(obra => {
        const option = document.createElement('option');
        option.value = obra.idObra;
        option.textContent = obra.nombre;
        select.appendChild(option);
    });
}
window.onload = function () { // Cargar las obras al cargar la página
    cargarObrasEnSelect();
};
// Evento para mostrar los materiales al seleccionar una obra
document.getElementById('selectObra').addEventListener('change', function () {
    const idObra = parseInt(this.value);
    if (!isNaN(idObra)) {
        mostrarMaterialesEnTabla(idObra);
    } else {
        document.getElementById('tabla-materiales').innerHTML = '';
    }
});
// Función para mostrar los materiales asignados a una obra en una tabla
function mostrarMaterialesEnTabla(idObra) {
    const asignaciones = JSON.parse(localStorage.getItem('asignacionMaterialCabecera')) || [];
    const detalles = JSON.parse(localStorage.getItem('asignacionMaterialDetalle')) || [];
    const materiales = JSON.parse(localStorage.getItem('materiales')) || [];
    const movimientosCab = JSON.parse(localStorage.getItem('movimientoMaterialCabecera')) || [];
    const movimientosDet = JSON.parse(localStorage.getItem('movimientoMaterialDetalle')) || [];
    // Buscar asignaciones a esa obra
    const asignacionesObra = asignaciones.filter(a => a.idObra === idObra);
    // Extraer materiales asignados a esa obra
    const materialesAsignados = [];
    asignacionesObra.forEach(a => {
        const detallesAsig = detalles.filter(d => d.idAsignacion === a.idAsignacion);
        detallesAsig.forEach(d => {
            const mat = materiales.find(m => m.idMaterial === d.idMaterial);
            if (mat) {
                materialesAsignados.push({
                    idMaterial: d.idMaterial,
                    descripcion: mat.descripcion,
                    unidad: mat.unidad,
                    cantidadAsignada: d.cantidad
                });
            }
        });
    });
    materialesAsignados.forEach(m => {// Calcular cantidad usada (egresos a esa obra)
        const movimientos = movimientosCab.filter(mc => mc.tipoMovimiento === 'EGRESO' && mc.destinoObraId === idObra);
        let cantidadUsada = 0;
        movimientos.forEach(mc => {
            const detallesMov = movimientosDet.filter(md => md.idMovimiento === mc.idMovimiento && md.idMaterial === m.idMaterial);
            detallesMov.forEach(dm => {
                cantidadUsada += dm.cantidad;
            });
        });
        m.cantidadUsada = cantidadUsada;
        m.existenciaActual = m.cantidadAsignada - cantidadUsada;
    });
    // Mostrar en la tabla
    const cuerpo = document.getElementById('tabla-materiales');
    cuerpo.innerHTML = '';
    materialesAsignados.forEach(m => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${m.descripcion}</td>
            <td>${m.unidad}</td>
            <td>${m.cantidadAsignada}</td>
            <td>${m.cantidadUsada}</td>
            <td>${m.existenciaActual}</td>
        `;
        cuerpo.appendChild(fila);
    });
}