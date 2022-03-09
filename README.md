# Travel Tracker
-------
### Overview

Travel Tracker is an interactive webpage that allows a user to track their past, current, and pending trips and renders it on a dashboard. My goal is to present a useful application for a user to keep track of their vacations. 

This app is built using JavaScript, HTML, CSS, and utilizes Test Driven Development with Mocha and Chai. This application also involves the use of a API server.

- First the user logs in with their username and password
  - Because the API holds 50 users, the username is traveler 1-50; i.e. 'traveler38'
  - The password for all users is 'travel'
- After logging in, the user can see all of their trips which have been sorted by the current year
- The user can also view the total amount spent on trips in the current year, which is calculated based on flights, accomodations, and a 10% agent fee
- The user is able to make a request for a new trip, which will display in the 'Pending Trips' box
- When requesting a new trip, the user will fill out a form that consists of choosing a location, dates, number of travelers, and the duration of the trip

 
![Book a Trip](https://media.giphy.com/media/IIUBNICuVzCvY5tvov/giphy.gif)


![View all Trips](https://media.giphy.com/media/06f9nSDRfvXso0dAwI/giphy.gif)


![Book a Trip](https://media.giphy.com/media/kefPSWdVmtxJQqzt3c/giphy.gif)


---------
### Installation Instructions
 - Fork and Clone [this](https://github.com/JessFatta/travel-tracker) repository
 - `CD` into the directory
 - Run `npm install` 
 - Run `npm start`

 - Fork and Clone [this API](https://github.com/turingschool-examples/travel-tracker-api) repository
 - `CD` into the directory
 - Run `npm install` 
 - Run `npm start`

 - In your browser, go to [this link](http://localhost:8080/)


-----------

### Future Features

 - Agent Interaction: a traveler agency to view and approve pending trips as well as select specific users


---------

### Contributors

Jessica Fatta | [GitHub](https://github.com/JessFatta)

--------
### Links

Repository Link: [✈️](https://github.com/JessFatta/travel-tracker)

------------
### Architecture & Technologies Used
This application was built using JavaScript, CSS, and HTML and utilizes Test Driven Development with Mocha and Chai.

This application uses a local API server to fetch and post data.

This application consists of a series of five class files and their corresponding test files, as well as the scripts, DOM Updates, css, and HTML files. Lastly, there is the apiCalls file which holds the fetch calls for retrieving the data.

------------
### Wins & Challenges
##### Wins
- Successfully implement APIs and Fetch Calls
- Applied Dayjs dependency to provide a better user experience
- Freedom of creativity in terms of how the page looks

##### Challenges
- Implementing Dayjs presented an opportunity to learn how to use plug-ins such as isSame
- Webpack poses an added layer of abstraction in web development that, while extremely useful, decentralizes the structure of the user data and requires a higher level view to understand
