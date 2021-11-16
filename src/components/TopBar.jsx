import * as React from "react";
import { TodoContext } from "../store";
import DoneTasksModal from "./DoneTasksModal";
import {
  useAppSelector,
  useAppDispatch,
  update,
  remove,
  toggle,
} from "../store";

import { Typography, Grid, Button } from "@mui/material";

function TopBar() {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const [showDoneModal, setShowDoneModal] = React.useState(false);
  let doneList = todos?.filter((item) => item.done === true);
  return (
    <>
      <Grid
        container
        justifyContent={doneList?.length > 0 ? "space-between" : "center"}
        alignItems="center"
      >
        <Grid item>
          {doneList?.length > 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={(e) => setShowDoneModal(!showDoneModal)}
            >
              View Done Tasks
            </Button>
          )}
        </Grid>
        <Grid item justifySelf="center">
          <Typography variant="h3" color="text.primary">
            Hello world
          </Typography>
        </Grid>
      </Grid>
      {showDoneModal && (
        <DoneTasksModal open={showDoneModal} setOpen={setShowDoneModal} />
      )}
    </>
  );
}

export default TopBar;
