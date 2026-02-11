<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'type',
        'opening_balance'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
