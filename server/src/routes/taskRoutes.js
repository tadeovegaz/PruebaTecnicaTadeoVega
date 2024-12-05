// Primero, requiero las dependencias necesarias
const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
} = require("../controllers/taskController"); // Importo la función 'addTask' del controlador para manejar la lógica de agregar tareas.

//Express Router
const router = express.Router();

//ruta para agregar una nueva tarea
router.post("/", addTask);

// Ruta para obtener todas las tareas
router.get("/", getTasks);

// Ruta para borrar una tareas
router.delete("/:taskId", deleteTask);

//Ruta para actualizar
router.put("/:taskId", updateTask); // Aquí usamos `router.put` en lugar de `app.put`

//Ruta para actualizar el estatus
router.put("/:taskId/Status", updateTaskStatus);

module.exports = router;
