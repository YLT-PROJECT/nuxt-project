module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "no-undef": "error",
    "quotes": ["error", "backtick"],
    "no-console": ["error"],
    "semi": ["error", "never"],
    "indent": ["error", 4],
    "prefer-destructuring": ["error", {"object": true, "array": true}],
    "no-undefined": "error",
    "no-unused-vars": "error"
  }
}
