import { useState } from "react";
import { router } from "@inertiajs/react";
import Create from "./Create";
import Edit from "./Edit";

export default function Index({ companies }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editCompany, setEditCompany] = useState(null);

  return (
    <div className="p-6">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <button 
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="border p-2">Logo</th> */}
            <th className="border p-2">Name</th>
            <th className="border p-2">GST</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map(c => (
            <tr key={c.id}>

              {/* <td className="border p-2">
                {c.logo ? (
                  <img 
                    src={`/storage/${c.logo}`} 
                    className="h-10"
                  />
                ) : (
                  <span>No Logo</span>
                )}
              </td> */}
             
 

             
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.gst_number}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.type}</td>
              <td className="border p-2">{c.address}</td>

              <td className="border p-2 space-x-2">
                <button 
                  onClick={() => setEditCompany(c)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button 
                  onClick={() => {
                    if(confirm("Delete this company?")){
                      router.delete(`/companies/${c.id}`);
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {showCreate && (
        <Create close={() => setShowCreate(false)} />
      )}

      {editCompany && (
        <Edit 
          company={editCompany} 
          close={() => setEditCompany(null)} 
        />
      )}

    </div>
  );
}
