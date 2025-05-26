// Obtener la fecha actual en formato YYYY-MM-DD
const hoy = new Date().toISOString().split("T")[0];
// Establecer el valor máximo para la fecha, no permite fecha futura
document.getElementById("fecha").max = hoy;
// Establecer la fecha actual como valor por defecto
document.getElementById("fecha").value = hoy;

let contadorItem = 1;

//Al perder el foco el campo RUC, para buscar al proveedor
document.getElementById("ruc").addEventListener("blur", function () {
    var rucIngresado = this.value.trim();
    if (rucIngresado === "") return; // no hace nada si está vacío

    var proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];
    var proveedor = proveedores.find(p => p.ruc === rucIngresado);

    if (proveedor) {
        // Guardamos el id del proveedor en el localStorage
        localStorage.setItem("idProveedor", JSON.stringify(proveedor.idproveedor));

        document.getElementById("proveedor").value = proveedor.razonsocial;
        document.getElementById("condicion").focus();
    } else {
        alertify.error("RUC no encontrado en la lista de proveedores");
        document.getElementById("proveedor").value = "";
        document.getElementById("ruc").focus();
    }
});

//Funciones para validar RUC y N° FACTURA
function soloNumerosYGuiones(event) {
    // Permitir solo números (0-9) y guiones (-)
    const char = String.fromCharCode(event.which || event.keyCode);
    if (!/[\d-]/.test(char)) {
        event.preventDefault();
    }
}

function validarPegado(event) {
    const textoPegado = (event.clipboardData || window.clipboardData).getData("text");
    if (!/^[\d-]+$/.test(textoPegado)) {
        event.preventDefault();
        //alertify.error("Solo se permiten números y guiones");
    }
}

function limpiarCaracteresInvalidos(event) {
    const valorOriginal = event.target.value;
    const valorFiltrado = valorOriginal.replace(/[^\d-]/g, "");
    if (valorOriginal !== valorFiltrado) {
        event.target.value = valorFiltrado;
        //alertify.warning("Se han eliminado caracteres inválidos");
    }
}

// Aplica a ambos campos
["ruc", "numfactura"].forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener("keypress", soloNumerosYGuiones);
    campo.addEventListener("paste", validarPegado);
    campo.addEventListener("input", limpiarCaracteresInvalidos);
});

//Al perder el foco el campo COD. BARRA, para buscar el articulo
document.getElementById("codbarra").addEventListener("blur", function () {
    var codIngresado = this.value.trim();
    if (codIngresado === "") return; // no hace nada si está vacío

    const materiales = JSON.parse(localStorage.getItem("materiales")) || [];
    const material = materiales.find(m => m.codbarra === codIngresado);

    if (material) {
        document.getElementById("descripcion").value = material.descripcion;
        document.getElementById("preuni").value = material.precio.toLocaleString("es-PY");
        document.getElementById("idarticulo").value = material.idMaterial;
        // if (material.tiva === 0){
        //     tiva = "EXENTA";
        // }else if (material.tiva === 5){
        //     tiva = "I.V.A. 5%";
        // }else if (material.tiva === 10){
        //     tiva = "I.V.A. 10%";
        // }
        // document.getElementById("iva").value = tiva;
        calcularSubtotal();
        document.getElementById("cantidad").focus();
    } else {
        alertify.error("Cód. Barra no encontrado en la lista de artículos");
        document.getElementById("descripcion").value = "";
        document.getElementById("codbarra").focus();
    }
});

//Calcular SUBTOTAL
function calcularSubtotal() {
    const cantidad = parseFloat(document.getElementById("cantidad").value.replace(/\./g, "")) || 0;
    const preuni = parseFloat(document.getElementById("preuni").value.replace(/\./g, "")) || 0;
    const subtotal = cantidad * preuni;

    // Formatear con separador de miles
    const subtotalFormateado = subtotal.toLocaleString("es-PY");
    document.getElementById("subtotal").value = subtotalFormateado;
}

// Escuchar cambios en cantidad y precio unitario
document.getElementById("cantidad").addEventListener("input", calcularSubtotal);
document.getElementById("preuni").addEventListener("input", calcularSubtotal);

