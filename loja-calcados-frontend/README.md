## LOJA CALÇADOS - FRONTEND (Frontend)
#TODO limpar o readme para ficar mais compreensível

# Frontend
# Angular Quickstart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `npm run ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `npm run ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

precisa ter o node mais atualizado, o mínimo é 16.16.0
npm uninstall -g @angular/cli

npm cache clean --force

### colocando a versão
`npm install -g @angular/cli@13.3.11`

npm i --legacy-peer-deps

npm install angular-ng-autocomplete@2.0.12

npm install ng-multiselect-dropdown@0.3.9

npm run ng build

npm start

caso dê erro ER_OSSL_EVP_UNSUPPORTED durante ng build:
set NODE_OPTIONS=--openssl-legacy-provider
linux: export NODE_OPTIONS=--openssl-legacy-provider
