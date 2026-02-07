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
} from "@mui/material";
import { Edit, Delete, Save, Cancel, Add } from "@mui/icons-material";

export default function Tasks({ tasks }) {
  const { auth } = usePage().props;
  const user = auth.user;

  const [editingId, setEditingId] = useState(null);

  // CREATE FORM
  const { data: createData, setData: setCreateData, post, reset: resetCreate } = useForm({
    title: "",
    image: null,
  });

  // EDIT FORM
  const { data: editData, setData: setEditData, put, reset: resetEdit } = useForm({
    title: "",
    image: null,
  });

  const submit = (e) => {
    e.preventDefault();
    if (!createData.title) return alert("Title is required");
    post("/tasks", { forceFormData: true });
    resetCreate();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, image: null });
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

      {/* CREATE */}
      {user.role === "Admin" && (
        <Box mb={3} display="flex" gap={2}>
          <TextField
            label="Task Title"
            value={createData.title}
            onChange={(e) => setCreateData("title", e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setCreateData("image", e.target.files[0])}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={submit}
          >
            Add
          </Button>
        </Box>
      )}

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Title</b></TableCell>
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
                    />
                  ) : (
                    t.title
                  )}
                </TableCell>

                <TableCell>
                  {editingId === t.id ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => updateTask(t.id)}
                      >
                        <Save />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    (user.role === "Admin" ||
                      user.role === "Manager") && (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => startEdit(t)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            router.delete(`/tasks/${t.id}`)
                          }
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
