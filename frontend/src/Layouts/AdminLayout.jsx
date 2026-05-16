import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    const navItems = [
        { label: 'Главная', href: route('admin.dashboard'), active: url.startsWith('/admin/dashboard') },
        { label: 'Товары', href: route('admin.products.index'), active: url.startsWith('/admin/products') },
        { label: 'Образ месяца', href: route('admin.look.edit'), active: url.startsWith('/admin/look') },
        { label: 'Заказы', href: route('admin.orders.index'), active: url.startsWith('/admin/orders') }, 
        { label: 'Отзывы', href: route('admin.reviews.index'), active: url.startsWith('/admin/reviews') },
        { label: 'Мастер-классы', href: route('admin.master-classes.index'), active: url.startsWith('/admin/master-classes') },
        { label: 'Пользователи', href: route('admin.users.index'), active: url.startsWith('/admin/users') },
    ];

    return (
        <div className="flex h-screen bg-[#FDF5E6] font-sans text-[#3D2B1F]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#3D2B1F] text-[#FDF5E6] flex flex-col shadow-2xl z-10">
                <div className="p-10 border-b border-[#FDF5E6]/10">
                    <Link href="/" className="block">
                        <img src="/images/logo.png" alt="Beauty Atelier" className="h-12 w-auto brightness-0 invert" />
                    </Link>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mt-3">Панель управления</div>
                </div>
                
                <nav className="flex-1 overflow-y-auto py-8">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-10 py-4 transition-all duration-300 group ${
                                        item.active 
                                            ? 'bg-[#FDF5E6]/5 text-[#D4AF37] border-r-2 border-[#D4AF37]' 
                                            : 'hover:bg-[#FDF5E6]/5 hover:text-[#FDF5E6]'
                                    }`}
                                >
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium group-hover:translate-x-1 transition-transform">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-10 border-t border-[#FDF5E6]/10">
                     <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center text-[#FDF5E6]/60 hover:text-[#D4AF37] transition-colors w-full"
                    >
                         <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Выйти</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Header Strip */}
                <header className="h-20 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-10 border-b border-[#3D2B1F]/5">
                     <div className="text-[10px] uppercase tracking-[0.15em] text-[#3D2B1F]/50">
                        {new Date().toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })}
                     </div>
                     <div className="flex items-center gap-8">
                        <Link 
                            href={route('home')} 
                            className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3D2B1F]/60 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            На сайт
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-[#3D2B1F] flex items-center justify-center text-[#FDF5E6] font-serif italic text-xs">
                            A
                        </div>
                     </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}