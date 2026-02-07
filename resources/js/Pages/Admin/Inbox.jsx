import { router } from "@inertiajs/react";

export default function Inbox({ messages }) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Inbox</h1>

            {messages.length === 0 && (
                <p>No messages</p>
            )}

            {messages.map((msg) => (
                <div key={msg.id}
                     className={`border p-4 mb-2 rounded 
                     ${msg.is_read ? 'bg-gray-100' : 'bg-white'}`}>

                    <h2 className="font-semibold">
                        {msg.subject}
                    </h2>

                    <p>{msg.message}</p>
                    <small>
                        From: {msg.user.name}
                    </small>

                    <div className="mt-2 flex gap-2">
                        {!msg.is_read && (
                            <button
                                onClick={() =>
                                    router.post(`/admin/inbox/read/${msg.id}`)
                                }
                                className="bg-blue-500 text-white px-3 py-1"
                            >
                                Mark Read
                            </button>
                        )}

                        <button
                            onClick={() =>
                                router.delete(`/admin/inbox/${msg.id}`)
                            }
                            className="bg-red-500 text-white px-3 py-1"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
