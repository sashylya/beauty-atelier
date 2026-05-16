<?php

namespace App\Http\Controllers\Cosmetologist;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Cosmetologist/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Cosmetologist/Posts/Create', [
            'products' => Product::all(['id', 'name', 'image_path'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'recommended_products' => 'nullable|array',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        Post::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'recommended_products' => $validated['recommended_products'] ?? [],
            'image_path' => $imagePath,
            'published_at' => now(),
            'is_active' => true,
        ]);

        return redirect()->route('cosmetologist.posts.index')->with('success', 'Статья успешно создана!');
    }

    public function edit(Post $post)
    {
        if ($post->user_id !== auth()->id() && !auth()->user()->is_admin) {
            abort(403);
        }

        return Inertia::render('Cosmetologist/Posts/Edit', [
            'post' => $post,
            'products' => Product::all(['id', 'name', 'image_path'])
        ]);
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id() && !auth()->user()->is_admin) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'recommended_products' => 'nullable|array',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
            $post->image_path = $imagePath;
        }

        $post->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'recommended_products' => $validated['recommended_products'] ?? [],
        ]);

        return redirect()->route('cosmetologist.posts.index')->with('success', 'Статья обновлена!');
    }

    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id() && !auth()->user()->is_admin) {
            abort(403);
        }

        $post->delete();
        return redirect()->back()->with('success', 'Статья удалена');
    }
}
