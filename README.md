# Peak Finder

Peak Finder allows users to find different ski resorts across Europe.

## Running the project

The project was developed and built with node version 20.6.0 and npm version 9.8.0 and 9.8.1. While other versions might also work, these were the ones we used. Running the project is done by navigating to the frontend directory (cd frontend) and running the following commands:

```
npm install
```

```
npm run dev
```
The application is connected to the backend running on the virtual machine, however if you want to run the backend locally, you can navigate to the backend directory and run the following commands:

```
npm install
```

```
npm start
```
This is good to know as you will need to do this before running the e2e tests.

If you want to test the API in Apollo Sandbox you can visit either: http://localhost:4000/ or http://it2810-42.idi.ntnu.no:4000/

## Running ESLint

To check the project for ESLint errors the following command can be run from the project's frontend and backend folder:

```
npm run lint
```

To fix ESLint issues run:

```
npm run lint-fix
```

## Running prettier

To check the project for formatting issues the following command can be run from the project's frontend and backend folder:

```
npm run prettier
```

To fix the issues run this:

```
npm run prettier-fix
```

## Testing the project

### Frontend tests

The frontend tests consists of component tests as well as snapshot tests for those components. When running these tests, API calls are intercepted by Mock Service Worker in order to isolate the tests to only the frontend. To run the tests navigate to the frontend directory and run:

```
npm run test
```

### E2E and API tests

Both API and E2E test are made with the Cypress framework. They are all also located in the frontend directory. The API test file sends different queries and mutations to the API both containing normal values as well as some edge cases. All the resolvers are tested this way. The E2E tests execute a string of user interactions, and assert that the contents on the screen are as expected. Before running the tests, make sure you have both the frontend and backend running locally. To run the tests you can navigate to the frontend directory and run:

```
npm run cypress:run
```
Alternatively if you also want to see the actions be executed, you can run:

```
npm run cypress:open
```
A window should open. From here you want to click "E2E Testing" and choose you preferred browser. Now you can run the tests individually and see a preview of the actions being executed.

## Functionality

- The user can search for a specific destination, with suggestions showing based on the users input.
- Clicking on a result will redirect to page showing detailed information.
- The user can browse destinations by choosing a country
- Nine destinations cards from the chosen country will be displayed
- The site has a filter which can be applied to browse results.
- The site also has several sorting options that can be applied to the results.
- The user can load nine more destinations until there are no more destinations in the database that matches the users filter.
- The app is responsive which allows it to be used on devices with different screen sizes.
- The user can give a destination a rating which will be persistent on the database.
- The app is fully accessible.
- The app is developed with sustainability in mind.
- The data this app uses is from: https://www.kaggle.com/datasets/thomasnibb/european-ski-resorts


## Assumptions

We have assumed a grid of results is sufficient for the list requirement since a grid is virtually a list spread across multiple rows.


## Technologies

We have used the following technologies:

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - GraphQL server

- [Cypress](https://www.cypress.io/) - Cypress is used for our E2E tests.

- [GraphQL](https://graphql.org/) - Query language for APIs

- [MongoDB](https://www.mongodb.com/) - NoSQL Database

- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling

- [MUI](https://mui.com/) - We have used MaterialUI for more effecient and faster development. MaterialUI provides a lot of components that we can use and follows what Google thinks is best design practices.

- [Node](https://nodejs.org/en/) - JavaScript runtime

- [React](https://react.dev/) - React

- [Redux](https://redux.js.org/) - We use Redux for state management for storing the search term and filter state.

- [Typescript](https://www.typescriptlang.org/) - Typescript is the programming language we've used.

- [Vite](https://vitejs.dev/) - We used Vite to setup our development enviroment.

## Accessibility

Peak Finder has been developed with accessibility in mind. All pages have support for screen readers and allow the use of the tab key to navigate between elements.

## Sustainability 

We are using a debouncer on several user inputs. The debouncer limits the number of calls sent to the backend by having a delay before sending them. If changes are made within this timeframe the call won't be sent until the user is done inputting. The states are also cached so if the user changes back to an earlier input there won't be an unnecessary call and the cached information will be used. All queries have an infinite stale time. This is to reduce unnecessary calls. The stale time can be this high since there won’t be any changes to the ski resorts in real-time. Dark mode is another implementation which enhances the sustainabiliy of the page. Lastly, all our images have the .webp file type, this is a sustainable file format.

## .env

We have chosen to have our config.env in the git repository because of peer reviews. Since the reviewers were supposed to be able to create a local version of the backend, they would need to be able to connect to the database. If this wasn’t the case we would of course have put the config.env in the .gitignore file.
