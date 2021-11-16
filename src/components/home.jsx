import React from "react";

import { Container, Grid, Button } from "@mui/material";
import {
  useAppSelector,
  useAppDispatch,
  update,
  addTodo,
  editId,
  showEditModal,
  showDetailModal,
} from "../store";

import AddModal from "./AddModal";
import TopBar from "./TopBar";
import TodoListItems from "./TodoList";

const App = () => {
  const editIdvalue = useAppSelector((state) => state.editId);
  const showEditModalValue = useAppSelector((state) => state.showEditModal);

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  // console.log(value);
  return (
    <>
      <Container fixed>
        <TopBar />
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                dispatch(showEditModal(true));
                dispatch(editId(0));
              }}
            >
              {todos?.length <= 0 ? "Create your first task 😀" : "Add Task"}
            </Button>
          </Grid>
          <AddModal />
          <TodoListItems />
        </Grid>
      </Container>
    </>
  );
};

export default App;
