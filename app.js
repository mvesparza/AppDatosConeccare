const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Sirve los archivos estáticos del frontend

app.post('/generar-pdf', async (req, res) => {
    const { diasVencimiento, precio, valorLetras, fecha, cuota, nombre, cedula, celular, accesorios, descripcion, direccion, dia, mes, anio, fechaInicio, diaCobranza, precioAuto, mensualidad, precioAccesorios, precioEntrega, descuento, iva, precioTotal, nombreFacturacion, cedulaFacturacion, direccionFacturacion, emailFacturacion, telefonoFacturacion} = req.body; // Campos agregados

    // Cargar y modificar el PDF
    const pdfBytes = fs.readFileSync('public/plantilla.pdf'); // Reemplaza 'plantilla.pdf' con la ruta a tu archivo PDF con campos vacíos
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const sumaAccesoriosEntrega = parseFloat(precioAccesorios) + parseFloat(precioEntrega);

    // Llenar los campos en el PDF
    form.getTextField('CampoVacío1').setText(diasVencimiento);
    form.getTextField('CampoVacío2').setText(precio);
    form.getTextField('CampoVacío3').setText(valorLetras);
    form.getTextField('CampoVacío4').setText(fecha);
    form.getTextField('CampoVacío5').setText(cuota);
    form.getTextField('CampoVacío6').setText(nombre);
    form.getTextField('CampoVacío7').setText(cedula);
    form.getTextField('CampoVacío8').setText(celular);
    form.getTextField('CampoVacío9').setText(accesorios);
    form.getTextField('CampoVacío10').setText(descripcion);
    form.getTextField('CampoVacío11').setText(direccion);
    form.getTextField('CampoVacío12').setText(dia);
    form.getTextField('CampoVacío13').setText(mes);
    form.getTextField('CampoVacío14').setText(anio);
    form.getTextField('CampoVacío15').setText(fechaInicio);
    form.getTextField('CampoVacío16').setText(diaCobranza);
    form.getTextField('CampoVacío17').setText(precioAuto);
    form.getTextField('CampoVacío18').setText(mensualidad);
    form.getTextField('CampoVacío19').setText(precioAccesorios); // Campo agregado
    form.getTextField('CampoVacío20').setText(precioEntrega); // Campo agregado
    form.getTextField('CampoVacío21').setText(descuento); // Campo agregado
    form.getTextField('CampoVacío22').setText(iva); // Campo agregado
    form.getTextField('CampoVacío23').setText(precioTotal); // Campo agregado
    form.getTextField('CampoVacío24').setText(sumaAccesoriosEntrega.toFixed(2));
    form.getTextField('CampoVacío25').setText(nombreFacturacion); // Campo agregado
    form.getTextField('CampoVacío26').setText(cedulaFacturacion); // Campo agregado
    form.getTextField('CampoVacío27').setText(direccionFacturacion); // Campo agregado
    form.getTextField('CampoVacío28').setText(emailFacturacion); // Campo agregado
    form.getTextField('CampoVacío29').setText(telefonoFacturacion); // Campo agregado

    form.flatten();

    const pdfBuffer = await pdfDoc.save();

    try {
        res.setHeader('Content-Disposition', 'attachment; filename=documento.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(Buffer.from(pdfBuffer.buffer));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

