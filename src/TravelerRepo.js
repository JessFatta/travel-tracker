class TravelerRepo {
  constructor(data) {
    this.travelers = data
  }

  getTravelerTrips(traveler, tripsTestData) {
    const tripsByUserId = tripsTestData.filter(trip => trip.userID === traveler.id)
    traveler.trips = tripsByUserId
  }

  getAnnualTripsCost(traveler, year, destinationTestData) {
    const findPrice = traveler.trips.reduce((acc, trip) => {
      if(trip.date.includes(year)) {
        acc += trip.getAnnualTripCost
        return acc
      }
    })
    return findPrice
  }
}


export default TravelerRepo