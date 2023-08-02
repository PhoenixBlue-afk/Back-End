import {Router} from 'express'
import  products from '../ProductsManager.js';

let rou = Router()


rou.get('/', (req, res) => {
    let {limit} = req.query;

    if (limit) {
        limit=parseInt(limit);
        res.send(products.slice(0,limit));
    }else{
        res.send(products)
    }

});

rou.get('/:code', (req, res) => {
  const idBuscado = parseInt(req.params.code); 
  const productoEncontrado = products.find((producto) => producto.code === idBuscado);

  if (productoEncontrado) {
    res.json(productoEncontrado);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

rou.post("/", (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    // status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }

    // if (!category) {
    //     res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
    //     return false;
    // }

    if (!thumbnails) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnails!"});
        return false;
    } else if ((!Array.isArray(thumbnails)) || (thumbnails.length == 0)) {
        res.status(400).send({status:"error", message:"Error! Debe ingresar al menos una imagen en el Array Thumbnails!"});
        return false;
    }

    if (products.addProduct({title, description, code, price, status, stock, category, thumbnails})) {
        res.send({status:"ok", message:"El Producto se agregó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo agregar el Producto!"});
    }
});

export default  rou;