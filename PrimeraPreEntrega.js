import express from 'express'
import rou from './routes/productsRoutes.js';

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.use('api/products', rou)




app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});