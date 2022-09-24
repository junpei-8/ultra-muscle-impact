module.exports = {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  plugins: [require('prettier-plugin-jsdoc')],

  /** @see https://www.npmjs.com/package/prettier-plugin-jsdoc#options */
  jsdocVerticalAlignment: true,
  jsdocCapitalizeDescription: false,
  jsdocPreferCodeFences: true,
};
