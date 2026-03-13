import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    const navItems = [
        { label: 'Главная', href: route('admin.dashboard'), active: url.startsWith('/admin/dashboard') },
        { label: 'Товары', href: route('admin.products.index'), active: url.startsWith('/admin/products') },
        { label: 'Образ месяца', href: route('admin.look.edit'), active: url.startsWith('/admin/look') },
        { label: 'Заказы', href: route('admin.dashboard'), active: url.startsWith('/admin/orders') }, 
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
                     <div className="flex items-center gap-4">
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