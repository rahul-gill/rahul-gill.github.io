/** @type {import('tailwindcss').Config}*/
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    darkMode: 'class',
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '48rem',
                    },
                },
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};