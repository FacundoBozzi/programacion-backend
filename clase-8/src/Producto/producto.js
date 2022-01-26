const {Router} = require('express');
const router = Router();

const productos = require('../productos.json');
const _ = require('underscore');

router.get("/", function (req, res) {
    res.json(productos);
  });

router.get("/:id", function (req, res) {
  const {id} = req.params;
  _.each(productos,(producto,i)=>{
    if(producto.id == id){
      res.json(producto);
    }
  })

    res.status(404).json({ error : 'producto no encontrado' }
    );
 
});  

router.post("/", function (req, res) {
    const {titulo,precio,miniatura} = req.body;
    if(titulo && precio && miniatura){
      let id = productos.length+1;
      let newProducto = {id,...req.body};
      productos.push(newProducto);
      res.json({response:'Se guardo el producto correctamente'});
    }
    else{
      console.log(req.body);
      res.status(400).json('No se guardo el producto, datos invalidos');
    }
}); 

router.put("/:id", function (req, res) {
    const {id} = req.params;
    const {titulo,precio,miniatura} = req.body;

    if(titulo && precio && miniatura){
      _.each(productos,(producto,i)=>{
        if(producto.id == id){
          producto.id = id;
          producto.titulo = titulo;
          producto.precio = precio;
          producto.miniatura = miniatura;
          res.json(producto); 
        }
      })
      res.status(404).json({ error : 'producto no encontrado' });
    }
});

router.delete("/:id", function (req, res) {
    const {id} = req.params;
    _.each(productos,(producto,i)=>{
      if(producto.id == id){
        productos.splice(i,1);
        res.json({response:'Se borro el producto'})
      }
    })
    res.status(404).json({ error : 'producto no encontrado' });
});  

module.exports = router;




