import React, { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../services/taskService";
import EditTaskForm from "./EditTaskForm";
import { saveAs } from "file-saver"; //LIBRERIA EXPORTANDO JSON

//LISTA DE TAREAS
const ListTask = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Estado para EDITAR()
  const [filter, setFilter] = useState("all"); // Filtrando en base al estado de la tarea
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda

  // useEffect que se ejecuta cuando el componente se monta para obtener las tareas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        const tasksWithFormattedDate = tasksData.map((task) => {
          const formattedDate = new Date(
            task.createdAt._seconds * 1000
          ).toLocaleString(); //convirtiendo la fecha en milisegundos
          return { ...task, formattedDate }; //...uso de spread operator para las propiedades anteriores
        });
        setTasks(tasksWithFormattedDate);
        console.log(tasksData);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };

    fetchTasks(); // Llamamos a la función para obtener las tareas
  }, []);

  //ELIMINANDO CON ID
  const handleDelete = async (taskId) => {
    console.log("presionando eliminar tarea con ID:", taskId);
    try {
      await deleteTask(taskId); // Llamamos a deleteTask y pasamos taskId
      setTasks(tasks.filter((task) => task.id !== taskId)); // Eliminamos la tarea del estado
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };
  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleSave = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    ); // Actualiza la tarea en el estado
    setTaskToEdit(null); // Cierra el formulario de edición
  };

  const handleStatusChange = async (taskId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // cambia entre los dos estatus
      await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  // Filtrar las tareas según el estado seleccionado
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") {
        return task.completed === true;
      } else if (filter === "pending") {
        return task.completed === false;
      }
      return true; // 'all' muestra todas las tareas
    })
    .filter((task) => {
      // filtrando buscando el titulo
      return task.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Cambiar el filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  // Verificando la busqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Exportando JSON con package
  const exportToJson = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    saveAs(blob, "Tareas.json");
  };

  return (
    <div className="container">
      <h2 className="text-start mt-4">Lista de Tareas</h2>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control form-control-lg border-0 shadow-sm rounded-3 w-100"
          aria-label="Buscar tareas"
          placeholder="Buscar tareas por título..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="d-flex justify-content-start mb-3 gap-3">
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => handleFilterChange("all")}
        >
          Todas
        </button>
        <button
          className="btn btn-outline-success w-100"
          onClick={() => handleFilterChange("completed")}
        >
          Completadas
        </button>
        <button
          className="btn btn-outline-warning w-100"
          onClick={() => handleFilterChange("pending")}
        >
          Pendientes
        </button>
      </div>

      {/* Lista de  CRUD (ELIMINAR Y EDITAR) + INFORMACION tareas */}
      <ul className="list-group list-group-flush">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`row ${
              darkMode ? "bg-dark text-white" : "bg-white text-dark"
            }`}
          >
            <div>
              <strong>{task.name}</strong>
              <p className="mb-1">{task.description}</p>
              <p>Fecha de creación: {task.formattedDate}</p>
            </div>
            <div className="d-flex justify-content-start mb-3 gap-3">
              <button
                className="btn btn-outline-danger btn-sm mr-2"
                onClick={() => handleDelete(task.id)}
              >
                Eliminar
              </button>
              <button
                className="btn btn-outline-info btn-sm mr-2"
                onClick={() => handleEdit(task)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleStatusChange(task.id, task.completed)}
              >
                {task.completed
                  ? "Marcar como pendiente"
                  : "Marcar como completada"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario de edición de tarea */}
      {taskToEdit && (
        <EditTaskForm taskToEdit={taskToEdit} onSave={handleSave} />
      )}

      {/* Botón para exportar JSON */}
      <button
        className="btn btn-outline-success mt-4 w-100"
        onClick={exportToJson}
      >
        Exportar Tareas a JSON
      </button>
    </div>
  );
};

export default ListTask;
