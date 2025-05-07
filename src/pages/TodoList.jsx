import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getTodos,
  removeTodoLocal,
  setSkip,
} from '../todosSlice';

const TodosList = () => {
  const dispatch = useDispatch();
  const { todos, skip, limit, status } = useSelector((state) => state.todos);

  // Derived values
  const paginatedTodos = todos.slice(skip, skip + limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const maxPages = Math.ceil(todos.length / limit);

  // Only fetch from API once on initial load
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTodos());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    try {
      dispatch(removeTodoLocal(id));
      toast.success("Todo deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen text-white py-10 px-4 flex flex-col justify-between" style={{ backgroundColor: 'rgb(168 193 219)' }}>
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: "chocolate" }}>📋 Todos</h1>
          <Link
            to="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            ➕ Add Todo
          </Link>
        </div>

        {status === 'loading' ? (
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
                {paginatedTodos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-gray-100">
                    <td className="p-4">{todo.todo}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${todo.completed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {todo.completed ? '✅ Done' : '❌ Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <Link to={`/todo/${todo.id}`} className="text-blue-600 hover:underline">View</Link>
                      <Link to={`/edit/${todo.id}`} className="text-green-600 hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(todo.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            disabled={skip === 0}
            onClick={() => dispatch(setSkip(skip - limit))}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            ⬅️ Prev
          </button>
          <span className="text-gray-100 font-medium text-lg">
            Page {currentPage} of {maxPages}
          </span>
          <button
            disabled={currentPage === maxPages}
            onClick={() => dispatch(setSkip(skip + limit))}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-white opacity-70">
        © {new Date().getFullYear()} Todos CRUD App — Page {currentPage}/{maxPages} | {limit} items per page
      </footer>
    </div>
  );
};

export default TodosList;
