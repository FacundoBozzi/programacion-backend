const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api/productos',require('./Producto/producto'));

var router = express.Router();

router.get("/api", function (req, res) {
  res.send("Hello World!");
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
})

console.log(__dirname + '/public/index.html');

const storage = multer.diskStorage({
  destination:function (req, file,cb){
    cb(null,'uploads')
  },
  filename:function (req,file,cb){
    cb(null,file.fieldname + '-' + Date.now())}
})

app.use(router);
let port = 8080;

app.listen(port, function () {
console.log(`Node server listening on ${port}`);
}).on('error',function (err) {});


