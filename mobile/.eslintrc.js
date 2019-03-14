module.exports = {
    extends: ['universe/native', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                singleQuote: true,
                printWidth: 120,
                tabWidth: 4,
            },
        ],
        'no-useless-escape': 0,
    },
    plugins: ['prettier', 'flow'],
};
