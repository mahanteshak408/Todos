import { Routes, Route } from 'react-router-dom';
import TodosList from './pages/TodoList.jsx'
import TodoDetail from './pages/TodoDetail.jsx'
import TodoForm from './pages/TodoForm.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
  getTodos,
  removeTodoLocal,
  setSkip,
  getTodoLocal
} from './todosSlice.js';




export default function App() {


  const dispatch = useDispatch();
  const { todos, skip, limit, total, status } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos()).unwrap().catch(() => {
      toast.error("Failed to fetch todos.");
    });
  }, [skip]);
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
        <Route path="/add" element={<TodoForm />} />
        <Route path="/edit/:id" element={<TodoForm />} />
      </Routes>
    </div>
  );
}
