# MyMovieAngularClient

Angular Front End application for User interface with movie-API.

## Project Description

Using Angular, Angular Material, and TypeScript, rebuild the client-side for an app called myMovie allowing users to interact with the data stored in the existing server-side code. App is fully responsive for all screen sizes.

## How to get the project running

Development:

- Navigate to root folder in terminal
- Run the following: `ng serve --open`
- In browser, navigate to http://localhost:4000

Production:

- Navigate to following URL in any browser:
  https://brett-ranieri.github.io/myMovie-Angular-client/

**TO GAIN ACCESS**

Create your own account on Signup page or use the following credentials:
  - Username: tester
  - Password: password

## How to access Docs created by TypeDoc

Open `index.html` file located in docs folder in browser.

## Development Dependencies

- "@angular-devkit/build-angular": "^16.0.1",
- "@angular/cli": "~16.0.1",
- "@angular/compiler-cli": "^16.0.0",
- "@types/jasmine": "~4.3.0",
- "angular-cli-ghpages": "^0.6.2",
- "jasmine-core": "~4.6.0",
- "karma": "~6.4.0",
- "karma-chrome-launcher": "~3.2.0",
- "karma-coverage": "~2.2.0",
- "karma-jasmine": "~5.1.0",
- "karma-jasmine-html-reporter": "~2.0.0",
- "typescript": "~5.0.2"

## Project Dependencies

- "@angular/animations": "^16.0.0",
- "@angular/cdk": "^16.0.1",
- "@angular/common": "^16.0.0",
- "@angular/compiler": "^16.0.0",
- "@angular/core": "^16.0.0",
- "@angular/forms": "^16.0.0",
- "@angular/material": "^16.0.1",
- "@angular/platform-browser": "^16.0.0",
- "@angular/platform-browser-dynamic": "^16.0.0",
- "@angular/router": "^16.0.0",
- "rxjs": "~7.8.0",
- "tslib": "^2.3.0",
- "zone.js": "~0.13.0"

## Tools and Features to Highlight

**Main View**

- Returns ALL movies to the user on cards (each movie card displays image, title, and genre)
- Ability to click button on each card to learn more about genre, director, and summary 
- Ability to add movie to/remove movie from favorites list
- Ability to navigate/log out with navigation bar

**Login View**

- Allows users to login in with username and password

**Signup View**

- Allows new users to register by filling in the following fields:
  - Username
  - Password
  - Name
  - Email
  - Birthday

**User View**

- Display user account information
- Allows users to update any field of stored information by navigating to update form
- Allows users to delete their account


