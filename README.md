# Indaba

## Technology
- React, Redux, React Router
- Node.js v6
- ES2016 using babel (see .babelrc)
- ESLint (see .eslintrc, https://github.com/amida-tech/javascript)
- Webpack (see webpack.config.js)

## Running
1. Install dependencies: `yarn`
2. Run development server: `yarn start`
3. Load site at http://localhost:3000

## Development
Before committing any changes, run the following command:
```sh
$ yarn eslint
```
This runs `eslint --fix src`, which will correct some, but not all, style errors.
The command outputs any `eslint` errors that could not be automatically corrected.
These should be manually corrected before committing your changes.

## Indaba Version Nomenclature
- Legacy - version of Indaba that Amida bought.
- New - front- and back-ends built by NTR
- Best - This version currently being built.  In semantic versioning, we are working on `version 0.1.0`.

## Bootstrapping
This app was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).
Local copy create-react-app documentation [here](bootstrap.README.md)
