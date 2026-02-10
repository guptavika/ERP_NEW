import { useForm } from "@inertiajs/react";

export default function Edit({ company, close }) {
  const { data, setData, put } = useForm(company);

  function submit(e){
    e.preventDefault();
    put(`/companies/${company.id}`, {
      onSuccess: () => close()
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 w-96 rounded">
        <h2 className="text-xl mb-3">Edit Company</h2>

        <form onSubmit={submit} className="space-y-2">
          <input className="border w-full p-2"
            value={data.name}
            onChange={e=>setData("name",e.target.value)} />

          <input className="border w-full p-2"
            value={data.gst_number}
            onChange={e=>setData("gst_number",e.target.value)} />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={close}>Cancel</button>
            <button className="bg-green-600 text-white px-4 py-1 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
