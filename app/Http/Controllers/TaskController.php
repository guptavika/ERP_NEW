<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
   

public function index(Request $request)
{
    $tasks = $request->user()->tasks;
    return Inertia::render('Tasks', ['tasks' => $tasks]);
}




    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255'
    ]);

    $request->user()->tasks()->create([
        'title' => $request->title
    ]);

    return redirect()->back();
}

}
