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
  travelers,
  trips,
  destinations,
  allData,
  currentUserID,
  currentTraveler,
  approvedTrips,
  pendingTrips,
  pastTrips
} from './scripts'



const welcomeName = document.querySelector('#welcomeName')
const annualCost = document.querySelector('#spentText')
const destinationsDropDown = document.querySelector('#dropDownMenuDestinations')
const presentTripsBox = document.querySelector('.present-trips-box')
const pastTripsBox = document.querySelector('.past-trips-box')
const upcomingTripsBox = document.querySelector('.upcoming-trips-box')
const pendingTripsBox = document.querySelector('.pending-trips-box')
const pendingTripText = document.querySelector('.destination-name-pending')



const displayTravelerName = (traveler) => {
  welcomeName.innerText = `Welcome, ${traveler}`
  displayAnnualCost()
  displayUpcomingTrips()
  displayPendingTrips()
  displayPastTrips(currentTraveler.trips)
}

const displayPastTrips = () => { 
  let newTrip;
  allData.previousYearsTrip.forEach(trip => {
    newTrip = trip
    let dest = allData.getDestinationName(trip.destinationID)

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
  let newTrip
  allData.thisYearsTrip.forEach(trip => {
    newTrip = trip
    let dest = allData.getDestinationName(trip.destinationID)

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
    let cost = allData.calculateTripCost(trip)

    pendingTripsBox.innerHTML += `
    <p class="destination-name">${dest.destination}</p>
    <img class="destination-image" src="${dest.image}" alt="${dest.alt}"/>
    <p class="trip-date">Trip Date: ${dayjs(trip.date).format('M/D/YYYY')}</p>
    <p class="destination-lodging-cost">Estimated Lodging Cost Per Day: $${dest.estimatedLodgingCostPerDay}</p>
    <p class="destination-flight-cost">Estimated Flight Cost Per Person: $${dest.estimatedFlightCostPerPerson}</p>
    <p class="trip-duration">Trip Duration: ${trip.duration} days</p>
    <p class="total-estimated-cost">Total Estimated Cost: $${cost}</p>
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
  let annual = allData.getAnnualTripsCost(currentTraveler.id)
  annualCost.innerHTML = `
  <h2 id="spentText">You've spent $${annual} on trips this year</h2>
  `
}


export {
  displayTravelerName, 
  displayPastTrips, 
  displayUpcomingTrips, 
  displayPendingTrips, 
  populateDestinationsDropDown, 
  displayAnnualCost
}