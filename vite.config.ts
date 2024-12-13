import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { peerDependencies } from './package.json';
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-react-compiler',
                        {
                            target: '19',
                        },
                    ],
                ],
            },
        }),
        tsConfigPaths(),
        dts({
            include: ['packages/'],
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },

    build: {
        lib: {
            entry: resolve('packages', 'index.ts'),
            formats: ['es'],
            fileName: 'index',
        },

        rollupOptions: {
            external: [...Object.keys(peerDependencies)],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
    },
});
