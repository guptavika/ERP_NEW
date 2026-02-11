<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;

class DashboardController extends Controller
{
    public function index($companyId)
    {
        $company = Company::find($companyId);

        if(!$company){
            abort(404, "Company not found");
        }

        return Inertia::render('Dashboard', [
            'companyId' => $company->id,
            'company' => $company
        ]);
    }
}
