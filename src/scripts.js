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

const userNameField = document.querySelector('#userNameField')
const passWordField = document.querySelector('#passWordField')
const logInSubmit = document.querySelector('#logInSubmit')
const logInPage = document.querySelector('#logInPage')
const mainPage = document.querySelector('#mainPage')

//------FUNCTIONS------
const fetchAllData = (username) => {
  Promise.all([
    fetchTravelerData(),
    fetchDestinationData(),
    fetchTripData()
  ]).then((data) => parseAllData(data, username))
}

const parseAllData = (data, username) => {
  const dataRepo = {}

  dataRepo.travelers = data[0].travelers.map(traveler => new Traveler(traveler))
  dataRepo.trips = data[2].trips.map(trip => new Trip(trip))
  dataRepo.destinations = data[1].destinations.map(destination => new Destination(destination))
  
  allData = new DataRepo(dataRepo)
  //console.log(allData)
  
  currentUserID = username
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
  console.log("TRAVTR", travelerTrips)
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
  })
  .catch(error => console.log(error))
  
  upcomingTripsBox.innerHTML = ''
  pastTripsBox.innerHTML = ''
  pendingTripsBox.innerHTML = ''
  form.reset()
  fetchAllData()
}

const logIn = (event) => {
  event.preventDefault()
  const userName = parseInt(userNameField.value.charAt(8) + userNameField.value.charAt(9))
  console.log(userName)
  if(userNameField.value === `traveler${userName}` && passWordField.value === 'travel') {
    addHidden(logInPage)
    removeHidden(mainPage)
    fetchAllData(userName)
  } 
  return userName
}

const addHidden = (element) => {
  element.classList.add('hidden')
}

const removeHidden = (element) => {
  element.classList.remove('hidden')
}



//------EVENT LISTENERS------
//window.addEventListener('load', fetchAllData)
logInSubmit.addEventListener('click', event => {
  logIn(event)
})
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