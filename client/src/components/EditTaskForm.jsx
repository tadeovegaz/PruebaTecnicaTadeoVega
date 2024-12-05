import React, { useState, useEffect } from "react";
import { editTask } from "../services/taskService"; // Importa la función para editar

const EditTaskForm = ({ taskToEdit, onSave, darkMode }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Llenamos el formulario con los valores de la tarea cuando se pase la tarea a editar
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de los campos
    if (!taskName.trim()) {
      alert("Por favor, ingresa un nombre de tarea.");
      return;
    }

    try {
      // Llamar a la función editTask pasando la tarea actualizada
      const updatedTask = await editTask(
        taskToEdit.id,
        taskName,
        taskDescription
      );
      console.log("Tarea actualizada:", updatedTask);
      onSave(updatedTask); // Función para actualizar el estado en el componente principal Y obtener el resultado sin recargar
    } catch (error) {
      console.error("Error al editar tarea:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`card p-3 shadow-lg ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      <div className="mb-3">
        <input
          type="text"
          value={taskName}
          onChange={handleNameChange}
          placeholder="Edita el nombre de la tarea"
          className="form-control text-dark rounded-pill"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Edita la descripción de la tarea"
          className="form-control text-dark rounded-pill"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" className="btn btn-primary w-100 py-2">
          Actualizar tarea
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="pt-1"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
            </svg>
          </div>
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
