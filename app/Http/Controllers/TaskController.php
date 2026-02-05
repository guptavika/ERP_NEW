<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // Show all tasks
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks;
        return Inertia::render('Tasks', ['tasks' => $tasks]);
    }

    // Store new task
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048'
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tasks', 'public');
        }

        $request->user()->tasks()->create([
            'title' => $request->title,
            'image' => $path
        ]);

        return back();
    }

    // Update task
    public function update(Request $request, Task $task)
    {
        $task->update([
            'title' => $request->title
        ]);

        return back();
    }

    // Delete task
    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }
}
