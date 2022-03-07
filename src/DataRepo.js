//import dayjs from "dayjs";

import Traveler from "./Traveler";
import Trip from "./Trip";
import Destination from "./Destination";


class DataRepo {
  constructor(data) {
    this.travelers = data.travelers;
    this.trips = data.trips;
    this.destinations = data.destinations
    this.date;

    //this.currentTraveler;
  }

  getNewTraveler(travelerData) {
    this.currentTraveler = new Traveler(travelerData)
    //console.log(this.currentTraveler)
    //console.log(travelerData)
    this.currentTraveler.allTrips = this.getTravelerTrips(this.currentTraveler.id)
    //console.log(this.currentTraveler.allTrips)
  }

  getTravelerTrips(userID) {
    const tripsByUserId = this.trips.filter(trip => trip.userID === userID)
    return tripsByUserId
  }


  getPastTrips(currentDate) {
    const allPastTrips = this.trips.filter(trip => {
      const tripDate = new Date(`${trip.date}`).getTime()
      if(currentDate > tripDate) {
        return trip
      }
    })
    this.pastTrips = allPastTrips
    //console.log(allPastTrips)
    return allPastTrips
  }

  getUpcomingTrips(currentDate) {
    const allUpcomingTrips = this.trips.filter(trip => {
      const tripDate = new Date(`${trip.date}`).getTime()
      if(currentDate < tripDate && trip.status === 'approved') {
        return trip
      }
    })
    this.upcomingTrips = allUpcomingTrips
    return allUpcomingTrips
  }

  getPendingTrips() {
    const allPendingTrips = this.trips.filter(trip => {
      if(trip.status === 'pending') {
        return trip
      }
    })
    return allPendingTrips
  }


  sortTrips() {
    const currentDate = Date.now()
    this.getPastTrips(currentDate)
  }

  // getCurrentDate(trips) {
  //   //console.log("TRI{", trips)

  //   console.log("HI", trips[1])

  //   // let today = new Date()
  //   // let thisYear = new Date(today).getFullYear()
  //   // console.log(thisYear)
    
  //   let startDate = new Date(trips[1].date)
  //   let currentTrip = trips[1].date 
  //   console.log('HEYYYY', startDate)

  //   let tripDate = new Date(`${currentTrip}`).getTime()
  //   console.log("TRIPDATE", tripDate)

  //   let tripDuration = trips[1].duration
  //   // let math = currentTrip + tripDuration
  //   // console.log("MATH", math)

  //   //let findEndDate = 

  //   let endDate = startDate.setDate(startDate.getDate() + tripDuration)
  //   console.log("END DATE", endDate)
    
  //   return new Date(trips.date).valueOf() <= new Date().valueOf() &&
  //   new Date(endDate).valueOf() >= new Date().valueOf()
  //   console.log("END DATE", endDate)
  // }

  // isAfterToday(trip) {
  //   return new Date(trip.date).valueOf() > new Date().valueOf();
  // }

  // isBeforeToday(trip) {
  //   let endDate = trip.date.setDate(trip.duration)
  //   return new Date(endDate).valueOf() < new Date().valueOf();
  // }


  // sortAllTravelerTrips() {
  //   this.currentTraveler.allTrips.forEach(trip => {
  //     //trip.date = trip.date.replaceAll('/', '-');
  //     trip.date = trip.date.split('/').join('-')
  //     console.log("HEY", trip.date)
  //     if(getCurrentDate(trip)) {
  //       this.currentTraveler.presentTrips.push(trip)
  //     } else if (isAfterToday(trip)){
  //       this.currentTraveler.upcomingTrips.push(trip)
  //     } else if (isBeforeToday(trip)){
  //       this.currentTraveler.pastTrips.push(trip)
  //     } else if (trip.status === "pending") {
  //       this.currentTraveler.pendingTrips.push(trip)
  //     }
  //   })
  }



//   getAnnualTripsCost(userID) {
//     const userTrips = this.trips.filter((trip) => {
//       return trip.userID === userID && trip.date.isSame(dayjs('1/1/2022'), 'year')
//     })
//     const findPrice = userTrips.reduce((acc, currentTrip) => {
//       let currentDestination = this.destinations.find((location) => location.id === currentTrip.destinationID)
//       return (acc += currentTrip.duration * currentDestination.estimatedLodgingCostPerDay
//        + currentDestination.estimatedFlightCostPerPerson * currentTrip.travelers * 2)
//     }, 0)
//     return findPrice
//   }



//}


export default DataRepo