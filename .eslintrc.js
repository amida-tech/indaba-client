module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "react",
        "babel"
    ],
    "parser":"babel-eslint" ,
    "rules": {
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "react/jsx-uses-react": 1,
        "arrow-body-style": 0,
        "no-use-before-define": 0,
        "import/prefer-default-export": 0,
        "no-underscore-dangle": 0,
        "class-methods-use-this": 0,
        "babel/new-cap": 0,
        "indent": ["error", 4],
        "import/no-cycle":0,
        "import/named":0,
        "max-len":0,
        "prefer-destructuring":0,
        "prefer-promise-reject-errors":0,
        "radix":0,
        "consistent-return": 0,
        "no-alert":0,
        "func-names":0,
        "no-unused-expressions": 0,
        "no-named-as-default": 0,
        "no-restricted-globals": 0,
        "no-console": 0,
        "no-param-reassign": 0,
        "no-case-declarations": 0,
        "default-case": 0,
        "array-callback-return": 0,
        "import/no-named-as-default": 0,
        "no-shadow": 0,
        "no-unused-vars":0,
        "import/no-unresolved": 0,
        "no-plusplus": 0,
        "linebreak-style": 0
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
    },
    "env": {
        "browser": true
    }
};
