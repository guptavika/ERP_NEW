<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Tasks', [
            'tasks' => Task::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tasks', 'public');
        }

        Task::create([
            'title' => $request->title,
            'image' => $path,
        ]);

        return back();
    }

   public function update(Request $request, Task $task)
{
    $request->validate([
        'title' => 'required|string|max:255',
    ]);

    $path = $task->image;

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('tasks', 'public');
    }

    $task->update([
        'title' => $request->title,
        'image' => $path,
    ]);

    return back();
}


    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }
}

