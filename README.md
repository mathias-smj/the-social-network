# Instructions

## Create new React project
```bash	
> pnpm create vite
```

## Install dependencies
```bash
> pnpm add -D prettier prettier-config-standard eslint eslint-plugin-prettier eslint-config-standard eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports eslint-plugin-jsx-a11y tailwindcss prettier-plugin-tailwindcss clsx class-variance-authority tailwind-merge postcss autoprefixer
```

## Create .prettierrc.json
```json
{
  "jsxSingleQuote": true,
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 160,
  "bracketSameLine": false,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "auto",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Create .eslintrc.cjs
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest', ecmaFeatures: {
      'jsx': true
    }, sourceType: 'module'
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jsx-a11y', 'react-hooks', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-use-before-define': ['warn'],
    'no-unused-vars': ['warn', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'caughtErrorsIgnorePattern': '^_'
    }],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'default-case': 'error',
    'camelcase': 'warn',
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'warn',
    'no-misleading-character-class': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal-escape': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'symbol-description': 'error',
    'no-unreachable-loop': 'error',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': [
      'warn',
      {
        'endOfLine': 'auto',
        'singleQuote': true
      }
    ]
  },
}
```

## Create tailwind.config.js
```bash
> pnpm tailwindcss init -p
```
### Edit tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Edit index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Supabase the-social-network : 1nQokmNmd5G9UuIP 
refId : ncqhvqhrypfmesrxobkq

url : https://ncqhvqhrypfmesrxobkq.supabase.co
anonkey : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcWh2cWhyeXBmbWVzcnhvYmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2MzY4NzIsImV4cCI6MjAyMzIxMjg3Mn0.l-JRAYNl5mBfTDnJPxzXkOQlCCJr6p-P9UsLIbl0ifc





