import React, { useState } from "react";
// addTask() taskService.js -> AddTaskForm.tsx
import { addTask } from "../services/taskService";

const AddTaskForm = ({ darkMode }) => {
  // Estado para manejar el nombre y la descripción de la tarea
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  // Enviando formulario()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del nombre de la tarea
    if (!taskName.trim()) {
      alert("Por favor, ingresa un nombre de tarea.");
      return;
    }

    try {
      // Llamar a addTask pasando nombre y descripción
      const newTask = await addTask(taskName, taskDescription);
      console.log("Tarea agregada:", newTask);
      //onSave(updatedTask); PENDIENTE
      // Limpiar los campos
      setTaskName("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className={`card w-75 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className={`form-control ${
                  darkMode ? "input-dark-custom" : "input-light-custom"
                }`}
                value={taskName}
                onChange={handleNameChange}
                placeholder="Escribe una nueva tarea"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${
                  darkMode ? "input-dark-custom" : "input-light-custom"
                }`}
                value={taskDescription}
                onChange={handleDescriptionChange}
                placeholder="Escribe la descripción de la tarea"
                aria-label="Escribe la descripción de la tarea"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className={`btn w-100 py-3 ${
                  darkMode ? "btn-light-purple text-white" : "btn-light-purple"
                }`}
              >
                Agregar tarea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
