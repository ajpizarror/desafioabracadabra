const express = require("express");
const app = express();

// Servidor en puerto 3000.
const port = 3000;

// Carpeta 'public' pública
app.use(express.static("public"));

// Array de nombres a devolver en formato Json.
const nombres = [
  { nombre: "Usuario1" },
  { nombre: "Usuario2" },
  { nombre: "Usuario3" },
  { nombre: "Usuario4" },
  { nombre: "Usuario5" },
];

app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ nombres });
});

// Validación de usuarios.
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuario = req.params.usuario.toLowerCase();
  const usuarioValido = nombres.some(
    (nombre) => nombre.nombre.toLowerCase() === usuario
  );

  usuarioValido
    ? res.sendFile(__dirname + "/juego.html")
    : res.send('<img src="/assets/img/who.jpeg">');
});

// Ruta Conejo Abracadabra Voldemort y Conejito.
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = Math.floor(Math.random() * 4) + 1;
  const numero = Number(req.params.n);
  numero === n
    ? res.sendFile(__dirname + "/public/assets/img/conejito.jpg")
    : res.sendFile(__dirname + "/public/assets/img/voldemort.jpg");
});

// Ruta genérica.
app.get("*", (req, res) => {
  res.send("Esta página no existe.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});