module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.js"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "prettier", "simple-import-sort"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    "import/resolver": {
        alias: {
            map: [
                ["@", "./src"],
                ["@pages", "./src/pages"],
                ["@utils", "./src/utils"],
                ["@layouts", "./src/layouts"],
                ["@assets", "./src/assets"],
                ["@stores", "./src/stores"],
                ["@styles", "./src/assets/styles"],
                ["@icons", "./src/assets/icons"],
                ["@features", "./src/features"],
                ["@images", "./src/assets/images"],
                ["@shared", "./src/shared"],
            ],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".jpg", ".jpeg", ".png"],
        },
    },
};