//PRE. UNI. Al recibir el foco desaparecen los puntos, al perder el foco se visualizan los puntos
// Función para eliminar los puntos (separadores) cuando el campo tiene el foco
function quitarSeparadores() {
    let preuni = document.getElementById("preuni");
    preuni.value = preuni.value.replace(/\./g, ""); // quita los puntos
}

// Función para agregar los puntos (separadores) cuando el campo pierde el foco
function agregarSeparadores() {
    let preuni = document.getElementById("preuni");
    let valor = preuni.value.replace(/\D/g, ""); // quita puntos y no números
    if (valor !== "") {
        preuni.value = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

// Event listeners
document.getElementById("preuni").addEventListener("focus", quitarSeparadores);
document.getElementById("preuni").addEventListener("blur", agregarSeparadores);

// Evento para el botón "+"
document.getElementById("btnAgregarArticulo").addEventListener("click", function () {
    const codbarra = document.getElementById("codbarra").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const preuni = document.getElementById("preuni").value.trim();
    const subtotal = document.getElementById("subtotal").value.trim();
    const idarticulo = document.getElementById("idarticulo").value.trim();
    const iva = document.getElementById("iva").value.trim();

    if (!codbarra || !descripcion || !cantidad || !preuni || !subtotal) {
        alertify.error("Complete todos los campos del artículo antes de agregar.");
        return;
    }

    const tabla = $('#tablaArticulos').DataTable();
    const botonQuitar = `<button class="btn btn-danger btn-sm quitar-fila" title="Quitar fila"><i class="bi bi-x-circle"></i></button>`;

    tabla.row.add([
        contadorItem++,
        codbarra,
        descripcion,
        iva,
        cantidad,
        preuni,
        subtotal,
        botonQuitar,
        idarticulo
    ]).draw(false);
    
    calcularTotalFactura();
    listaArticulos();
    // Limpiar los campos del artículo
    document.getElementById("codbarra").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("iva").value = "";
    document.getElementById("cantidad").value = 1;
    document.getElementById("preuni").value = "";
    document.getElementById("subtotal").value = "";
    document.getElementById("idarticulo").value = "";
    document.getElementById("codbarra").focus();
});

// Generamos de forma automática el numero de factura para los clientes.
// function generarNumeroFactura() {
//     const PREFIJO = "001-001-";
//     const CLAVE_LOCALSTORAGE = "comprascabecera";

//     // Obtener arreglo de compras anteriores del localStorage
//     const compraCabecera = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE)) || [];

//     // Si no hay ninguna compra aún
//     if (compraCabecera.length === 0) {
//         return PREFIJO + "0000001";
//     }

//     // Extraer solo la parte numérica del campo numfactura, convertir a número
//     const numeros = compraCabecera.map(item => {
//         const partes = item.numfactura.split("-");
//         return parseInt(partes[2], 10); // "0000012" -> 12
//     });

//     // Encontrar el máximo y sumar 1
//     const maxNumero = Math.max(...numeros);
//     const nuevoNumero = (maxNumero + 1).toString().padStart(7, '0');

//     // Construir la nueva factura
//     return PREFIJO + nuevoNumero;
// }

function calcularTotalFactura() {
    const tabla = $('#tablaArticulos').DataTable();
    let total = 0;

    tabla.rows().every(function () {
        const data = this.data();

        if (data && data[6]) {
            // Eliminar símbolos no numéricos: Gs., puntos, espacios, etc.
            const valorLimpio = data[6].toString().replace(/[^\d,-]/g, '').replace(',', '.');

            const subtotal = parseFloat(valorLimpio) || 0;
            total += subtotal;
        }
    });

    // Mostrar total en formato "Gs. 120.000"
    const totalFormateado = 'Gs. ' + total.toLocaleString('es-PY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    document.getElementById("totalFactura").textContent = totalFormateado;
}

function listaArticulos() {
    const tabla = $('#tablaArticulos').DataTable();
    listaArticulos = [];

    tabla.rows().every(function() {
        const data = this.data();

        if(data) {
            listaArticulos.push(
                {
                    item: data[0],
                    idmaterial: parseInt(data[8]),    // columna oculta  
                    cantidad: parseFloat(data[4]),
                    preuni: parseFloat(data[5]),
                    iva: parseInt(data[3]),             // 0, 5 o 10
                    subtotal: parseFloat(data[6])     
                }
            )
        }
    })

    localStorage.setItem('listaArticulos', JSON.stringify(listaArticulos));
}
