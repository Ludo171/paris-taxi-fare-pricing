# Paris Taxi Fare - Pricing Microservice

This node server provides independent pricing services.


## Demo
This API is available at https://paris-taxi-pricing.herokuapp.com/

**Examples of request :**

```
POST https://paris-taxi-pricing.herokuapp.com/pricing/v1
body: {
    "duration": 150, // in seconds
    "distance": 10,  // in miles
    "startTime": "2020-09-30T18:21:17.000Z"
}
```

See repository [Paris Taxi Fare](https://github.com/Ludo171/paris-taxi-fare-frontend) to get access to live demo.


![API Diagram](./ArchitectureDiagrams/Diapositive1.PNG)

![API Diagram](./ArchitectureDiagrams/Diapositive3.PNG)


The 3 Github Repositories are public :
- [Client App ReactJs TypeScript](https://github.com/Ludo171/paris-taxi-fare-frontend)
- [Data Service NodeJs Express Mongoose](https://github.com/Ludo171/paris-taxi-fare-rides)
- [Pricing Service NodeJs Express](https://github.com/Ludo171/paris-taxi-fare-pricing)


# CICD
Simple CICD by using a github action file. Whenever a commit is pushed on master, if the CI pipeline succeeds, it automatically merges `master` into `release`.
The `release` branch is automatically deployed on an Heroku instance https://paris-taxi-pricing.herokuapp.com/.


## Install
1. Clone the repository
2. `npm install`
3. `npm start`
```
