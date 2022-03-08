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

const pastTripsBox = document.querySelector('.past-trips-box')
const upcomingTripsBox = document.querySelector('.upcoming-trips-box')
const pendingTripsBox = document.querySelector('.pending-trips-box')



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
}

const parseMethods = () => {
  const travelerTrips = allData.trips.filter(trip => trip.userID === currentTraveler.id)
  allData.travelersTrips = travelerTrips
  allData.sortTrips()

  displayTravelerName(currentTraveler.name)
  displayPastTrips()
  displayAnnualCost()
}

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
  
  upcomingTripsBox.innerHTML = ''
  pastTripsBox.innerHTML = ''
  pendingTripsBox.innerHTML = ''
  form.reset()
}


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