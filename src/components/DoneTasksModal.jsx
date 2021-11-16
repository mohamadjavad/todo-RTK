import * as React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { useAppSelector } from "../store";
import TodoItem from "./TodoItem";

const AddModal = ({ open, setOpen }) => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <>
      <div>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>Done Task List</DialogTitle>
          <DialogContent>
            {todos.map((todo) => {
              if (todo.done === true)
                return <TodoItem todo={todo} hide={true} />;
            })}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddModal;
