const crearPagina = (titulo, contenido) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo}</title>
</head>
<body>
    <h1>${titulo}</h1>
    ${contenido}
</body>
</html>
`;

const crearListaProductos = (productos) => `
<ul>
    ${productos.map(producto => `<li>${producto.nombre} - ${producto.precio}</li>`).join('')}
</ul>
`;

const crearDetalleProducto = (producto) => `
<p>Nombre: ${producto.nombre}</p>
<p>Descripción: ${producto.descripcion}</p>
<p>Precio: ${producto.precio}</p>
<p>Categoría: ${producto.categoria}</p>
`;

export default {
    crearPagina,
    crearListaProductos,
    crearDetalleProducto
};