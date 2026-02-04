
import { useForm } from '@inertiajs/react';

export default function Tasks({ tasks }) {
  const { data, setData, post } = useForm({
    title: ''
  });

  const submit = (e) => {
    e.preventDefault();
    post('/tasks');
  };

  return (
    <div>
      <h1>My Tasks</h1>

      <form onSubmit={submit}>
        <input 
          value={data.title}
          onChange={e => setData('title', e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
