import { Routes, Route } from 'react-router-dom';
import TodosList from './pages/TodoList.jsx'
import TodoDetail from './pages/TodoDetail.jsx'
import TodoForm from './pages/TodoForm.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
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
