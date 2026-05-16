<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Main Pages -->
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->startOfMonth()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ route('catalog.index') }}</loc>
        <lastmod>{{ now()->startOfWeek()->toAtomString() }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>{{ route('master-classes.index') }}</loc>
        <lastmod>{{ now()->startOfWeek()->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ route('about') }}</loc>
        <lastmod>{{ now()->startOfMonth()->toAtomString() }}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>

    <!-- Products -->
    @foreach ($products as $product)
        <url>
            <loc>{{ route('catalog.show', $product->slug) }}</loc>
            <lastmod>{{ $product->updated_at->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach

    <!-- Master Classes -->
    @foreach ($masterClasses as $masterClass)
        <url>
            <loc>{{ route('master-classes.show', $masterClass->id) }}</loc>
            <lastmod>{{ $masterClass->updated_at->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach
</urlset>
