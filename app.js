var express = require("express");
var app = express();

const pug = require("pug");

app.use(express.static(__dirname+"/public"));

//Arreglo de objetos con los datos de los perros. También podemos usar una base de datos como MongoDB
var perros_array = [
  {raza:"Doberman",texto:"Perro de ataque",imagen:"doberman.jpg"},
  {raza:"Dachshund",texto:"Perro de caza",imagen:"dachshund.jpg"},
  {raza:"Pastor Alemán",texto:"Perro de pastoreo",imagen:"pastorAleman.jpg"},
  {raza:"Pug",texto:"Perro de compañía",imagen:"pug.jpg"},
  {raza:"San Bernardo",texto:"Perro de rescate",imagen:"sanbernardo.jpg"},
]

//Cuando tengamos la raíz, atrapamos y enviamos la caratula de los perros
app.get("/",(req,res)=>{
  //res.send("index.html");
  res.render("index.pug",{
    titulo: "Perros del mundo",
    texto: "Selecciona un perro",
    imagen: "perros.jpg",
    perros: perros_array
  });
});

//Atrapamos cuando el usuario solicite un perro
app.get("/perro/:raza",(req,res)=>{
  
  var datosPerro = perros_array.filter((perro)=>{
    if (req.params.raza==perro.raza) {
      return perro;
    }
  })[0];

  res.render("perro.pug",{
    raza: req.params.raza,
    data: datosPerro
  });
});

//Atrapamos cuando el usuario solicite una página que no existe
app.use((req, res) => {
  res.status(400); //En la respuesta, vamos a buscar todos los status que sean 400 (como el 404)

  var error = req.originalUrl; //Atrapamos la petición. Es Url, no URL (es case sensitive)

  res.render("404.pug", {texto:error});
});

app.listen(3000,()=>{
  console.log("Servidor en el puerto 3000");
});