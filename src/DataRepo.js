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
    this.travelersTrips = [];
    this.thisYearsTrip = [];
    //this.thisYearsApproved = [];
    this.previousYearsTrip = [];
    this.thisYearsPending = [];
  }

  getNewTraveler(id) {
    let currentTraveler = this.travelers.find(traveler => traveler.id === id)
    this.getTravelerTrips(id)
    console.log(currentTraveler)
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
    return destName
  }

  // sortTrips() {
  //   this.travelersTrips.forEach(trip => {
  //   this.getDestinationName(trip.destinationID)
  //   if(dayjs(trip.date).year() === 2022) {
  //     this.thisYearsTrip.push(trip)
  //     if(trip.status === 'approved') {
  //       this.thisYearsTrip.push(trip)
  //     } else {
  //     this.thisYearsPending.push(trip)
  //     } 
  //   } else {
  //   this.previousYearsTrip.push(trip)
  //   }
  // })
  // }



//   sortTrips() {
//     this.travelersTrips.forEach(trip => {
//     this.getDestinationName(trip.destinationID)
//     if(dayjs(trip.date).year() === 2022) {
//       this.thisYearsTrip.push(trip)
//       if(trip.status === 'pending') {
//         this.thisYearsPending.push(trip)
//       }
//     } else {
//     this.previousYearsTrip.push(trip)
//     }
//   })
// }

  sortTrips() {
    this.travelersTrips.forEach(trip => {
    this.getDestinationName(trip.destinationID)
    if(dayjs(trip.date).year() === 2022 && !this.thisYearsTrip.includes(trip)) {
      this.thisYearsTrip.push(trip)
      if(trip.status === 'pending' && !this.thisYearsPending.includes(trip)) {
      this.thisYearsPending.push(trip)
      }
    } else if (dayjs(trip.date).year() < 2022 && !this.previousYearsTrip.includes(trip)) {
      this.previousYearsTrip.push(trip)
    }
  })
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
    let currentDest = this.destinations.find(dest => dest.id === trip.destinationID)
    let totalCosts = (trip.duration * currentDest.estimatedLodgingCostPerDay) + (trip.travelers * currentDest.estimatedFlightCostPerPerson)
    let totalWithAgent = totalCosts + (totalCosts * 1.1)
    return totalWithAgent.toFixed(2)
  }
}



export default DataRepo