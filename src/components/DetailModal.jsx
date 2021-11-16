import * as React from "react";

import {
  useAppSelector,
  useAppDispatch,
  toggle,
  remove,
  editId,
  showEditModal,
  showDetailModal,
} from "../store";
import { Button, Chip, Dialog, Grid, Typography } from "@mui/material";

import { Check } from "@mui/icons-material";

function DetailModal() {
  const todos = useAppSelector((state) => state.todos);
  const editIdvalue = useAppSelector((state) => state.editId);
  const showDetailModalvalue = useAppSelector((state) => state.showDetailModal);
  const dispatch = useAppDispatch();
  const detail = todos.find((todo) => todo.id === editIdvalue);

  return (
    <>
      <Dialog
        fullWidth
        open={showDetailModalvalue}
        onClose={() => {
          dispatch(showDetailModal(false));
          dispatch(editId(0));
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          flexWrap="nowrap"
          width="400px"
          m={1}
        >
          <Grid item container justifyContent="flex-start" alignItems="center">
            <Grid item mr={1}>
              <Typography variant="body1">ergency</Typography>
            </Grid>
            <Grid item>
              <Chip
                label={
                  detail?.ergency === "low"
                    ? "low"
                    : detail?.ergency === "medium"
                    ? "medium"
                    : "high"
                }
                color={
                  detail?.ergency === "low"
                    ? "success"
                    : detail?.ergency === "medium"
                    ? "warning"
                    : "error"
                }
                variant="filled"
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
              width: "500px",
              overflowWrap: "break-word",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            <Grid item>
              <Typography variant="h6">{detail?.text}</Typography>{" "}
            </Grid>
            <Grid item>
              <Typography variant="caption">{detail?.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          my={1}
          item
          container
          justifyContent="space-evenly"
          spacing={2}
          direction="row"
          flexWrap="nowrap"
        >
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(editId(detail?.id));
                dispatch(showEditModal(true));
                dispatch(showDetailModal(false));
              }}
            >
              Edit Task
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color={detail?.done === true ? "success" : "secondary"}
              onClick={() => {
                dispatch(toggle(detail?.id));
              }}
            >
              {detail?.done === true ? "Well Done" : "Done Task"}
              {detail?.done === true ? <Check /> : <> </>}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(remove(detail?.id));
                dispatch(showDetailModal(false));
              }}
            >
              Delete Task
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default DetailModal;
