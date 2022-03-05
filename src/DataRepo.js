import dayjs from "dayjs";

class DataRepo {
  constructor(data) {
    this.travelers = data.travelers;
    this.trips = data.trips;
    this.destinations = data.destinations
  }

  getTravelerTrips(userID) {
    const tripsByUserId = this.trips.filter(trip => trip.userID === userID)
    return tripsByUserId
  }

  // getAnnualTripsCost(userID) {
  //   // const userTrips = this.trips.filter((trip) => {
  //   //   return trip.userID === userID && trip.date.isSame(dayjs(''))
  //   // })
  //   const findPrice = userTrips.reduce((acc, trip) => {
  //     if(trip.date.includes(year)) {
  //       acc += trip.getAnnualTripCost
  //       return acc
  //     }
  //   })
  //   return findPrice
  // }
}


export default DataRepo