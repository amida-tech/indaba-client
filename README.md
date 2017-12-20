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
Before committing any changes, run the following commands:
```sh
$ yarn eslint
$ yarn stylelint
```
This runs `eslint --fix src`, which will correct some, but not all, style errors.
The command outputs any `eslint` errors that could not be automatically corrected.
These should be manually corrected before committing your changes.

It also runs `stylelint src/styles/*.scss`, which identifies any SCSS in violation
of the style guidelines laid out in `.stylelintrc.yml`.

## Indaba Version Nomenclature
- Legacy - version of Indaba that Amida bought.
- New - front- and back-ends built by NTR
- Best - This version currently being built.  In semantic versioning, we are working on `version 0.1.0`.

## Bootstrapping
This app was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).
Local copy create-react-app documentation [here](bootstrap.README.md)

## Testing
Run the `user.integration.js` test if it has not yet been done.
Start both `indaba-client` and `greyscale/backend`.
Go to `http://localhost:3000/login`
Login with `test-adm@mail.net` / `testadmin`

## Code Analysis
1. run `$ gulp analysis`
2. Files are written to `./artifacts`

## Building Dockerfile in Linux
From the base directory of the project run `docker build --tag indaba-client .`
To run the image `docker run --link indaba_be:indaba_be -e API_HTTP_URL=http://<address to be/>:3005 -e API_HTTPS_URL=http://<address to be/>:3005 -p 3000:3000 --name indaba_fe indaba-client`

operationally it is not clear if API_HTTP_URL is the URL used to connect from the indaba client _server_ or from the indaba client _browser_. if browser then the value would be the external address.  if server then the value should be "indaba_be" (the name we linked the backend docker instance as to the client docker instance)
