const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslint],
    parserOptions: {
        ecmaVersion: 2020,
    },
}
