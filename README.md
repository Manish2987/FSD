# News-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Estimated Efforts to complete this project is 20-25 hours

The below are mandatory

Angular 5/6/7 as front end

ASP.NET Core as backend with SQL server

CI/CD has to be implmented

Authentication to be done by JWT

End to end test cases [e2e] are compulsory

Unit testing for back end is compulsory

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `wwwroot/` directory.

## Running lint

Run `npm run lint` to check linting errors.(https://eslint.org/).

## Running unit tests

Run `npm run test` to execute both Mocha and angular test cases [Mocha] & [Karma] (https://mochajs.org/) & (https://karma-runner.github.io) 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Command used to generate this project
Front-end Project is originally generated using Angular CLI, and backend is built in ASP.Net Core using dotnet core CLI.



## The NEWS API to be used as data source
- To get category wise news use the following end point. [Category News endpoint]
(https://newsapi.org/v2/top-headlines?category=<<news_category>>&apikey=<<api_key>>&page=1)

- To get trending news use the following endpoint. [Top Headlines endpoint]
(https://newsapi.org/v2/top-headlines?country=in&apikey=<<api_key>>&page=1)

- To search for any news based on serach text . [News search endpoint]
(https://newsapi.org/v2/everything?q=<<search_text>>&apiKey=<<api_key>>&language=en&page=1)

P.S :- You need to generate the API_KEY for the above endpoints and replace 
`<<api_key>>` with it.


## To register for an API key, follow these steps:

You need to signup to [NEWSAPI] (https://newsapi.org/register).

- After registration, API key is generated for you.


## Important points/instructions to be followed

1.	Must have added all sprints in the same repository. Please don’t create any additional repository and keep pushing the changes into the repository reported in very first iteration.
2.	Must add .gitignore file in your repository to avoid uploading any compiled/ third party binaries.
3.	Must define the steps in README file to reproduce the images used for docker.
4.	Must add your Mentor as developer in your repository.
5.	Must close the issues after fixing and notify the respective Mentor through slack or mail.
6.	You should change the launchurl property of the application to point to your API.
7.	Use port number 8081 for API and 8089 for Authentication layer.
8.	Code must be appropriately/descriptively commented in all layers.
9.	Error/exception handling must be done to make it user friendly. There should not be any console logs in your application.