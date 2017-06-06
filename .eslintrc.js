module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "react",
        "babel"
    ],
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
        "indent": ["error", 4]
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
    },
    "env": {
        "browser": true
    }
};
