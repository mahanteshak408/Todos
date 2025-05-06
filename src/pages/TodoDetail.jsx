import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTodo } from '../api/todo';
import { toast } from 'react-toastify';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await fetchTodo(id);
        setTodo(res.data);
      } catch {
        toast.error("Failed to load todo");
      }
    };
    getTodo();
  }, [id]);

  if (!todo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📝 Todo Detail</h1>

          <div className="mb-4">
            <p className="text-lg text-gray-700 mb-1"><strong>Title:</strong></p>
            <p className="text-xl text-gray-900 font-medium">{todo.todo}</p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-1"><strong>Status:</strong></p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                todo.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {todo.completed ? '✅ Completed' : '❌ Pending'}
            </span>
          </div>

          <Link
            to="/"
            className="inline-block text-blue-600 hover:text-blue-800 transition font-medium"
          >
            ← Back to Todos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
