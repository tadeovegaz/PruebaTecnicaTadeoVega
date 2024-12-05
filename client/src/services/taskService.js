// AGREGANDO UNA TAREA
export const addTask = async (taskName, taskDescription) => {
  try {
    // Petición FETCH
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST", // Agregando datos
      headers: {
        "Content-Type": "application/json",
      },
      // Cuerpo de la solicitud: Nombre y descripción de la tarea en JSON
      body: JSON.stringify({ name: taskName, description: taskDescription }),
    });

    // Si la respuesta no es exitosa
    if (!response.ok) {
      throw new Error("Error al agregar la tarea");
    }

    // Si la respuesta es exitosa
    const newTask = await response.json(); // Parseando
    console.log("Tarea actualizada:", newTask);

    return newTask;
  } catch (error) {
    //Console.log() en caso de error de la petición
    console.error("Error en taskService:", error);
    throw error;
  }
};

//VISUALIZANDO TAREAS
export const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:8080/tasks");

    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }

    const tasks = await response.json(); // Parseando la respuesta JSON
    return tasks; // devolviendo todas las tareas
  } catch (error) {
    console.error("Error en taskService:", error);
    throw error;
  }
};

//BORRANDO TAREA
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    const result = await response.json();
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
};

//EDITANDO TAREA
export const editTask = async (taskId, taskName, taskDescription) => {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "PUT", //Actualizamos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName, description: taskDescription }), //datos a actualizar
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    const updatedTask = await response.json();
    console.log("Tarea actualizada:", updatedTask);
    return updatedTask; // Devolver la tarea actualizada
  } catch (error) {
    console.error("Error al editar tarea:", error);
    throw error;
  }
};

//ACTUALIZANDO ESTADO DE TAREA
export const updateTaskStatus = async (taskId, completed) => {
  try {
    const response = await fetch(
      `http://localhost:8080/tasks/${taskId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }), // Enviar el nuevo estado
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el estado de la tarea");
    }

    const result = await response.json();
    console.log(result.message);
    return result;
  } catch (error) {
    console.error("Error al cambiar el estado de la tarea:", error);
    throw error;
  }
};
