// Conexión con la base de datos (Firestore).
const { db } = require("../firebase");

// Funcion agregando una nueva tarea
const addTask = async (req, res) => {
  // Solicitud React service (req.body)
  const { name, description } = req.body;

  // En caso de enviar el input vacio, SOLO ES NECESARIO EL NOMBRE
  if (!name) {
    return res
      .status(400)
      .json({ error: "El nombre de la tarea es obligatorio." });
  }

  try {
    // Si se envia correctamente, se busca la colección "tasks" de Firestore.
    const newTaskRef = await db.collection("tasks").add({
      name: name, // GUARDANDO EL NOMBRE
      description: description, // GUARDANDO LA DESCRIPCIÓN
      createdAt: new Date(), //Saber la fecha de la tarea creada
    });

    // Documento recien creado
    const newTask = await newTaskRef.get();

    // Regresando el documento recien creado
    res.status(201).json({
      id: newTask.id, //ID_FIREBASE
      name: newTask.data().name, //NOMBRE
      description: newTask.data().description, // DESCRIPCIÓN
      createdAt: newTask.data().createdAt, //FECHA
    });
  } catch (error) {
    //Si ocurre un error
    console.error("Error al agregar tarea: ", error);
    res.status(500).json({ error: "Hubo un error al agregar la tarea." });
  }
};

// Función para obtener todas las tareas desde Firebase
const getTasks = async (req, res) => {
  try {
    // Obtengo todas las tareas desde la colección 'tasks'
    const tasksSnapshot = await db.collection("tasks").get();

    // Creo un array con los datos de las tareas
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id, // ID del documento
      ...doc.data(), // Datos del documento
    }));

    // Respondo con las tareas en formato JSON
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Hubo un error al obtener las tareas." });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params; // Obtener el taskId desde la URL
  console.log("Task ID recibido:", taskId); // Verifica si el taskId está llegando correctamente

  try {
    // Elimina la tarea en Firestore usando el taskId
    await db.collection("tasks").doc(taskId).delete();
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Hubo un error al eliminar la tarea" });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { name, description } = req.body; // Obtenemos los nuevos valores para la tarea

  try {
    const taskRef = db.collection("tasks").doc(taskId);
    await taskRef.update({ name, description }); // Actualizamos los datos de la tarea
    res.status(200).json({ id: taskId, name, description }); // Respondemos con la tarea actualizada
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ error: "Hubo un error al actualizar la tarea" });
  }
};

const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params; //Obteniendo parametros desde la url
  const { completed } = req.body;

  try {
    const taskRef = db.collection("tasks").doc(taskId); // Referencia de la tarea
    const task = await taskRef.get();

    if (!task.exists) {
      // Si la tarea no existe
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Actualizar el campo 'completed'
    await taskRef.update({ completed });

    res
      .status(200)
      .json({ message: "Estado de la tarea actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado de la tarea:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al actualizar el estado de la tarea" });
  }
};
module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  updateTaskStatus,
};
