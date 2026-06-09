import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function BeautyLayout({ children }) {
    const { cartCount, wishlistCount, auth } = usePage().props;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('catalog.index'), { search: searchQuery });
            setIsMobileMenuOpen(false);
        }
    };

    const accountHref = auth.user ? route('dashboard') : route('login');

    return (
        <div className="min-h-screen bg-white font-sans text-[#4A4A4A]">
            <header className="border-b border-[#F5F5F5] py-4 lg:py-6 sticky top-0 bg-white/95 backdrop-blur-md z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="lg:hidden w-10 h-10 border border-[#3D2B1F]/10 flex items-center justify-center text-[#3D2B1F]"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Открыть меню"
                    >
                        <span className="relative block w-4 h-3">
                            <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                            <span className={`absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
                        </span>
                    </button>

                    {/* Left Nav */}
                    <nav className="hidden lg:flex space-x-8 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
                        <Link href={route('about')} className="hover:text-black transition-colors">Ателье</Link>
                        <Link href={route('master-classes.index')} className="hover:text-black transition-colors">Мастер-классы</Link>
                        <Link href={route('catalog.index')} className="hover:text-black transition-colors">Каталог</Link>
                        <Link href={route('blog.index')} className="hover:text-black transition-colors">Космо-блог</Link>
                    </nav>

                    {/* Logo */}
                    <div className="text-center flex justify-center">
                        <Link href="/">
                            <img src="/images/logo.png" alt="Beauty Atelier" className="h-7 sm:h-8 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="hidden lg:flex justify-end items-center space-x-6 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
                         {isSearchOpen ? (
                             <form onSubmit={handleSearch} className="flex items-center border-b border-black pb-1">
                                 <input 
                                     type="text" 
                                     value={searchQuery}
                                     onChange={(e) => setSearchQuery(e.target.value)}
                                     placeholder="ПОИСК..." 
                                     className="border-none p-0 text-[10px] uppercase tracking-[0.1em] focus:ring-0 w-32 placeholder-gray-400 bg-transparent"
                                     autoFocus
                                 />
                                 <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-400 hover:text-black">✕</button>
                             </form>
                         ) : (
                             <button onClick={() => setIsSearchOpen(true)} className="hover:text-black transition uppercase tracking-[0.1em]">Поиск</button>
                         )}
                         
                         {auth.user && auth.user.is_admin && (
                             <Link 
                                 href={route('admin.dashboard')} 
                                 className="px-4 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all rounded-sm font-semibold tracking-[0.2em]"
                                 style={{ fontSize: '9px' }}
                             >
                                Админ-панель
                             </Link>
                         )}

                         {auth.user && auth.user.is_cosmetologist && !auth.user.is_admin && (
                             <Link 
                                 href={route('cosmetologist.dashboard')} 
                                 className="px-4 py-2 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-white transition-all rounded-sm font-semibold tracking-[0.2em]"
                                 style={{ fontSize: '9px' }}
                             >
                                Панель специалиста
                             </Link>
                         )}

                         {auth.user ? (
                             <Link href={accountHref} className="hover:text-black transition">
                                Личный кабинет
                             </Link>
                         ) : (
                             <Link href={accountHref} className="hover:text-black transition">
                                Личный кабинет
                             </Link>
                         )}

                         <Link href={route('cart.index')} className="hover:text-black transition flex items-center gap-2">
                            Корзина
                            <span className="">({cartCount || 0})</span>
                         </Link>

                         <Link href={route('wishlist.index')} className="hover:text-black transition flex items-center gap-2 ml-4">
                            Избранное
                            <span className="">({wishlistCount || 0})</span>
                         </Link>
                    </div>

                    <div className="lg:hidden flex justify-end items-center gap-3 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
                        <Link href={route('cart.index')} className="relative w-10 h-10 border border-[#3D2B1F]/10 flex items-center justify-center text-[#3D2B1F]" aria-label="Корзина">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.5l2.1 12.6a2.25 2.25 0 0 0 2.22 1.9h8.86a2.25 2.25 0 0 0 2.22-1.9L20.25 8H5.25" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 21a.75.75 0 1 0 0-1.5A.75.75 0 0 0 9 21Zm8 0a.75.75 0 1 0 0-1.5A.75.75 0 0 0 17 21Z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#3D2B1F] text-white rounded-full flex items-center justify-center text-[9px]">{cartCount || 0}</span>
                        </Link>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-[#3D2B1F]/5 bg-white">
                        <div className="px-4 py-5 space-y-5">
                            <form onSubmit={handleSearch} className="flex items-center border border-[#3D2B1F]/10 px-4 py-3">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск"
                                    className="w-full border-none p-0 text-[11px] uppercase tracking-[0.1em] focus:ring-0 placeholder-gray-400 bg-transparent"
                                />
                                <button type="submit" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3D2B1F]">Найти</button>
                            </form>

                            <nav className="grid gap-1 text-[11px] uppercase tracking-[0.18em] font-bold text-[#3D2B1F]">
                                <Link href={route('about')} className="py-3 border-b border-[#3D2B1F]/5">Ателье</Link>
                                <Link href={route('master-classes.index')} className="py-3 border-b border-[#3D2B1F]/5">Мастер-классы</Link>
                                <Link href={route('catalog.index')} className="py-3 border-b border-[#3D2B1F]/5">Каталог</Link>
                                <Link href={route('blog.index')} className="py-3 border-b border-[#3D2B1F]/5">Космо-блог</Link>
                                <Link href={accountHref} className="py-3 border-b border-[#3D2B1F]/5">Личный кабинет</Link>
                                <Link href={route('wishlist.index')} className="py-3 border-b border-[#3D2B1F]/5">Избранное ({wishlistCount || 0})</Link>
                                {auth.user && auth.user.is_admin && (
                                    <Link href={route('admin.dashboard')} className="py-3 text-[#D4AF37]">Админ-панель</Link>
                                )}
                                {auth.user && auth.user.is_cosmetologist && !auth.user.is_admin && (
                                    <Link href={route('cosmetologist.dashboard')} className="py-3 text-[#D4AF37]">Панель специалиста</Link>
                                )}
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <main>
                {children}
            </main>

            <footer className="bg-[#FAF9F6] text-[#4A4A4A] py-12 sm:py-16 lg:py-20 mt-12 lg:mt-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                        <div className="md:col-span-2">
                            <Link href="/" className="block mb-8">
                                <img src="/images/logo.png" alt="Beauty Atelier" className="h-8 w-auto object-contain" />
                            </Link>
                            <p className="text-xs leading-relaxed max-w-sm mb-12 text-gray-500">
                                Искусство индивидуального макияжа. <br/>
                                Косметика, созданная специально для вас.
                                <br/><br/>
                                © 2026 Бьюти Ателье. Все права защищены.
                            </p>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.15em] font-medium space-y-4">
                            <p className="text-black mb-6 tracking-widest">Меню</p>
                            <Link href={route('master-classes.index')} className="block hover:text-black transition text-gray-500">Мастер-классы</Link>
                            <Link href={route('catalog.index')} className="block hover:text-black transition text-gray-500">Каталог</Link>
                            <Link href={route('blog.index')} className="block hover:text-black transition text-gray-500">Космо-блог</Link>
                            <Link href={route('about')} className="block hover:text-black transition text-gray-500">Ателье</Link>
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.15em] font-medium space-y-4">
                            <p className="text-black mb-6 tracking-widest">Контакты</p>
                            <p className="block text-gray-500">г. Москва, ул. Арбат</p>
                            <p className="block text-gray-500">7 (495) 123-45-67</p>
                            <p className="block text-gray-500">atelier@mail.ru</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
