import dayjs from "dayjs";

import Traveler from "./Traveler";
import Trip from "./Trip";
import Destination from "./Destination";
import { travelerTestData } from "../test/test-data";


class DataRepo {
  constructor(data) {
    this.travelers = data.travelers;
    this.trips = data.trips;
    this.destinations = data.destinations;
    //this.pastTrips = [];
    this.travelersTrips = [];
    //this.currentTrips = [];
    //this.pendingTrips = [];
    this.thisYearsTrip = [];
    this.thisYearsApproved = [];
    this.previousYearsTrip = [];
    this.thisYearsPending = [];

    //this.currentTraveler;
  }

  getNewTraveler(id) {
    let currentTraveler = this.travelers.find(traveler => traveler.id === id)
    this.getTravelerTrips(id)
    return currentTraveler
  }

  getTravelerTrips(userID) {
    this.trips.forEach(trip => {
      if(trip.userID === userID) {
        this.travelersTrips.push(trip)
      }
    })
  }

  getDestinationName(destinationID) {
    const destName = this.destinations.find(destination => {
      return destination.id === destinationID
    })
    //console.log(destName.destination)
    return destName
  }

  sortTrips() {
    this.travelersTrips.forEach(trip => {
    this.getDestinationName(trip.destinationID)
    if(dayjs(trip.date).year() === 2022) {
      this.thisYearsTrip.push(trip)
      if(trip.status === 'approved') {
        this.thisYearsTrip.push(trip)
      } else {
      this.thisYearsPending.push(trip)
      } 
    } else {
    this.previousYearsTrip.push(trip)
    }
  })
  console.log(this.previousYearsTrip)
  console.log(this.thisYearsTrip)
  console.log(this.thisYearsPending)
  }

  getAnnualTripsCost(userID) {
    const userTrips = this.travelersTrips.filter((trip) => {
      return trip.date.isSame(dayjs('1/1/2022'), 'year')
    })
    const findPrice = userTrips.reduce((acc, currentTrip) => {
      let currentDestination = this.destinations.find((location) => location.id === currentTrip.destinationID)
      return (acc += currentTrip.duration * currentDestination.estimatedLodgingCostPerDay
       + currentDestination.estimatedFlightCostPerPerson * currentTrip.travelers * 2)
    }, 0) * 1.1
    return findPrice.toFixed(2)
  }

  calculateTripCost(trip) {
    //console.log(this.destinations)
    let currentDest = this.destinations.find(dest => dest.id === trip.destinationID)
    console.log(currentDest)
    let totalCosts = (trip.duration * currentDest.estimatedLodgingCostPerDay) + (trip.travelers * currentDest.estimatedFlightCostPerPerson)
    let totalWithAgent = totalCosts + (totalCosts * 1.1)
    console.log(totalWithAgent)
    return totalWithAgent.toFixed(2)
  }
}



export default DataRepo