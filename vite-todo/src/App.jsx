import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
   const [selectedTask, setSelectedTask] = useState(null);

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/task");
      // console.log(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postData = async (e) => {
    e.preventDefault()
    if (formData.name) {
      try {
        await axios.post("http://localhost:3000/api/task", formData);
        getFetchData();
        setFormData({ name: "", completed: false });
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleTaskCompletion = (task) => {
    const updatedTasks = tasks.map((t) =>
      t === task ? { ...t, completed: !t.completed } : t
    );

    setTasks(updatedTasks);

    const updatedCompleted = !task.completed;
    const taskId = task._id;

    try {
      axios.patch(`http://localhost:3000/api/task/${taskId}`, {
        completed: updatedCompleted,
      });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const editClick = (task) => {
    setSelectedTask(task);
    setFormData({ name: task.name, completed: task.completed });
  };

  const updateData = async () => {
    if (selectedTask) {
      try {
        await axios.patch(
          `http://localhost:3000/api/task/${selectedTask._id}`,
          {
            name: formData.name,
          }
        );
        setSelectedTask(null);
        setFormData({ name: "", completed: false });
        getFetchData();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const deleteData = async (taskId) => {
    console.log(taskId);
      try {
         await axios.delete(
          `http://localhost:3000/api/task/${taskId}`, 
        );
        getFetchData();
      } catch (error) {
        console.error("Error updating task:", error);
      }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center m-5 p-2 bg-black text-white font-bold">
        My Todo List
      </h1>
      <div className="m-10 bg-gray-100 p-4 rounded-lg">
        <form className="flex justify-center space-x-4">
          <input
            placeholder="Enter Task Here"
            className="border border-zinc-700 py-2 px-4 text-2xl rounded-full"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <button
            onClick={postData}
            className="px-4 py-2 bg-black text-white font-bold rounded-full 
            transition duration-300 hover:bg-purple-500 transform hover:scale-105"
          >
            Add Task
          </button>
        </form>
      </div>
      <hr />
      <div className="bg-gray-200 w-2/3 mx-40 p-4 rounded-lg">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 mb-5"
            >
              <div className="flex items-center gap-5 mb-5 w-3/4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletion(task)}
                />
                <h4
                  className="text-2xl font-semibold"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.name}
                </h4>
              </div>
              {task === selectedTask ? (
                // Display the "Update" button for the selected task
                <button
                  onClick={updateData}
                  className="px-4 py-2 bg-black text-white font-bold rounded-full 
                transition duration-300 hover:bg-purple-500 transform hover:scale-105"
                >
                  Update
                </button>
              ) : (
                // Display the "Edit" button for other tasks
                <button
                  onClick={() => editClick(task)}
                  className="px-4 py-2 bg-black text-white font-bold rounded-full 
                transition duration-300 hover:bg-red-500 transform hover:scale-105"
                >
                  Edit
                </button>
              )} 
              <button
                onClick={() => deleteData(task._id)}
                className="px-4 py-2 bg-black text-white font-bold rounded-full 
                transition duration-300 hover:bg-red-500 transform hover:scale-105"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <h2>No task Available</h2>
        )}
      </div>
    </div>
  );
};

export default App;
