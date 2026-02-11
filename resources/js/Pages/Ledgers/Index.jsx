import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ ledgers, companyId }) {
  const [activeTab, setActiveTab] = useState("create");
  
  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-green-200">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-800">Tally Style Ledger</h1>
          </div>
          <p className="text-gray-600 text-center">Please select a company to continue</p>
        </div>
      </div>
    );
  }

  const { data, setData, post, reset } = useForm({
    company_id: companyId,
    name: "",
    type: "asset",
    opening_balance: 0
  });

  function submit(e) {
    e.preventDefault();
    if (!data.company_id) {
      alert("Company missing");
      return;
    }
    post("/ledgers");
  }

  // Tally-style color coding for ledger types
  const typeColors = {
    asset: "bg-blue-100 text-blue-800 border-blue-200",
    liability: "bg-red-100 text-red-800 border-red-200",
    income: "bg-green-100 text-green-800 border-green-200",
    expense: "bg-orange-100 text-orange-800 border-orange-200"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-lg border border-green-200 mb-4">
        <div className="flex items-center p-4 border-b border-green-200">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-800">Ledger Master</h1>
            <p className="text-sm text-gray-600">Create and manage ledger accounts</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-green-200">
          <button
            className={`px-6 py-3 font-medium text-sm ${activeTab === "create" ? "bg-green-50 text-green-700 border-b-2 border-green-600" : "text-gray-600 hover:text-green-700"}`}
            onClick={() => setActiveTab("create")}
          >
            Create Ledger
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${activeTab === "list" ? "bg-green-50 text-green-700 border-b-2 border-green-600" : "text-gray-600 hover:text-green-700"}`}
            onClick={() => setActiveTab("list")}
          >
            Ledger List ({ledgers.length})
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg border border-green-200">
        {activeTab === "create" && (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Ledger
                </h2>
                <p className="text-sm text-gray-600">Fill in the details below to create a new ledger account</p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ledger Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ledger Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        placeholder="Enter ledger name"
                        className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        value={data.name}
                        onChange={e => setData("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Ledger Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ledger Type *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <select
                        className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition"
                        value={data.type}
                        onChange={e => setData("type", e.target.value)}
                      >
                        <option value="asset">Asset Account</option>
                        <option value="liability">Liability Account</option>
                        <option value="income">Income Account</option>
                        <option value="expense">Expense Account</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Opening Balance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opening Balance
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="number"
                        className="pl-10 border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder="0.00"
                        value={data.opening_balance}
                        onChange={e => setData("opening_balance", e.target.value)}
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow hover:from-green-700 hover:to-green-800 transition flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Ledger
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "list" && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Ledger Accounts
              </h2>
              <p className="text-sm text-gray-600">Total {ledgers.length} ledger accounts found</p>
            </div>

            {/* Ledger List Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-green-50 to-green-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider border-r border-green-200">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Ledger Name
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider border-r border-green-200">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                      Opening Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ledgers.map((l) => (
                    <tr 
                      key={l.id} 
                      className="hover:bg-green-50 transition-colors cursor-pointer border-l-4 border-transparent hover:border-green-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            l.type === 'asset' ? 'bg-blue-500' :
                            l.type === 'liability' ? 'bg-red-500' :
                            l.type === 'income' ? 'bg-green-500' : 'bg-orange-500'
                          }`}></div>
                          <div className="text-sm font-medium text-gray-900">{l.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${typeColors[l.type]}`}>
                          {l.type.charAt(0).toUpperCase() + l.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${
                            l.type === 'asset' ? 'text-blue-700' :
                            l.type === 'liability' ? 'text-red-700' :
                            l.type === 'income' ? 'text-green-700' : 'text-orange-700'
                          }`}>
                            ₹{parseFloat(l.opening_balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <button className="text-gray-400 hover:text-green-600 ml-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Total Row */}
                  {ledgers.length > 0 && (
                    <tr className="bg-gradient-to-r from-green-50 to-green-100 font-semibold">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800">
                        {ledgers.length} Accounts
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-800">
                        ₹{ledgers.reduce((sum, l) => sum + parseFloat(l.opening_balance), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {ledgers.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Ledgers Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Create your first ledger account by clicking the "Create Ledger" tab above
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Tally Style Ledger Master • All amounts in INR • Double-click any ledger to edit</p>
      </div>
    </div>
  );
}