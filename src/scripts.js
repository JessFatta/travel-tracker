//------IMPORTS------
import './css/styles.css';
import './images/airplane.png';

import dayjs from 'dayjs';

import Traveler from './Traveler'
import Destination from './Destination';
import Trip from './Trip'
import DataRepo from './DataRepo';

import {
  fetchTravelerData, 
  fetchDestinationData, 
  fetchTripData, 
  postNewTrip, 
  errorHandling
} from './apiCalls'

import {
  displayTravelerName, 
  displayPastTrips, 
  displayUpcomingTrips, 
  displayPendingTrips, 
  populateDestinationsDropDown, 
  displayAnnualCost
} from './domUpdates'


//------GLOBALS------
let travelers;
let trips;
let destinations;
let allData = {}
let dataRepo
let currentUserID
let currentTraveler;
let approvedTrips
let pendingTrips
let pastTrips



//------QUERY SELECTORS------
const calendar = document.querySelector('#startDateInput')
const destinationsDropDown = document.querySelector('#dropDownMenuDestinations')
const numberOfTravelersInput = document.querySelector('#numberOfTravelersInput')
const tripDurationInput = document.querySelector('#tripDurationInput')
const submitButton = document.querySelector('.enter-button')
const form = document.querySelector('.info')
const pendingTripText = document.querySelector('.destination-name-pending')


//------FUNCTIONS------
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

  currentUserID = 3
  getUserByID(currentUserID)

  parseMethods()
  populateDestinationsDropDown(allData.destinations)
  displayTravelerName(currentTraveler.name)
}

const getUserByID = (currentUserID) => {
  currentTraveler = allData.travelers.find(traveler => currentUserID === traveler.id)
  
  //displayTravelerName(currentTraveler.name)
}

const parseMethods = () => {
  const travelerTrips = allData.trips.filter(trip => trip.userID === currentTraveler.id)
  allData.travelersTrips = travelerTrips
  allData.sortTrips()
  displayTravelerName(currentTraveler.name)
  displayPastTrips()
  displayAnnualCost()
}



// const displayTravelerName = (traveler) => {
//   welcomeName.innerText = `Welcome, ${traveler}`
//   displayAnnualCost()
//   displayUpcomingTrips()
//   displayPendingTrips()
//   displayPastTrips(currentTraveler.trips)
// }

// const displayPastTrips = () => { 
//   let newTrip;
//   allData.previousYearsTrip.forEach(trip => {
//     newTrip = trip
//     let dest = allData.getDestinationName(trip.destinationID)

//     pastTripsBox.innerHTML += `
//     <p class="destination-name">${dest.destination}</p>
//     <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
//     <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
//     <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
//     <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
//     <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
//     <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
//     `
//   })
// }

// const displayUpcomingTrips = () => { 
//   let newTrip
//   allData.thisYearsTrip.forEach(trip => {
//     newTrip = trip
//     let dest = allData.getDestinationName(trip.destinationID)

//     upcomingTripsBox.innerHTML += `
//     <p class="destination-name">${dest.destination}</p>
//     <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
//     <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
//     <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
//     <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
//     <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
//     <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
//     `
//   })
// }

// const displayPendingTrips = () => { 
//   allData.thisYearsPending.forEach(trip => {
//     let dest = allData.getDestinationName(trip.destinationID)
//     let cost = allData.calculateTripCost(trip)

//     pendingTripsBox.innerHTML += `
//     <p class="destination-name">${dest.destination}</p>
//     <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
//     <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
//     <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
//     <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
//     <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
//     <p class="total-estimated-cost">Total Estimated Cost: $${cost}</p>
//     <p class="trip-status">Trip Status: ${trip.status}</p><br><br>
//     `
//   })
// }

// const populateDestinationsDropDown = (destinations) => {
//   allData.destinations.forEach(destination => {
//     destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
//   })  
// }

// const displayAnnualCost = () => {
//   const annual = allData.getAnnualTripsCost(currentTraveler.id)
//   annualCost.innerHTML = `
//   <h2 id="spentText">You've spent $${annual} on trips this year</h2>
//   `
// }

const createNewTrip = (event) => {
  event.preventDefault()

  let newTrip = {
    id: Date.now(),
    userID: parseInt(currentTraveler.id),
    destinationID: parseInt(destinationsDropDown.value),
    travelers: parseInt(numberOfTravelersInput.value),
    date: dayjs(calendar.value).format('YYYY/MM/DD'), 
    duration: parseInt(tripDurationInput.value),
    status: 'pending',
    suggestedActivities: []

  }
  allData.thisYearsPending.push(newTrip)

  postNewTrip(newTrip)
  .then(data => {pendingTripText.innerText += `${data.message}`
  fetchAllData()})
  .catch(error => console.log(error))

  form.reset()
  //getAnnualCost()
}


// const getAnnualCost = () => {
//   let annual = allData.getAnnualTripsCost(currentTraveler.id)
//   displayAnnualCost(annual)
// }




//------EVENT LISTENERS------
window.addEventListener('load', fetchAllData)
submitButton.addEventListener('click', event => {
  createNewTrip(event)
})


export {
  travelers,
  trips,
  destinations,
  allData,
  currentUserID,
  currentTraveler,
  approvedTrips,
  pendingTrips,
  pastTrips
}