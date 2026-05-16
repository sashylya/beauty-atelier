import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        '../backend/vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        '../backend/storage/framework/views/*.php',
        '../backend/resources/views/**/*.blade.php',
        './src/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'creamy-silk': '#FDF5E6',
                'deep-espresso': '#3D2B1F',
                'champagne-gold': '#D4AF37',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
            },
        },
    },

    plugins: [forms],
};
