import ApiCreator from './api';
import { baseUrl, url } from '../constants';

const api = ApiCreator(baseUrl);

export const getTasks = () => api.get(url);

export const postTasks = (opt) => api.post('tasks', {
  body: JSON.stringify(opt),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const deleteTasks = (id) => api.delete(`tasks/${id}`);

// export const updateTodo = (todo) => api.put(`todos/${todo.id}`, {
//   body: JSON.stringify(todo),
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });
