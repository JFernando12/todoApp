import React, { useState } from 'react';
import { createTaskApi, getTasksApi } from '../utils/api';

const CreateTask = ({ setTasks }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const getTasks = async () => {
    const tasks = await getTasksApi();
    setTasks(tasks);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createTaskApi({ name, description });
    setName('');
    setDescription('');
    await getTasks();
  };

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const field = e.target.name;

    if (field === 'name') setName(value);
    if (field === 'description') setDescription(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" type="text" value={name} onChange={onChange} />
        </div>
        <div>
          <label>Description:</label>
          <input
            name="description"
            type="text"
            value={description}
            onChange={onChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;
