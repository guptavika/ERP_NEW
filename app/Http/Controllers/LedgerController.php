<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Ledger;
use Illuminate\Http\Request;
use Inertia\Inertia;

// app/Http/Controllers/LedgerController.php
class LedgerController extends Controller
{
    public function index($id)
{
    $company = Company::find($id);

    if(!$company){
        abort(404, "Invalid company");
    }

    return Inertia::render('Ledgers/Index', [
        'companyId' => $company->id,
        'ledgers' => Ledger::where('company_id',$company->id)->get()
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required',
            'name' => 'required',
            'type' => 'required',
            'opening_balance' => 'numeric'
        ]);

        Ledger::create($request->all());

        return back()->with('success','Ledger Created');
    }

    public function update(Request $request, Ledger $ledger)
    {
        $ledger->update($request->all());
        return back();
    }

    public function destroy(Ledger $ledger)
    {
        $ledger->delete();
        return back();
    }
}

