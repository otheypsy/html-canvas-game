module.exports = {


    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },

    plugins: [
        '@typescript-eslint'
    ],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript',
        'prettier'
    ],


    env: {
        browser: true,
        es2024: true
    }
}
