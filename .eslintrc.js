module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    rules: {
        indent: [
            2,
            4,
            {
                SwitchCase: 1,
            },
        ],
        'import/prefer-default-export': 1,
        'import/extensions': [
            // 这个是解决不写后缀报错的问题
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                json: 'never',
            },
        ],
        'no-plusplus': 1,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },
};
// module.exports = {
//     parser: '@typescript-eslint/parser',
//     env: {
//         browser: true,
//         es2021: true,
//         node: true,
//     },
//     extends: ['prettier', 'plugin:prettier/recommended'],
//     rules: {
//         '@typescript-eslint/no-explicit-any': 'off',
//         'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//         'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//         indent: [
//             2,
//             4,
//             {
//                 SwitchCase: 1,
//             },
//         ],
//         // 修改使用单引号 末尾不需要分号
//         'prettier/prettier': ['error', { singleQuote: true, semi: false }],
//     },
// }
