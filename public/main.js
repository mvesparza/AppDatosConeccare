document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
});

document.getElementById('precio').addEventListener('input', () => {
    const precio = document.getElementById('precio').value;
    document.getElementById('precioAuto').value = precio;
});

document.getElementById('cuota').addEventListener('input', () => {
    const cuota = document.getElementById('cuota').value;
    document.getElementById('mensualidad').value = cuota;
});

document.getElementById('descargarPdf').addEventListener('click', async () => {
    const diasVencimiento = document.getElementById('diasVencimiento').value;
    const precio = document.getElementById('precio').value;
    const valorLetras = document.getElementById('valorLetras').value;
    const fecha = document.getElementById('fecha').value;
    const cuota = document.getElementById('cuota').value;
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const celular = document.getElementById('celular').value;
    const accesorios = document.getElementById('accesorios').value;
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const anio = document.getElementById('anio').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const diaCobranza = document.getElementById('diaCobranza').value;
    const precioAuto = document.getElementById('precioAuto').value;
    const mensualidad = document.getElementById('mensualidad').value;
    const precioAccesorios = document.getElementById('precioAccesorios').value;
    const precioEntrega = document.getElementById('precioEntrega').value;
    const descuento = document.getElementById('descuento').value;
    const iva = document.getElementById('iva').value;
    const precioTotal = document.getElementById('precioTotal').value;
    const nombreFacturacion = document.getElementById('nombreFacturacion').value; // Campo agregado
    const cedulaFacturacion = document.getElementById('cedulaFacturacion').value; // Campo agregado
    const direccionFacturacion = document.getElementById('direccionFacturacion').value; // Campo agregado
    const emailFacturacion = document.getElementById('emailFacturacion').value; // Campo agregado
    const telefonoFacturacion = document.getElementById('telefonoFacturacion').value; // Campo agregado

    const response = await fetch('/generar-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diasVencimiento, precio, valorLetras, fecha, cuota, nombre, cedula, celular, accesorios, descripcion, direccion, dia, mes, anio, fechaInicio, diaCobranza, precioAuto, mensualidad, precioAccesorios, precioEntrega, descuento, iva, precioTotal, nombreFacturacion, cedulaFacturacion, direccionFacturacion, emailFacturacion, telefonoFacturacion }), // Campos agregados
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'documento.pdf';
        link.click();
        URL.revokeObjectURL(url);
    } else {
        alert('Error al generar y descargar el PDF');
    }
});

const diasVencimientoInput = document.getElementById('diasVencimiento');
const fechaInicioInput = document.getElementById('fechaInicio');
const diaCobranzaInput = document.getElementById('diaCobranza');

function calcularDiaCobranza() {
    const diasVencimiento = parseInt(diasVencimientoInput.value, 10);
    const fechaInicio = new Date(fechaInicioInput.value);

    if (!isNaN(diasVencimiento) && fechaInicio instanceof Date && !isNaN(fechaInicio)) {
        fechaInicio.setDate(fechaInicio.getDate() + diasVencimiento);
        diaCobranzaInput.valueAsDate = fechaInicio;
    } else {
        diaCobranzaInput.value = '';
    }
}

diasVencimientoInput.addEventListener('change', calcularDiaCobranza);
fechaInicioInput.addEventListener('change', calcularDiaCobranza);

document.getElementById('calcularValores').addEventListener('click', () => {
    const mensualidad = parseFloat(document.getElementById('mensualidad').value);
    const precioAccesorios = parseFloat(document.getElementById('precioAccesorios').value);
    const precioEntrega = parseFloat(document.getElementById('precioEntrega').value);
    const descuento = parseFloat(document.getElementById('descuento').value);

    if (!isNaN(mensualidad) && !isNaN(precioAccesorios) && !isNaN(precioEntrega) && !isNaN(descuento)) {
        const subtotalSinDescuento = mensualidad + precioAccesorios + precioEntrega;
        const descuentoCalculado = subtotalSinDescuento * (descuento / 100);
        const subtotal = subtotalSinDescuento - descuentoCalculado;
        
        // Calcular IVA y Precio Total
        const iva = subtotal * 0.12;
        const precioTotal = subtotal + iva;

        // Mostrar valores en los campos
        document.getElementById('subtotal').value = subtotal.toFixed(2);
        document.getElementById('iva').value = iva.toFixed(2);
        document.getElementById('precioTotal').value = precioTotal.toFixed(2);
    } else {
        alert('Por favor, ingrese valores válidos en los campos Mensualidad, Precio Accesorios, Precio Entrega y Descuento.');
    }
});