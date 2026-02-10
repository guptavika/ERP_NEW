<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
   protected $fillable = ['title', 'user_id',  'staff_id', 'image'];

// app/Models/Task.php
public function staff()
{
    return $this->belongsTo(User::class, 'staff_id');
}


}

