import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch todos from an API only once at startup
export const getTodos = createAsyncThunk('todos/getTodos', async (_, thunkAPI) => {
  try {
    const res = await axios.get('https://dummyjson.com/todos?limit=50');
    return res.data.todos;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],      // source of truth
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    skip: 0,
    limit: 10,
  },
  reducers: {
    addTodoLocal: (state, action) => {
      state.todos.unshift(action.payload);
    },
    updateTodoLocal: (state, action) => {
      const index = state.todos.findIndex(todo => String(todo.id) === String(action.payload.id));
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };
      }
    },
    removeTodoLocal: (state, action) => {
      state.todos = state.todos.filter(todo => String(todo.id) !== String(action.payload));
    },
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  addTodoLocal,
  updateTodoLocal,
  removeTodoLocal,
  setSkip,
  getTodoLocal
} = todosSlice.actions;

export default todosSlice.reducer;
