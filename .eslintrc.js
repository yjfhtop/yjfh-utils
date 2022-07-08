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
    rules: {
        indent: [
            2,
            4,
            {
                SwitchCase: 1,
            },
        ],
        'import/prefer-default-export': 1,
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
