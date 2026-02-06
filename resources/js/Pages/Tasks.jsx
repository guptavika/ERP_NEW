import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Tasks({ tasks }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [editingId, setEditingId] = useState(null);

    // Separate form for create
    const { data: createData, setData: setCreateData, post, reset: resetCreate } = useForm({
        title: "",
        image: null,
    });

    // Separate form for edit
    const { data: editData, setData: setEditData, put, reset: resetEdit } = useForm({
        title: "",
        image: null,
    });

    // CREATE
    const submit = (e) => {
        e.preventDefault();
        if (!createData.title) return alert("Title is required");

        post("/tasks", { forceFormData: true });
        resetCreate();
    };

    // START EDIT
    const startEdit = (task) => {
        setEditingId(task.id);
        setEditData({
            title: task.title,
            image: null,
        });
    };

    // UPDATE
  const updateTask = (id) => {
    if (!editData.title || editData.title.trim() === "") {
        return alert("Title is required");
    }

    // Send the actual form data
    put(`/tasks/${id}`, editData, { forceFormData: true });

    setEditingId(null);
    resetEdit();
};


    return (
        <div>
            <h1>My Tasks</h1>

            {/* CREATE */}
            {user.role === "Admin" && (
                <form onSubmit={submit}>
                    <input
                        value={createData.title}
                        onChange={(e) => setCreateData("title", e.target.value)}
                        placeholder="Task title"
                    />
                    <input
                        type="file"
                        onChange={(e) => setCreateData("image", e.target.files[0])}
                    />
                    <button>Add</button>
                </form>
            )}

            <hr />

            {/* LIST */}
            {tasks.map((t) => (
                <div key={t.id}>
                    {t.image && <img src={`/storage/${t.image}`} width="100" />}

                    {/* EDIT MODE */}
                    {editingId === t.id ? (
                        <>
                            <input
                                value={editData.title}
                                onChange={(e) => setEditData("title", e.target.value)}
                            />
                            <input
                                type="file"
                                onChange={(e) => setEditData("image", e.target.files[0])}
                            />
                            <button onClick={() => updateTask(t.id)}>Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{t.title}</p>

                            {(user.role === "Admin" || user.role === "Manager") && (
                                <>
                                    <button onClick={() => startEdit(t)}>Edit</button>
                                    <button onClick={() => router.delete(`/tasks/${t.id}`)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
