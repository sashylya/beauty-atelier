<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('author')->where('is_active', true);

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('author_id')) {
            $query->where('user_id', $request->author_id);
        }

        $posts = $query->latest('published_at')->paginate(6)->withQueryString();

        $cosmetologists = \App\Models\User::where('is_cosmetologist', true)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'filters' => $request->all(['category']),
            'cosmetologists' => $cosmetologists,
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('author')->where('slug', $slug)->where('is_active', true)->firstOrFail();

        // Загружаем рекомендованные товары, если они есть
        $recommendedProducts = [];
        if ($post->recommended_products) {
            $recommendedProducts = \App\Models\Product::whereIn('id', $post->recommended_products)->get();
        }

        // Получаем похожие посты (сначала из той же категории)
        $relatedPosts = Post::where('is_active', true)
            ->where('id', '!=', $post->id)
            ->orderByRaw("CASE WHEN category = ? THEN 0 ELSE 1 END", [$post->category])
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'recommendedProducts' => $recommendedProducts,
            'recentPosts' => $relatedPosts,
        ]);
    }
}
