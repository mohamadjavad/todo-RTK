import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import {
  useAppSelector,
  useAppDispatch,
  update,
  addTodo,
  editId,
  showEditModal,
} from "../store";
import { Box } from "@mui/system";

const AddModal = () => {
  const [text, textSet] = React.useState("");
  const [textHelper, setTextHelper] = React.useState("");
  const [kpi, setKpi] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ergency, setErgency] = React.useState("low");
  const todos = useAppSelector((state) => state.todos);
  const editIdvalue = useAppSelector((state) => state.editId);
  const showEditModalvalue = useAppSelector((state) => state.showEditModal);
  const dispatch = useAppDispatch();
  let selectedTask = todos?.find((item) => item.id === editIdvalue);

  React.useEffect(() => {
    if (editIdvalue > 0) {
      textSet(selectedTask?.text);
      setKpi(selectedTask?.kpi);
      setDescription(selectedTask?.description);
      setErgency(selectedTask?.ergency);
    } else {
      textSet("");
      setKpi("");
      setDescription("");
      setErgency("");
    }
  }, [editIdvalue]);

  function onchange(event) {
    let valid;

    switch (event.target.id) {
      case "text":
        textSet(event.target.value);
        valid = event.target.value.length > 0;
        if (!valid) {
          setTextHelper("task title is required");
        } else {
          setTextHelper("");
        }
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div>
        <Dialog
          open={showEditModalvalue}
          onClose={() => {
            dispatch(showEditModal(false));
            dispatch(editId(0));
          }}
        >
          <DialogTitle>
            {editIdvalue > 0 ? "Edit the Task" : "Add a Task"}{" "}
          </DialogTitle>
          <DialogContent>
            {/* <FormControl fullWidth> */}
            <TextField
              required
              error={textHelper?.length !== 0}
              helperText={textHelper}
              autoFocus
              variant="outlined"
              fullWidth
              margin="dense"
              id="text"
              label="Task Title"
              value={text}
              onChange={onchange}
            />
            {/* </FormControl> */}
            <FormControl fullWidth>
              <TextField
                multiline
                rows={5}
                margin="dense"
                id="description"
                label="Task Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                id="kpi"
                label="Gifts And Kpis for this Task😀"
                variant="outlined"
                value={kpi}
                onChange={(e) => setKpi(e.target.value)}
              />
            </FormControl>
            <FormControl component="fieldset" style={{ marginTop: "15px" }}>
              <FormLabel component="legend">ergency</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={ergency}
                onChange={(e) => setErgency(e.target.value)}
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <Box textAlign="center" my={2}>
            <Button
              variant="text"
              onClick={() => {
                dispatch(showEditModal(false));
                dispatch(editId(""));
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!text}
              variant="contained"
              color="primary"
              onClick={() => {
                editIdvalue > 0
                  ? dispatch(
                      update({
                        id: editIdvalue,
                        text,
                        description,
                        kpi,
                        ergency,
                      })
                    )
                  : dispatch(addTodo({ text, description, kpi, ergency }));

                textSet("");
                setKpi("");
                setDescription("");
                setErgency("");

                dispatch(showEditModal(false));
                dispatch(editId(0));
              }}
            >
              {editIdvalue > 0 ? "Apply the Changes" : "Add to Tasks"}
            </Button>
          </Box>
        </Dialog>
      </div>
    </>
  );
};

export default AddModal;
