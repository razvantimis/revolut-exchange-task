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
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "no-param-reassign": "off",
    "jest/no-done-callback": "off"
  },
  settings: {
    "import/core-modules": ["rxjs/operators", "rxjs/ajax"]
  },
};