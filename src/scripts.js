//------IMPORTS
import './css/styles.css';
import './images/airplane.png';

import datepicker from 'js-datepicker';
import dayjs from 'dayjs';

import Traveler from './Traveler'
import Destination from './Destination';
import Trip from './Trip'
import DataRepo from './DataRepo';

import {
  fetchTravelerData, 
  fetchDestinationData, 
  fetchTripData
} from './apiCalls'



//------GLOBALS
//let dayjs;
let daypicker;
let travelers;
let trips;
let destinations;
let randomIndex;
let allData = {}
let dataRepo

// let allTravelers;
// let allTrips;
// let allDestinations;


//------QUERY SELECTORS
const calendar = document.querySelector('#calendar')
const welcomeName = document.querySelector('#welcomeName')
const presentTripsBox = document.querySelector('.present-trips-box')
const destinationsDropDown = document.querySelector('#dropDownMenuDestinations')

const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
  ///put functions here - remember to do a .destroy() after each one to 
  // make sure it shows new data on a new calendar date? maybe?
  },
  startDate: new Date(2022, 2, 4),
  minDate: new Date(2022, 2, 4),
  maxDate: new Date(2022, 11, 19)
})


//------FUNCTIONS
const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchDestinationData(),
    fetchTripData()
  ]).then((data) => parseAllData(data))
}

const parseAllData = (data) => {
  const dataRepo = {}
  console.log(dataRepo)

  dataRepo.travelers = data[0].travelers.map(traveler => new Traveler(traveler))
  dataRepo.trips = data[2].trips.map(trip => new Trip(trip))
  dataRepo.destinations = data[1].destinations.map(destination => new Destination(destination))
  
  allData = new DataRepo(dataRepo)

  getRandomTraveler(allData.travelers)
  populateDestinationsDropDown(allData.destinations)
}

const getRandomTraveler = (array) => {
  randomIndex = Math.floor(Math.random() * array.length)
  displayTravelerName(allData.randomIndex)
}

const displayTravelerName = (traveler) => {
  welcomeName.innerText = `Welcome, ${allData.travelers[randomIndex].getFirstName()}`
  displayCurrentTrips()
}

const displayCurrentTrips = () => {
  const userTrips = allData.getTravelerTrips(randomIndex + 1)
  //console.log(userTrips)

  userTrips.forEach(trip => {
    let currentDestination = allData.destinations.find(location => trip.destinationID === location.id)
    //console.log(currentDestination)

      

    presentTripsBox.innerHTML += `
      <p class="destination-name">${currentDestination.destination}</p>
      <img class="destination-image" src="${currentDestination.image}" alt="${currentDestination.alt}"/>
      <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${currentDestination.estimatedLodgingCostPerDay}</p>
      <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${currentDestination.estimatedFlightCostPerPerson}</p><br><br>
    `
  })
  //displayPastTrips()
}

// const displayPastTrips = () => {
//   const userTrips = allData.getTravelerTrips(randomIndex + 1)
//   console.log(userTrips)
//   userTrips.forEach(trip => {

//     let pastTrip = allData.trips.filter(trip => trip.date.isSame(dayjs('1 / 1 / 2021'), 'year'))
//     console.log(pastTrip)
//   })

// }


//let allDestinations; 

const populateDestinationsDropDown = (destinations) => {
  allData.destinations.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
  })  
}


//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)