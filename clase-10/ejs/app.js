const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

let productos = require('./productos.json');

app.set('port', process.env.port || 8080) 
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/mostrar-productos', (req, res, next) =>{
    res.render('listado-productos', {productos});  
})

app.get('/', (req, res, next) => {
    res.render('partials/navegacion');
});
app.get('/cargar-productos', (req, res, next) => {
    res.render('cargar-productos');
})

app.post('/cargar-productos', (req, res, next) => {
    nombre = req.body.nombreProducto;
    precio = req.body.precioProducto;
    fotoURL = req.body.imageProducto;

    productos.push({
        nombre,
        precio,
        fotoURL
    });
    res.redirect('/mostrar-productos');
});

app.listen(app.get('port'), server =>{
    console.log(`Servidor escuchando, puerto ${app.get('port')}`)
})

