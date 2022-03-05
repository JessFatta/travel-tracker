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
let trips;
let destinations;


// let allTravelers;
// let allTrips;
// let allDestinations;


//------QUERY SELECTORS
const calendar = document.querySelector('#calendar')
const welcomeName = document.querySelector('#welcomeName')

const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
  ///put functions here 
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


const parseAllData = (data) => {
  travelers = data[0].travelers.map(traveler => new Traveler(traveler))

  //parseTravelerData(allTravelers)
  trips = data[2].trips.map(trip => new Trip(trip))
  
  destinations = data[1].destinations.map(destination => new Destination(destination))
  
  getRandomTraveler(travelers)

}


// const parseTravelerData = (travelerData) => {
  //   const filteredTravelerData = {}
  //   travelerData.forEach()
  
  // }

  const getRandomTraveler = (array) => {
    randomIndex = Math.floor(Math.random() * array.length)
    displayTravelerName(randomIndex)
  }
  
let randomIndex

const displayTravelerName = (traveler) => {
  welcomeName.innerText = `Welcome, ${travelers[randomIndex].getFirstName()}`
}




//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)