import { useEffect, useState } from 'react';
import { fetchTodos, deleteTodo } from '../api/todo';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TodosList = () => {
  const [todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await fetchTodos(limit, skip);
      setTodos(res.data.todos);
    } catch (error) {
      toast.error("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    try {
      await deleteTodo(id);
      toast.success("Todo deleted");
      loadTodos();
    } catch {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    loadTodos();
  }, [skip]);

  return (
    <div className="min-h-screen text-white py-10 px-4" style={{ backgroundColor: 'rgb(168 193 219)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" style={{color:"chocolate"}}>📋 Todos</h1>
          <Link
            to="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            ➕ Add Todo
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-300 py-10">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white text-gray-800 rounded-xl shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 font-semibold">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {todos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-gray-100">
                    <td className="p-4">{todo.todo}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          todo.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {todo.completed ? '✅ Done' : '❌ Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <Link to={`/todo/${todo.id}`} className="text-blue-600 hover:underline">
                        View
                      </Link>
                      <Link to={`/edit/${todo.id}`} className="text-green-600 hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            disabled={skip === 0}
            onClick={() => setSkip(skip - limit)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            ⬅️ Prev
          </button>
          <button
            onClick={() => setSkip(skip + limit)}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodosList;
