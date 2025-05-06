import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTodo, createTodo, updateTodo } from '../api/todo';
import { toast } from 'react-toastify';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [todo, setTodo] = useState({ todo: '', completed: false });

  useEffect(() => {
    if (isEdit) {
      fetchTodo(id)
        .then(res => setTodo({ todo: res.data.todo, completed: res.data.completed }))
        .catch(() => toast.error("Failed to load todo"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTodo(id, todo);
        toast.success("Todo updated successfully");
      } else {
        await createTodo(todo);
        toast.success("Todo created successfully");
      }
      navigate('/');
    } catch {
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isEdit ? "✏️ Edit Todo" : "➕ Add New Todo"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={todo.todo}
                onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
                required
                placeholder="Enter todo title"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                id="completed"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="completed" className="text-gray-700">
                Mark as completed
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition font-semibold"
            >
              {isEdit ? "Update Todo" : "Create Todo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
