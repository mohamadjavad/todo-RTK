import React from "react";
import { Button, Chip, Grid, Typography } from "@mui/material";

import { Check } from "@mui/icons-material";

import {
  useAppDispatch,
  toggle,
  editId,
  showEditModal,
  showDetailModal,
} from "../store";

const TodoItem = ({ todo, key, hide }) => {
  const dispatch = useAppDispatch();

  return (
    <Grid
      p={1}
      m={1}
      flexWrap="nowrap"
      justifyContent="space-between"
      container
      key={key}
      style={{
        border: "2px solid #777",
        borderRadius: "15px",

        margin: "0 auto",
      }}
    >
      <Grid
        onClick={() => {
          dispatch(showDetailModal(true));
          dispatch(editId(todo.id));
        }}
        item
        container
        direction="column"
        style={{
          cursor: "pointer",
          // width: "500px",
          overflowWrap: "break-word",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
        }}
      >
        <Grid item>
          <Typography variant="h6">{todo.text}</Typography>{" "}
        </Grid>
        <Grid item>
          <Typography variant="caption">{todo.description}</Typography>{" "}
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="flex-end"
        direction="column"
      >
        <Grid item container justifyContent="flex-end" alignItems="center">
          <Grid item mr={1}>
            <Typography variant="body1">ergency</Typography>
          </Grid>
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
        </Grid>
        {!hide && (
          <Grid
            mt={1}
            item
            container
            justifyContent="flex-end"
            spacing={2}
            direction="row"
            flexWrap="nowrap"
          >
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color={todo.done === true ? "success" : "secondary"}
                onClick={() => {
                  dispatch(toggle(todo.id));
                  dispatch(showDetailModal(false));
                }}
              >
                {todo.done === true ? "Well Done" : "Done Task"}
                {todo.done === true ? <Check /> : <> </>}
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(showEditModal(true));
                  dispatch(showDetailModal(false));
                  dispatch(editId(todo.id));
                }}
              >
                Edit Task
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TodoItem;
