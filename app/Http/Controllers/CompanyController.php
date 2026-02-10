<?php
namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
  public function index()
{
    $companies = Company::all();
    return Inertia::render('Companies/Index', [
        'companies' => $companies
    ]);
}


    public function create()
    {
        return Inertia::render('Companies/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'gst_number' => 'nullable|unique:companies',
            'email' => 'nullable|email',
            //  'logo' => 'required|image|mimes:png,jpg,jpeg',
            'type' => 'nullable|string',
            'fy_start' => 'nullable|date',
            'fy_end' => 'nullable|date'


        ]);

        Company::create($request->all());

        return redirect()->route('companies.index');
    }

    public function edit(Company $company)
    {
        return Inertia::render('Companies/Edit', [
            'company' => $company
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required',
            'gst_number' => 'nullable|unique:companies,gst_number,' . $company->id,
            'email' => 'nullable|email',
            //  'logo' => 'required|image|mimes:png,jpg,jpeg',
            'type' => 'nullable|string',
            'fy_start' => 'nullable|date',
            'fy_end' => 'nullable|date'
        ]);

        $company->update($request->all());

        return redirect()->route('companies.index');
    }

    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('companies.index');
    }
}
