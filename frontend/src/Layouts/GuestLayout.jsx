import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Column: Image (Hidden on mobile) */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-[#E6D5C8]">
                <img 
                    src="/images/model-look.png" 
                    alt="Beauty Atelier Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/900x1600/E6D5C8/5D2E18?text=Beauty+Atelier";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FFF5F0]/20"></div>
                
                {/* Brand Overlay */}
                <div className="absolute bottom-12 left-12 text-[#5D2E18]">
                     <h2 className="font-serif text-4xl italic mb-2">Искусство красоты</h2>
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="w-full lg:w-1/2 bg-[#FFF5F0] flex flex-col justify-center items-center p-8 md:p-16 relative">
                <div className="w-full max-w-md">
                    <div className="mb-12 text-center flex justify-center">
                        <Link href="/">
                            <img src="/images/logo.png" alt="Beauty Atelier" className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" />
                        </Link>
                    </div>

                    {children}

                    <div className="mt-12 text-center text-[10px] uppercase tracking-widest text-gray-400">
                        © 2026 Бьюти Ателье. Все права защищены.
                    </div>
                </div>
            </div>
        </div>
    );
}