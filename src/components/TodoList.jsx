import * as React from "react";

import AddModal from "./AddModal";
import TodoItem from "./TodoItem";
import {
  useAppSelector,
  useAppDispatch,
  update,
  remove,
  toggle,
} from "../store";
import DetailModal from "./DetailModal";

function TodoListItems() {
  const [editId, setEditId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const todos = useAppSelector((state) => state.todos);
  const showDetailModalvalue = useAppSelector((state) => state.showDetailModal);
  const dispatch = useAppDispatch();
  console.log(todos, "todosssssssssssss");
  return (
    <>
      {todos?.map((todo, index) => (
        <>
          <TodoItem todo={todo} setOpen={setOpen} setEditId={setEditId} />
          {showDetailModalvalue && <DetailModal todo={todo} />}
        </>
      ))}
      {/* <AddModal /> */}
    </>
  );
}

export default TodoListItems;
