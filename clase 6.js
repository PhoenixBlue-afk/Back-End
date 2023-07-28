const express = require('express');
const  {products} = require('./clase 4');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(products);
});

app.get('/products', (req, res) => {
  const limite = parseInt(req.query.limite) || products.length;
  const productosLimitados = products.slice(0, limite);
  res.json(productosLimitados);
});

app.get('/products/:code', (req, res) => {
  const idBuscado = parseInt(req.params.code); 
  const productoEncontrado = products.find((producto) => producto.code === idBuscado);

  if (productoEncontrado) {
    res.json(productoEncontrado);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
