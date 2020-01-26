// install: eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb to active airbnb config
module.exports = {
    root: true,
    extends: 'airbnb',
    rules: {
        semi: ['error', 'never'], // no-use ; line end
        indent: ['error', 4], // use 4 spaces
        quotes: ['error', 'single'], // use single quote
        'array-bracket-spacing': ['error', 'never'],
        'comma-dangle': [
            // use , line end
            'error',
            {
                arrays: 'always-multiline',
                exports: 'always-multiline',
                imports: 'always-multiline',
                objects: 'always-multiline',
                functions: 'never',
            },
        ],
        'no-console': ['error', { allow: ['log', 'warn', 'error'] }], // allow log
    },
    // for typescript file fix
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
}
