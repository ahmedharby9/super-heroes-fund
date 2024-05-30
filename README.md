# SuperHeroesFund

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Backend-end server

Run `npm run server` for a dev server or `json-server --watch ./server/db.json` .

`json-server --watch ./server/db.json`: This command will start a JSON server that serves the data in the `db.json` file located in the `server` directory of your project.
   The `--watch` flag means that the server will automatically reload if there are any changes to the `db.json` file.
***
## Front-end server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Scaffolding

I used `directive|pipe|service|class|guard|interface|enum`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## How to Use This Project

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install --force` or  `npm install --legacy-peer-deps` to install all the necessary dependencies.
4. Run `npm run server` to start the backend server.
5. In a separate terminal window, run `ng serve` to start the front-end server.
6. Open your web browser and navigate to `http://localhost:4200/` to view the application.
7. access the application with the following credentials:
   - username: `admin1`
   - password: `admin1`
8. Heroes should be displayed on the home page. and you can add a new hero by clicking the `Add Hero` button. and select the hero you want to edit or add from dropdown.
9. Heroes can sign in and sign out of the application. and you can't add only heroes that are not signed out.
