import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    isLoading: false,
    updateId: -1,
  },
  reducers: {
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload];
    },
    updateTodo(state, action) {
      state.updateId = action.payload;
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    initialTodo(state, action) {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, initialTodo, updateTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
