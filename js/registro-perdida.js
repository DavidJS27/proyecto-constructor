document.addEventListener('DOMContentLoaded', function () {
    const obras = JSON.parse(localStorage.getItem('obras')) || [];
    const materiales = JSON.parse(localStorage.getItem('materiales')) || [];
    
    const selectObra = document.getElementById('selectObraPerdida');
    const selectMaterial = document.getElementById('selectMaterialPerdida');
    const cantidadPerdida = document.getElementById('cantidadPerdida');
    const mensaje = document.getElementById('mensaje'); // Área donde se muestra el mensaje de éxito

    // Cargar obras
    selectObra.innerHTML = '<option value=""> </option>';
    obras.forEach(o => {
        const opt = new Option(o.nombre, o.idObra);
        selectObra.appendChild(opt);
    });

    // Cargar materiales
    selectMaterial.innerHTML = '<option value=""></option>';
    materiales.forEach(m => {
        const opt = new Option(m.descripcion, m.idMaterial);
        selectMaterial.appendChild(opt);
    });

    // Validación para evitar números negativos
    cantidadPerdida.addEventListener('input', function () {
        if (parseInt(cantidadPerdida.value) < 0) {
            cantidadPerdida.value = ''; // Limpiar el campo si es negativo
            alertify.error('No puedes ingresar números negativos.');
        }
    });

    // Registrar la pérdida
    document.getElementById('btnRegistrarPerdida').addEventListener('click', function () {
        const obraId = parseInt(selectObra.value);
        const materialId = parseInt(selectMaterial.value);
        const cantidad = parseInt(cantidadPerdida.value);

        // Validación de campos vacíos o inválidos
        if (!obraId || !materialId || !cantidad || cantidad <= 0) {
            mensaje.innerHTML = '<div class="alert alert-warning">Por favor complete todos los campos correctamente.</div>';
            return;
        }

        // Verificar que haya suficiente material
        const inventario = JSON.parse(localStorage.getItem('inventario_obra')) || [];
        const materialEnObra = inventario.find(i => i.id_obra == obraId && i.id_material == materialId);

        if (!materialEnObra || materialEnObra.cantidad_asignada < cantidad) {
            mensaje.innerHTML = '<div class="alert alert-danger">No hay suficiente material en la obra para registrar la pérdida.</div>';
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            mensaje.innerHTML = '<div class="alert alert-warning">La cantidad debe ser mayor a cero.</div>';
            return;
        }

        // Descontar la cantidad
        materialEnObra.cantidad_asignada -= cantidad;

        // Guardar la pérdida en localStorage
        localStorage.setItem('inventario_obra', JSON.stringify(inventario));

        // Registrar el movimiento de pérdida
        const movimientos = JSON.parse(localStorage.getItem('movimientoMaterialCabecera')) || [];
        const detalles = JSON.parse(localStorage.getItem('movimientoMaterialDetalle')) || [];

        const nuevoMovimiento = {
            idMovimiento: movimientos.length + 1,
            fecha: new Date().toISOString().split('T')[0],
            tipoMovimiento: 'PERDIDA',
            origenObraId: obraId,
            destinoObraId: '',
            observaciones: 'Pérdida de material registrada',
            usuario: 1
        };
        movimientos.push(nuevoMovimiento);

        const nuevoDetalle = {
            idDetalle: detalles.length + 1,
            idMovimiento: nuevoMovimiento.idMovimiento,
            idMaterial: materialId,
            cantidad: cantidad
        };
        detalles.push(nuevoDetalle);

        // Guardar los movimientos en localStorage
        localStorage.setItem('movimientoMaterialCabecera', JSON.stringify(movimientos));
        localStorage.setItem('movimientoMaterialDetalle', JSON.stringify(detalles));

        // Mostrar mensaje de éxito en el área correcta
        mensaje.innerHTML = '<div class="alert alert-success">Pérdida registrada con éxito.</div>';

        // Limpiar los campos después de registrar
        selectObra.value = '';
        selectMaterial.value = '';
        cantidadPerdida.value = '';
    });
});