import * as React from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Typography,
} from "@mui/material";

import { useAppSelector, useAppDispatch, update, addTodo } from "../store";

const AddModal = ({ open, setOpen }) => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
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
                return (
                  <Grid
                    p={1}
                    m={1}
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    container
                    key={todo.id}
                    style={{
                      border: "2px solid #444",
                      borderRadius: "15px",
                      flexGrow: "1",
                    }}
                  >
                    <Grid
                      item
                      container
                      direction="column"
                      style={{
                        width: "900px",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                        wordBreak: "break-word",
                      }}
                    >
                      <Grid item>
                        <Typography variant="body1">{todo.text}</Typography>{" "}
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          {todo.description}
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="flex-end"
                      direction="column"
                    >
                      <Grid item>
                        <Chip
                          label={
                            todo.ergency === "low"
                              ? "low"
                              : todo.ergency === "medium"
                              ? "medium"
                              : "high"
                          }
                          color={
                            todo.ergency === "low"
                              ? "success"
                              : todo.ergency === "medium"
                              ? "warning"
                              : "error"
                          }
                          variant="filled"
                        />
                      </Grid>
                      <Grid
                        mt={1}
                        item
                        container
                        justifyContent="flex-end"
                        spacing={2}
                        direction="row"
                        flexWrap="nowrap"
                      ></Grid>
                    </Grid>
                  </Grid>
                );
            })}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddModal;
