// Función para cargar los materiales en el select de traslado
function cargarMaterialesParaTraslado() {
    const materiales = JSON.parse(localStorage.getItem('materiales')) || [];
    const selectMaterial = document.getElementById('selectMaterial');

    selectMaterial.innerHTML = '<option value="" disabled selected style="color: #999;">Seleccione un material</option>';

    materiales.forEach(material => {
        const option = document.createElement('option');
        option.value = material.id_material;
        option.textContent = material.nombre_material;
        selectMaterial.appendChild(option);
    });
}

function cargarObrasParaTraslado() {
    const obras = JSON.parse(localStorage.getItem('obras')) || [];
    const selectOrigen = document.getElementById('selectObraOrigen');
    const selectDestino = document.getElementById('selectObraDestino');

    selectOrigen.innerHTML = '<option value="" disabled selected style="color: #999;">Seleccione obra origen</option>';
    selectDestino.innerHTML = '<option value="" disabled selected style="color: #999;">Seleccione obra destino</option>';


    obras.forEach(obra => {
        const option1 = document.createElement('option');
        option1.value = obra.id_obra;
        option1.textContent = obra.nombre_obra;
        selectOrigen.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = obra.id_obra;
        option2.textContent = obra.nombre_obra;
        selectDestino.appendChild(option2);
    });
}

document.getElementById('cantidadTraslado').addEventListener('input', function () {
    const cantidad = parseInt(this.value);
    
    // Si la cantidad es menor que 1, mostrar alerta
    if (cantidad < 1) {
        alertify.error("La cantidad debe ser un número positivo mayor que cero.");
        this.value = '';  // Limpiar el campo si es negativo
    }
});


// Función para realizar el traslado de materiales
document.getElementById('btnTrasladar').addEventListener('click', function() {
    const obraOrigen = document.getElementById('selectObraOrigen').value;
    const obraDestino = document.getElementById('selectObraDestino').value;
    const materialId = document.getElementById('selectMaterial').value;
    const cantidad = parseInt(document.getElementById('cantidadTraslado').value);
    const mensaje = document.getElementById('mensaje');

    mensaje.innerHTML = '';

    // Validación de cantidad negativa
    if (cantidad < 1) {
        alertify.error("La cantidad debe ser un número positivo mayor que cero.");
        return;  // Si es negativo, detén la ejecución
    }

    // Verifica que se haya completado correctamente el formulario
    if (!obraOrigen || !obraDestino || !materialId || !cantidad) {
        mensaje.innerHTML = '<div class="alert alert-warning">Complete todos los campos correctamente.</div>';
        return;
    }


    const inventarioOrigen = JSON.parse(localStorage.getItem('inventario_obra')) || [];
    const inventarioDestino = JSON.parse(localStorage.getItem('inventario_obra')) || [];
    const movimientos = JSON.parse(localStorage.getItem('movimiento_inventario_obra')) || [];

    const inventarioOrigenMaterial = inventarioOrigen.find(i => i.id_obra == obraOrigen && i.id_material == materialId);
    const inventarioDestinoMaterial = inventarioDestino.find(i => i.id_obra == obraDestino && i.id_material == materialId);

    if (!inventarioOrigenMaterial || inventarioOrigenMaterial.cantidad_asignada < cantidad) {
        document.getElementById('mensaje').innerHTML = '<div class="alert alert-danger">No hay suficiente material en la obra origen.</div>';
        return;
    }
    // Realizar el traslado
    inventarioOrigenMaterial.cantidad_asignada -= cantidad;
    if (!inventarioDestinoMaterial) {
        inventarioDestino.push({ id_obra: obraDestino, id_material: materialId, cantidad_asignada: cantidad });
    } else {
        inventarioDestinoMaterial.cantidad_asignada += cantidad;
    }

    // Registrar el movimiento
    movimientos.push({
        id_obra: obraOrigen,
        id_material: materialId,
        tipo_movimiento: 'TRANSFERENCIA',
        cantidad: cantidad,
        obra_destino: obraDestino
    });

    // Guardar los cambios en localStorage
    localStorage.setItem('inventario_obra', JSON.stringify([...inventarioOrigen, ...inventarioDestino]));
    localStorage.setItem('movimiento_inventario_obra', JSON.stringify(movimientos));

    // Mostrar mensaje de éxito
    document.getElementById('mensaje').innerHTML = '<div class="alert alert-success">Traslado realizado con éxito.</div>';

    // Limpiar los campos
    document.getElementById('selectObraOrigen').selectedIndex = 0;
    document.getElementById('selectObraDestino').selectedIndex = 0;
    document.getElementById('selectMaterial').selectedIndex = 0;

});

// Cargar las obras y materiales cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    cargarObrasParaTraslado();
    cargarMaterialesParaTraslado();
});