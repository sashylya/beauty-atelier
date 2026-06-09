import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="mt-20 flex justify-center items-center gap-2">
            {links.map((link, i) => {
                // Преобразуем стандартные метки Laravel
                let label = link.label;
                if (label.includes('Previous')) {
                    label = '« Назад';
                } else if (label.includes('Next')) {
                    label = 'Вперед »';
                }

                return (
                    <Link
                        key={i}
                        href={link.url || '#'}
                        className={`px-6 py-4 text-[10px] uppercase tracking-widest font-bold transition-all ${
                            link.active 
                                ? 'bg-[#3D2B1F] text-[#FDF5E6]' 
                                : 'text-[#3D2B1F]/40 hover:text-[#3D2B1F]'
                        } ${!link.url ? 'opacity-20 cursor-default pointer-events-none' : ''}`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
