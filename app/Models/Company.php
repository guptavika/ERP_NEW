<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
    'name','gst_number','email','phone',
    'address','type','fy_start','fy_end','logo'
];

}
