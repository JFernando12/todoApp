import React, { useEffect, useState } from 'react';
import { getTasksApi, taskDoneApi } from '../utils/api';

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

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div className="tasks-container">
        {tasks.map(({ id, name, description, done }) => {
          return (
            <div key={id} className="task-container">
              <div className="task-name">{name}</div>
              <div className="task-description">{description}</div>
              <button
                className={done ? 'greenButton' : 'whiteButton'}
                onClick={() => taskDone(id, done)}
              >
                done
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
