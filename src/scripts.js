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
import { all } from 'core-js/fn/promise';
import DataRepo from './DataRepo';


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
  const dataRepo = {}


  dataRepo.travelers = data[0].travelers.map(traveler => new Traveler(traveler))
  dataRepo.trips = data[2].trips.map(trip => new Trip(trip))
  dataRepo.destinations = data[1].destinations.map(destination => new Destination(destination))
  
  allData = new DataRepo(dataRepo)
  //console.log(allData)
  getRandomTraveler(allData.travelers)

}


// const parseTravelerData = (travelerData) => {
  //   const filteredTravelerData = {}
  //   travelerData.forEach()
  
  // }

const getRandomTraveler = (array) => {
  randomIndex = Math.floor(Math.random() * array.length)
  displayTravelerName(allData.randomIndex)
}


const displayTravelerName = (traveler) => {
  welcomeName.innerText = `Welcome, ${allData.travelers[randomIndex].getFirstName()}`
  displayTrips()
}

const displayTrips = () => {
  const userTrips = allData.getTravelerTrips(randomIndex + 1)
  console.log(userTrips)

  userTrips.forEach(trip => {
    let currentDestination = allData.destinations.find(location => trip.destinationID === location.id)
    console.log(currentDestination)

    presentTripsBox.innerHTML += `
      <p class="destination-name">${currentDestination.destination}</p><br>
      <img class="destination-image" src="${currentDestination.image}" alt="${currentDestination.alt}"/><br>
      <p class="destination-info">Destination info</p>
    `
  })
}




//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)