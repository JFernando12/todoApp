import axios from 'axios';

const Axios = axios.create({ baseURL: 'http://localhost:3001/' });

export const getUsersApi = async () => {
  const users = await Axios.get(`users`);
  return users;
};

export const signinApi = async ({ email, password }) => {
  const response = {
    token: null,
    errors: null,
  };
  try {
    const { data } = await Axios.post('/users/signin', { email, password });
    response.token = data.token;
  } catch (error) {
    const errors = error.response;
    response.errors = errors.data;
  }

  return response;
};

export const getTasksApi = async () => {
  const token = localStorage.getItem('token');
  const { data } = await Axios.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const taskDoneApi = async (taskId, done) => {
  const response = {
    errors: null,
  };
  try {
    const token = localStorage.getItem('token');
    await Axios.put(
      `tasks/${taskId}`,
      { done: done ? false : true },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    const errors = error.response;
    response.errors = errors.data;
  }

  return response;
};

export const createTaskApi = async ({ name, description }) => {
  const response = {
    errors: null,
  };
  const token = localStorage.getItem('token');
  try {
    await Axios.post(
      '/tasks',
      { name, description },
      { headers: { Authorization: token } }
    );
  } catch (error) {
    const errors = error.response;
    response.errors = errors.data;
  }

  return response;
};

export const deleteTaskApi = async (taskId) => {
  const token = localStorage.getItem('token');
  await Axios.delete(`/tasks/${taskId}`, { headers: { Authorization: token } });
};
