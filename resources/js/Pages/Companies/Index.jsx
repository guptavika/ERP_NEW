import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Create from "./Create";
import Edit from "./Edit";

export default function Index({ companies, companyId }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter companies based on search
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.gst_number && company.gst_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (company.email && company.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get stats
  const totalCompanies = companies.length;
  const gstRegistered = companies.filter(c => c.gst_number).length;
  const activeCompanies = companies.filter(c => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-lg border border-green-200 mb-6">
        <div className="p-6 border-b border-green-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#16a34a] rounded-lg flex items-center justify-center mr-4 shadow-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Company Master</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage all your registered companies</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowCreate(true)}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Company
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-green-50/50">
          <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#16a34a] font-bold text-lg">{totalCompanies}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Companies</p>
                <p className="text-lg font-semibold text-gray-900">{totalCompanies}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#16a34a] font-bold text-lg">{gstRegistered}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">GST Registered</p>
                <p className="text-lg font-semibold text-gray-900">{gstRegistered}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#16a34a] font-bold text-lg">{activeCompanies}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Companies</p>
                <p className="text-lg font-semibold text-gray-900">{activeCompanies}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md border border-green-200 mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="relative flex-1 mb-4 md:mb-0 md:mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies by name, GST or email..."
              className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-[#16a34a]">{filteredCompanies.length}</span> of <span className="font-semibold">{totalCompanies}</span> companies
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow-lg border border-green-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-green-50 to-green-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider border-r border-green-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Company Details
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider border-r border-green-200">
                  GST Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider border-r border-green-200">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map(company => (
                <tr 
                  key={company.id} 
                  className={`hover:bg-green-50/50 transition-colors ${company.id === companyId ? 'bg-green-50 border-l-4 border-[#16a34a]' : ''}`}
                >
                  {/* Company Details Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-r from-green-500 to-[#16a34a] flex items-center justify-center mr-4 shadow-sm">
                        <span className="text-white font-bold text-lg">
                          {company.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                          <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            company.type === 'manufacturer' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                            company.type === 'trader' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            company.type === 'service' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {company.type ? company.type.charAt(0).toUpperCase() + company.type.slice(1) : 'Other'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {company.address ? (
                            <span className="flex items-start">
                              <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="line-clamp-2">{company.address}</span>
                            </span>
                          ) : 'No address provided'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* GST Details Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">GST Number</p>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${company.gst_number ? 'bg-[#16a34a]' : 'bg-gray-400'}`}></div>
                          <span className={`font-medium ${company.gst_number ? 'text-[#16a34a]' : 'text-gray-500'}`}>
                            {company.gst_number || 'Not Registered'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {company.email && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700 truncate">{company.email}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setEditCompany(company)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm("Are you sure you want to delete this company? This action cannot be undone.")){
                              router.delete(`/companies/${company.id}`);
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                      
                      <Link
                        href={`/companies/${company.id}/ledgers`}
                        className="inline-flex items-center px-3 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-medium rounded-lg shadow-sm transition-all justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Ledger Master
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {searchTerm ? 'No companies match your search criteria. Try a different search term.' : 'Get started by adding your first company.'}
              </p>
              <button 
                onClick={() => setShowCreate(true)}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Company
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals - Keep existing logic */}
      {showCreate && (
        <Create close={() => setShowCreate(false)} />
      )}

      {editCompany && (
        <Edit 
          company={editCompany} 
          close={() => setEditCompany(null)} 
        />
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500 border-t border-green-200 pt-4">
        <p>Total {totalCompanies} companies • {gstRegistered} GST registered • {activeCompanies} active</p>
      </div>
    </div>
  );
}