// install: eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb to active airbnb config
module.exports = {
    root: true,
    extends: 'airbnb',
    rules: {
        semi: ['error', 'never'], // no-use ; line end
        indent: ['error', 4], // use 4 spaces
        quotes: ['error', 'single'], // use single quote
        'comma-dangle': [
            // use , line end
            'error',
            {
                arrays: 'always',
                objects: 'always',
                imports: 'always',
                exports: 'always',
                functions: 'never',
            },
        ],
        'no-console': ['error', { allow: ['log', 'warn', 'error'] }], // allow log
    },
    // for typescript file fix
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
}
