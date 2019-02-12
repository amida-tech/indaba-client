# Indaba

## Technology
- React, Redux, React Router
- Node.js v6
- ES2016 using babel (see .babelrc)
- ESLint (see .eslintrc, https://github.com/amida-tech/javascript)
- Webpack (see webpack.config.js)


## Build configurations
Webpack is used to either build and serve a development build (`yarn develop`) or to build a set of production files (`yarn build`). The build configurations are in `webpack.dev.js` and `webpack.prod.js` respectively.

### Environment
Indaba client uses the indaba backend and 3 Amida microservices.
At build time, (`yarn develop` or `yarn build`), webpack reads the following values from a `.env` file to populate the environment variables used by the client. You can also set the environment variables manually or with your production environment tools. Default values are provided for development builds but not production builds, and are shown in parentheses.

1. Greyscale (Indaba backend) (https://github.com/amida-tech/greyscale)
 - `API_URL ('http://localhost:3005')`

 The Greyscale realm included in api requests is read from the environment variable:
 - `REALM ('testorg')`
1. Authentication (see https://github.com/amida-tech/amida-auth-microservice)
 - `AUTH_API_URL ('http://localhost:4000/api/v0')`
1. Survey service (see https://github.com/amida-tech/amida-survey-microservice)
 - `SURVEY_API_URL ('https://localhost:9005/api/v1.0')`
1. Messaging service (see https://github.com/amida-tech/amida-messaging-microservice)
 - `MESSAGING_API_URL ('http://localhost:4001/api/v1')`
1. System message sender email
 - `SYS_MESSAGE_USER ('indaba@example.com')`

## Development

### Running
1. Install dependencies: `yarn`
2. Run development server: `yarn develop`
3. Load site at http://localhost:3000

### Contributing
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
- Best - This version currently being built.  In semantic versioning, we are working on `version 0.1.0`

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
To run the image `docker run -p 3000:80 -v <path to your settings.js>:/usr/share/nginx/html/settings.js --name indaba_fe indaba-client`
