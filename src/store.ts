import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  PayloadAction,
  configureStore,
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  description: string;
  kpi: string;
  ergency: string;
  done: boolean;
}

const updateTodo = (
  todos: Todo[],
  id: number,
  text: string,
  description: string,
  kpi: string,
  ergency: string
): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
    description: todo.id === id ? description : todo.description,
    kpi: todo.id === id ? kpi : todo.kpi,
    ergency: todo.id === id ? ergency : todo.ergency,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodoToList = (
  todos: Todo[],
  text: string,
  description: string,
  kpi: string,
  ergency: string
): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    description,
    kpi,
    ergency,
    done: false,
  },
];

// Redux toolkit implementation
interface State {
  todos: Todo[];
  newTodo: string;
  editId: number;
  showEditModal: boolean;
  showDetailModal: boolean;
}
const initialState: State = {
  todos: [],
  newTodo: "",
  editId: 0,
  showEditModal: false,
  showDetailModal: false,
};

export const addTodo = createAction<{
  text: string;
  description: string;
  kpi: string;
  ergency: string;
  done: boolean;
}>("addTodo");
export const setNewTodo = createAction<string>("setNewTodo");
export const update = createAction<{
  id: number;
  text: string;
  description: string;
  kpi: string;
  ergency: string;
  done: boolean;
}>("update");
export const toggle = createAction<number>("toggle");
export const showEditModal = createAction<boolean>("showEditModal");
export const showDetailModal = createAction<boolean>("showDetailModal");
export const editId = createAction<number>("editId");
export const remove = createAction<number>("remove");

export const load = createAsyncThunk("load", async (url: string) => {
  const response = await fetch(url);
  return await response.json();
});

const reducer = createReducer(initialState, (builder) => {
  builder
    // .addCase(load.fulfilled, (state, action: PayloadAction<Todo[]>) => {
    //   state.todos = action.payload;
    // })
    .addCase(showEditModal, (state, action) => {
      state.showEditModal = action.payload;
    })
    .addCase(showDetailModal, (state, action) => {
      state.showDetailModal = action.payload;
    })
    .addCase(editId, (state, action) => {
      state.editId = action.payload;
    })
    .addCase(setNewTodo, (state, action) => {
      state.newTodo = action.payload;
    })
    .addCase(addTodo, (state, action) => {
      state.todos = addTodoToList(
        state.todos,
        action.payload.text,
        action.payload.description,
        action.payload.kpi,
        action.payload.ergency
      );
    })
    .addCase(update, (state, action) => {
      state.todos = updateTodo(
        state.todos,
        action.payload.id,
        action.payload.text,
        action.payload.description,
        action.payload.kpi,
        action.payload.ergency
      );
    })
    .addCase(remove, (state, action) => {
      state.todos = removeTodo(state.todos, action.payload);
    })
    .addCase(toggle, (state, action) => {
      state.todos = toggleTodo(state.todos, action.payload);
    });
});

const store = configureStore({
  reducer,
  devTools: true,
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default store;
