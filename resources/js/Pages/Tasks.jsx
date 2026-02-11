import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Save, Cancel, Add } from "@mui/icons-material";

export default function Tasks({ tasks, staff }) {
  const { auth } = usePage().props;
  const user = auth.user;

  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // CREATE FORM
  const { data: createData, setData: setCreateData, post, reset: resetCreate } = useForm({
    title: "",
    image: null,
    staff_id: "",
  });

  // EDIT FORM
  const { data: editData, setData: setEditData, put, reset: resetEdit } = useForm({
    title: "",
    image: null,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetCreate();
  };

  const submit = (e) => {
    e.preventDefault();
    if (!createData.title) return alert("Title is required");
    post("/tasks", { 
      forceFormData: true,
      onSuccess: () => {
        handleCloseDialog();
      }
    });
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ 
      title: task.title, 
      image: null,
      staff_id: task.staff_id || ""
    });
  };

  const updateTask = (id) => {
    if (!editData.title) return alert("Title is required");
    put(`/tasks/${id}`, editData, { forceFormData: true });
    setEditingId(null);
    resetEdit();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Tasks Dashboard
      </Typography>

      {/* ADD TASK BUTTON */}
      {user.role === "Admin" && (
        <Box mb={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{ mb: 2 }}
          >
            Add New Task
          </Button>
        </Box>
      )}

      {/* ADD TASK DIALOG */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <form onSubmit={submit}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Task Title"
                value={createData.title}
                onChange={(e) => setCreateData("title", e.target.value)}
                fullWidth
                required
              />
              
              <FormControl fullWidth>
                <InputLabel>Assign Staff</InputLabel>
                <Select
                  value={createData.staff_id}
                  label="Assign Staff"
                  onChange={(e) => setCreateData("staff_id", e.target.value)}
                >
                  <MenuItem value="">Not Assigned</MenuItem>
                  {staff.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Upload Image (Optional)
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCreateData("image", e.target.files[0])}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Assigned Staff</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>

                <TableCell>
                  {t.image && (
                    <Avatar
                      variant="rounded"
                      src={`/storage/${t.image}`}
                    />
                  )}
                </TableCell>

                <TableCell>
                  {editingId === t.id ? (
                    <TextField
                      value={editData.title}
                      onChange={(e) =>
                        setEditData("title", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    t.title
                  )}
                </TableCell>

                <TableCell>
                  {editingId === t.id ? (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={editData.staff_id}
                        onChange={(e) => setEditData("staff_id", e.target.value)}
                      >
                        <MenuItem value="">Not Assigned</MenuItem>
                        {staff.map((s) => (
                          <MenuItem key={s.id} value={s.id}>
                            {s.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    t.staff ? t.staff.name : "Not Assigned"
                  )}
                </TableCell>

                <TableCell>
                  {editingId === t.id ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => updateTask(t.id)}
                        size="small"
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setEditingId(null)}
                        size="small"
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    (user.role === "Admin" || user.role === "Manager") && (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => startEdit(t)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            router.delete(`/tasks/${t.id}`)
                          }
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}