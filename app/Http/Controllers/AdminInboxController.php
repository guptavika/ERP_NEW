<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

// app/Http/Controllers/AdminInboxController.php
class AdminInboxController extends Controller
{
    public function index()
    {
        $messages = AdminMessage::with('user')
            ->latest()
            ->get();

        return Inertia::render('Admin/Inbox', [
            'messages' => $messages,
        ]);
    }

    public function markRead($id)
    {
        AdminMessage::where('id', $id)
            ->update(['is_read' => true]);

        return back();
    }

    public function delete($id)
    {
        AdminMessage::destroy($id);
        return back();
    }
}

