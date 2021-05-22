module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  extends: [
    'airbnb-typescript',
    'plugin:jest/recommended'
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
};