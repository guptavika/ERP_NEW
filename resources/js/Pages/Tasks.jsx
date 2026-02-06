import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Stack,
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

  // CREATE TASK
  const submit = (e) => {
    e.preventDefault();
    if (!createData.title) return alert("Title is required");
    post("/tasks", { forceFormData: true });
    resetCreate();
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditData({ title: task.title, image: null });
  };

  // UPDATE TASK
  const updateTask = (id) => {
    if (!editData.title || editData.title.trim() === "") return alert("Title is required");
    put(`/tasks/${id}`, editData, { forceFormData: true });
    setEditingId(null);
    resetEdit();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tasks Dashboard
      </Typography>

      {/* CREATE TASK */}
      {user.role === "Admin" && (
        <Card sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6">Add New Task</Typography>
          <Grid container spacing={2} alignItems="center" mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Task Title"
                value={createData.title}
                onChange={(e) => setCreateData("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <input
                type="file"
                onChange={(e) => setCreateData("image", e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={submit}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* TASK LIST */}
      <Grid container spacing={2}>
        {tasks.map((t) => (
          <Grid item xs={12} md={6} lg={4} key={t.id}>
            <Card sx={{ minHeight: 150 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  {t.image && (
                    <Avatar
                      variant="rounded"
                      src={`/storage/${t.image}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                  {editingId === t.id ? (
                    <TextField
                      fullWidth
                      value={editData.title}
                      onChange={(e) => setEditData("title", e.target.value)}
                    />
                  ) : (
                    <Typography variant="h6">{t.title}</Typography>
                  )}
                </Stack>
              </CardContent>

              <CardActions>
                {editingId === t.id ? (
                  <>
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<Save />}
                      onClick={() => updateTask(t.id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<Cancel />}
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  (user.role === "Admin" || user.role === "Manager") && (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => startEdit(t)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => router.delete(`/tasks/${t.id}`)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
