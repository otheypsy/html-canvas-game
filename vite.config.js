import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        svgrPlugin(),
        {
            // default settings on build (i.e. fail on error)
            ...eslint({
                failOnWarning: false,
                failOnError: false,
            }),
            apply: 'build',
        },
        {
            // do not fail on serve (i.e. local development)
            ...eslint({
                failOnWarning: false,
                failOnError: false,
            }),
            apply: 'serve',
            enforce: 'post',
        },
    ],

    server: {
        port: 3000,
    },
})
