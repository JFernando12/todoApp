import React, { useEffect, useState } from 'react';
import { deleteTaskApi, getTasksApi, taskDoneApi } from '../utils/api';
import CreateTask from '../components/CreateTask';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    const tasks = await getTasksApi();
    setTasks(tasks);
  };

  const taskDone = async (taskId, done) => {
    await taskDoneApi(taskId, done);
    getTasks();
  };

  const deleteTask = async (taskId) => {
    await deleteTaskApi(taskId);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <CreateTask setTasks={setTasks}></CreateTask>
      <div className="tasks-container">
        {tasks.map(({ id, name, description, done }) => {
          return (
            <tr key={id} className="task-container">
              <td>
                <button
                  className={done ? 'greenButton' : 'whiteButton'}
                  onClick={() => taskDone(id, done)}
                >
                  {done ? 'Done' : 'Pending'}
                </button>
              </td>
              <td className="task-name">{name}</td>
              <td className="task-description">{description}</td>
              <td>
                <button onClick={() => deleteTask(id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
