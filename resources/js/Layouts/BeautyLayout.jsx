import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function BeautyLayout({ children }) {
    const { cartCount, auth } = usePage().props;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('catalog.index'), { search: searchQuery });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#4A4A4A]">
            <header className="border-b border-[#F5F5F5] py-6 sticky top-0 bg-white/90 backdrop-blur-md z-50">
                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-3 items-center">
                    {/* Left Nav */}
                    <nav className="hidden md:flex space-x-8 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
                        <Link href={route('about')} className="hover:text-black transition-colors">Ателье</Link>
                        <Link href={route('master-classes.index')} className="hover:text-black transition-colors">Мастер-классы</Link>
                        <Link href={route('catalog.index')} className="hover:text-black transition-colors">Каталог</Link>
                        <a href="#" className="hover:text-black transition-colors">Космо-блог</a>
                    </nav>

                    {/* Logo */}
                    <div className="text-center flex justify-center">
                        <Link href="/">
                            <img src="/images/logo.png" alt="Beauty Atelier" className="h-8 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="flex justify-end items-center space-x-6 text-[10px] uppercase tracking-[0.1em] font-medium text-gray-500">
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
                         
                         {auth.user ? (
                             <Link href={route('dashboard')} className="hover:text-black transition">
                                Личный кабинет
                             </Link>
                         ) : (
                             <Link href={route('login')} className="hover:text-black transition">
                                Личный кабинет
                             </Link>
                         )}

                         <Link href={route('cart.index')} className="hover:text-black transition flex items-center gap-2">
                            Корзина
                            <span className="">({cartCount || 0})</span>
                         </Link>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer className="bg-[#FAF9F6] text-[#4A4A4A] py-20 mt-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
                            <Link href="#" className="block hover:text-black transition text-gray-500">Космо-блог</Link>
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
