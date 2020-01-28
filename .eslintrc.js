// install: eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb to active airbnb config
module.exports = {
    root: true,
    env: {
        es6: true,
        jest: true,
        node: true,
        browser: true,
        commonjs: true,
        serviceworker: true,
    },
    extends: ['alloy', 'alloy/react', 'alloy/typescript'],
    rules: {
        semi: ['error', 'always'], // no-use ; line end
        indent: ['error', 4], // use 4 spaces
        quotes: ['error', 'single'], // use single quote
        'no-console': ['error', { allow: ['log', 'warn', 'error'] }], // allow log
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        // 'import/extensions': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], // ERROR define for import/extensions not fount
        // 'array-bracket-spacing': ['error', 'never'],
        // 'comma-dangle': [
        //     // https://github.com/wantedly/frolint/issues/31
        //     // use , line end
        //     'error',
        //     {
        //         arrays: 'always-multiline',
        //         exports: 'always-multiline',
        //         imports: 'always-multiline',
        //         objects: 'always-multiline',
        //         functions: 'never',
        //     },
        // ],
        // 'import/no-unresolved': [2, { commonjs: true, amd: true }],
    },
    // for typescript file fix
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    include: ['src'],
};
