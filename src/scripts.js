//------IMPORTS
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


//------GLOBALS
//let dayjs;
let travelers;
let trips;
let destinations;
let randomIndex;
let allData = {}
let dataRepo
let currentUserID
let currentTraveler;


//------QUERY SELECTORS
const welcomeName = document.querySelector('#welcomeName')
const annualCost = document.querySelector('#spentText')
const calendar = document.querySelector('#startDateInput')
const destinationsDropDown = document.querySelector('#dropDownMenuDestinations')
const numberOfTravelersInput = document.querySelector('#numberOfTravelersInput')
const tripDurationInput = document.querySelector('#tripDurationInput')
const submitButton = document.querySelector('.enter-button')
const form = document.querySelector('.info')


const presentTripsBox = document.querySelector('.present-trips-box')
const pastTripsBox = document.querySelector('.past-trips-box')
const upcomingTripsBox = document.querySelector('.upcoming-trips-box')
const pendingTripsBox = document.querySelector('.pending-trips-box')
const pendingTripText = document.querySelector('.destination-name')


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
  //console.log(currentTraveler)
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
  //console.log(allData.previousYearsTrip)
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
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  })  
}


const displayAnnualCost = () => {
  const annual = allData.getAnnualTripsCost(currentTraveler.id)
  annualCost.innerHTML = `
  <h2 id="spentText">You've spent $${annual} on trips this year</h2>
  `
}


const createNewTrip = (event) => {
  console.log("HEY")
  event.preventDefault()
  //console.log(D)
  //let formData = new FormData(event.target)
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
  console.log(newTrip)
  allData.thisYearsPending.push(newTrip)

  postNewTrip(newTrip)
  .then(data => {pendingTripText.innerText += `${data.message}`
  fetchAllData()})
  .catch(error => console.log(error))

  form.reset()
}


//------EVENT LISTENERS
window.addEventListener('load', fetchAllData)
submitButton.addEventListener('click', event => {
  createNewTrip(event)
})