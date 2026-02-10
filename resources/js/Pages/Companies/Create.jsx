import { useForm } from "@inertiajs/react";

export default function Create({ close }) {
  const { data, setData, post } = useForm({
    name: "",
    gst_number: "",
    email: "",
    phone: "",
    address: "",
    type: "",
    fy_start: "",
    fy_end: "",
    logo: null
  });

  function submit(e){
    e.preventDefault();
    post("/companies", {
      forceFormData: true,
      onSuccess: close
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[700px] rounded-xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Company</h2>
          <button onClick={close} className="text-gray-500 hover:text-black">✕</button>
        </div>

        <form onSubmit={submit} className="grid grid-cols-2 gap-4">

          <Field label="Company Name">
            <input
              className="input"
              placeholder="ABC Pvt Ltd"
              onChange={e=>setData("name",e.target.value)}
            />
          </Field>

          <Field label="GST Number">
            <input
              className="input"
              placeholder="22AAAAA0000A1Z5"
              onChange={e=>setData("gst_number",e.target.value)}
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              className="input"
              placeholder="company@email.com"
              onChange={e=>setData("email",e.target.value)}
            />
          </Field>

          <Field label="Phone">
            <input
              className="input"
              placeholder="9876543210"
              onChange={e=>setData("phone",e.target.value)}
            />
          </Field>

          <div className="col-span-2">
            <Field label="Address">
              <textarea
                className="input h-20"
                placeholder="Full address"
                onChange={e=>setData("address",e.target.value)}
              />
            </Field>
          </div>

          <Field label="Company Type">
            <select
              className="input"
              onChange={e=>setData("type",e.target.value)}
            >
              <option value="">Select type</option>
              <option>Retail</option>
              <option>Service</option>
              <option>Manufacturing</option>
            </select>
          </Field>

          <Field label="FY Start">
            <input
              type="date"
              className="input"
              onChange={e=>setData("fy_start",e.target.value)}
            />
          </Field>

          <Field label="FY End">
            <input
              type="date"
              className="input"
              onChange={e=>setData("fy_end",e.target.value)}
            />
          </Field>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Company
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* Reusable Field */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}
