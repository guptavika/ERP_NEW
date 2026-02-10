<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
  public function index()
{
    $user = auth()->user();

    if ($user->role === 'Staff') {
        $tasks = Task::where('staff_id', $user->id)->get();
        $staff = [];
    } else {
        $tasks = Task::with('staff')->latest()->get();
        $staff = User::where('role', 'Staff')->get();
    }

    return Inertia::render('Tasks', [
        'tasks' => $tasks,
        'staff' => $staff,
    ]);
}


    public function store(Request $request)
{
    if (auth()->user()->role !== 'Admin') {
        abort(403);
    }

    Task::create([
        'title' => $request->title,
        'staff_id' => $request->staff_id,
        'image' => $request->image?->store('tasks', 'public'),
    ]);
    return back();
}


    public function update(Request $request, Task $task)
    {
        if (auth()->user()->role !== 'Admin') {
            abort(403);
        }

        $path = $task->image;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('tasks', 'public');
        }

        $task->update([
            'title' => $request->title,
            'staff_id' => $request->staff_id,
            'image' => $path,
        ]);

        return back();
    }

    public function destroy(Task $task)
    {
        if (auth()->user()->role !== 'Admin') {
            abort(403);
        }

        $task->delete();
        return back();
    }
}
