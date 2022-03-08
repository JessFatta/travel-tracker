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
//import { all } from 'core-js/fn/promise';



//------GLOBALS
//let dayjs;
//let datePicker;
let travelers;
let trips;
let destinations;
let randomIndex;
let allData = {}
let dataRepo
let currentUserID
let currentTraveler;

// let allTravelers;
// let allTrips;
// let allDestinations;


//------QUERY SELECTORS
const calendar = document.querySelector('#calendar')
const welcomeName = document.querySelector('#welcomeName')
const annualCost = document.querySelector('#spentText')
const presentTripsBox = document.querySelector('.present-trips-box')
const pastTripsBox = document.querySelector('.past-trips-box')
const upcomingTripsBox = document.querySelector('.upcoming-trips-box')
const pendingTripsBox = document.querySelector('.pending-trips-box')
const destinationsDropDown = document.querySelector('#dropDownMenuDestinations')


const datePicker = datepicker('#calendar', {
  onSelect: (instance, date) => {
  ///put functions here - remember to do a .destroy() after each one to 
  // make sure it shows new data on a new calendar date? maybe?
  },
  startDate: new Date(2022, 2, 6),
  minDate: new Date(2022, 2, 7),
  maxDate: new Date(2022, 11, 19)
})
// const datePickerEnd = datepicker('#calendar', {
//   onSelect: (instance, date) => {
//   ///put functions here - remember to do a .destroy() after each one to 
//   // make sure it shows new data on a new calendar date? maybe?
//   },
//   endDate: new Date(2022, 2, 6),
//   minDate: new Date(2022, 2, 7),
//   maxDate: new Date(2022, 11, 19)
// })


//const datePicker = datePicker('.start', {id: 1})
//const datePickerEnd = datePickerEnd('.end', {id: 1})

// datePicker.getRange()
// datePickerEnd.getRange()
// const datePickerEnd = datepicker('#calendar', {
//   onSelect: (instance, date) => {
//   ///put functions here - remember to do a .destroy() after each one to 
//   // make sure it shows new data on a new calendar date? maybe?
//   },
//   EndDate: new Date(2022, 2, 6),
//   minDate: new Date(2022, 2, 7),
//   maxDate: new Date(2022, 11, 19)
// })

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

  currentUserID = getRandomTraveler(allData.travelers)
  populateDestinationsDropDown(allData.destinations)
  parseMethods()
}

const parseMethods = () => {
  const travelerTrips = allData.trips.filter(trip => trip.userID === currentTraveler.id)
  allData.sortTrips(travelerTrips)

  const approvedTrips = allData.thisYearsApproved.map(trip => new Trip(trip))
  allData.sortTrips(approvedTrips)

  const pendingTrips = allData.thisYearsPending.map(trip => new Trip(trip))
  allData.sortTrips(pendingTrips)
  
  displayPastTrips(currentTraveler.trips)
}


const getRandomTraveler = (array) => {
  randomIndex = Math.floor(Math.random() * array.length)
  currentTraveler = allData.getNewTraveler(randomIndex)
  console.log(currentTraveler)
  displayTravelerName(currentTraveler.name)
}

const displayTravelerName = (traveler) => {
  welcomeName.innerText = `Welcome, ${traveler}`
  displayCurrentTrips()
  displayAnnualCost()
  displayUpcomingTrips()
  displayPendingTrips()
}


const displayCurrentTrips = () => { 
  //console.log(currentTraveler)
  //console.log(allData.travelersTrips)
  allData.thisYearsTrip.forEach(trip => {
    let dest = allData.getDestinationName(trip.destinationID)
    //console.log(dest)
    presentTripsBox.innerHTML += `
    <p class="destination-name">${dest.destination}</p>
    <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
    <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
    <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
    <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
    <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
    <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
    `
  })
}

const displayPastTrips = () => { 
  console.log(allData.previousYearsTrip)
  allData.previousYearsTrip.forEach(trip => {
    let dest = allData.getDestinationName(trip.destinationID)
    //let past = allData.sortTrips(dest)
    //console.log(past)
    pastTripsBox.innerHTML += `
    <p class="destination-name">${dest.destination}</p>
    <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
    <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
    <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
    <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
    <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
    <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
    `
  })
}

const displayUpcomingTrips = () => { 
  allData.thisYearsTrip.forEach(trip => {
    let dest = allData.getDestinationName(trip.destinationID)
    //let past = allData.sortTrips(dest)
    //console.log(past)
    upcomingTripsBox.innerHTML += `
    <p class="destination-name">${dest.destination}</p>
    <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
    <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
    <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
    <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
    <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
    <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
    `
  })
}

const displayPendingTrips = () => { 
  allData.thisYearsPending.forEach(trip => {
    let dest = allData.getDestinationName(trip.destinationID)
    //let past = allData.sortTrips(dest)
    //console.log(past)
    pendingTripsBox.innerHTML += `
    <p class="destination-name">${dest.destination}</p>
    <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
    <p class="trip-date">Trip Date:${dayjs(trip.date).format('M/D/YYYY')}</p>
    <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
    <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
    <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
    <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
    `
  })
}




const populateDestinationsDropDown = (destinations) => {
  allData.destinations.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
  })  
}


const displayAnnualCost = () => {
  const annual = allData.getAnnualTripsCost(currentTraveler.id)
  annualCost.innerHTML = `
  <h2 id="spentText">You've spent $${annual} on trips this year</h2>
  `
}


//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)

