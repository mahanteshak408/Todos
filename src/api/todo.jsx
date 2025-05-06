import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyjson.com/todos',
});

export const fetchTodos = (limit = 10, skip = 0) => API.get(`?limit=${limit}&skip=${skip}`);
export const fetchTodo = (id) => API.get(`/${id}`);
export const createTodo = (todo) => API.post('/', todo);
export const updateTodo = (id, todo) => API.put(`/${id}`, todo);
export const deleteTodo = (id) => API.delete(`/${id}`);
