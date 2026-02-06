import { router, useForm, usePage } from "@inertiajs/react";

export default function Tasks({ tasks }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, post } = useForm({
        title: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/tasks", { forceFormData: true });
    };

    return (
        <div>
            <h1>My Tasks</h1>

            {user.role === "Admin" && (
                <form onSubmit={submit} encType="multipart/form-data">
                    <input
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Task title"
                    />

                    <input
                        type="file"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />

                    <button>Add</button>
                </form>
            )}

            <hr />

            {tasks.map((t) => (
                <div key={t.id}>
                    {t.image && <img src={`/storage/${t.image}`} width="100" />}
                    <p>{t.title}</p>

                    {(user.role === "admin" || user.role === "manager") && (
                        <button onClick={() => router.delete(`/tasks/${t.id}`)}>
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
