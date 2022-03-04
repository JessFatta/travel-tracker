//------IMPORTS
import './css/styles.css';
import './images/airplane.png';

import datepicker from 'js-datepicker';
import dayjs from 'dayjs';

import Traveler from './Traveler'
import Destination from './Destination';
import Trip from './Trip'

import {
  fetchTravelerData, 
  fetchDestinationData, 
  fetchTripData
} from './apiCalls'


//------GLOBALS
//let dayjs;
let daypicker;
let travelers;
let allTravelers;
let allTrips;
let allDestinations;


//------QUERY SELECTORS
const calendar = document.querySelector('#calendar')
const welcomeName = document.querySelector('#welcomeName')

const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
    //loadHydrationCard(currentUser)
    //hydrationChart.destroy()
    //displayHydrationChart()
    //loadSleepCard(currentUser)
    //sleepChart.destroy()
    //displaySleepChart()
  },
  startDate: new Date(2019, 7, 2),
  minDate: new Date(2019, 7, 2),
  maxDate: new Date(2022, 12, 19)
})


//------FUNCTIONS
const fetchAllData = () => {
  Promise.all([
    fetchTravelerData(),
    fetchDestinationData(),
    fetchTripData()
  ]).then((data) => parseAllData(data))
}


// const getRandomIndex = (array) => {
//   return Math.floor(Math.random() * array.length)
// }


// const selectRandomTraveler = () => {
//   const randomIndex = getRandomIndex(travelers)
//   return travelers[randomIndex]
// }



// const displayRandomTraveler = () => {
//   let currentTraveler = selectRandomTraveler()
//   displayTravelerName(currentTraveler)
// }

// displayRandomTraveler()

const parseAllData = (data) => {
  allTravelers = data[0].travelers.map(traveler => new Traveler(traveler))
  //parseTravelerData(allTravelers)
  allTrips = data[2].trips.map(trip => new Trip(trip))
  allDestinations = data[1].destinations.map(destination => new Destination(destination))
  //displayTravelerName()
}

// const parseTravelerData = (travelerData) => {
//   const filteredTravelerData = {}
//   travelerData.forEach()
  
// }









const displayTravelerName = (travelerData) => {
  welcomeName.innerText = `Welcome, ${allTravelers[0].name}`
}





//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)