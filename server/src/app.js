//Dependencias necesarias
const express = require("express");
const morgan = require("morgan");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");

const app = express();

//conectando con mi react local (FRONT)
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
// registrar las peticiones HTTP que llegan al servidor local
app.use(morgan("dev"));
// procesar peticiones HTTP en json y parsear
app.use(express.json());

// Definiendo rutas
app.use("/tasks", taskRoutes); // "/tasks" a taskRoutes para el manejo de CRUD

module.exports = app;
