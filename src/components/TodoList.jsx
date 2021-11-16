import * as React from "react";

import TodoItem from "./TodoItem";
import { useAppSelector } from "../store";
import DetailModal from "./DetailModal";

function TodoListItems() {
  const todos = useAppSelector((state) => state.todos);
  const showDetailModalvalue = useAppSelector((state) => state.showDetailModal);

  return (
    <>
      {todos?.map((todo, index) => (
        <>
          <TodoItem todo={todo} />
          {showDetailModalvalue && <DetailModal todo={todo} />}
        </>
      ))}
      {/* <AddModal /> */}
    </>
  );
}

export default TodoListItems;
