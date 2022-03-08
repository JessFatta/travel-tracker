import { travelerTestData } from "../test/test-data";
import Trip from "./Trip"

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType
    this.allTrips;
    // this.pastTrips = [];
    // this.travelersTrips = []
    // this.presentTrips = [];
    // this.upcomingTrips = [];
    // this.pendingTrips = [];
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName
  }

  // getPastTrips(currentDate) {
  //   const allPastTrips = this.trips.filter(trip => {
  //     const tripDate = new Date(`${trip.date}`).getTime()
  //     if(currentDate > tripDate) {
  //       return trip
  //     }
  //   })
  //   this.pastTrips = allPastTrips
  //   //console.log(allPastTrips)
  //   return allPastTrips
  // }

  // sortTrips() {
  //   const currentDate = Date.now()
  //   this.getPastTrips(currentDate)
  // }

}


export default Traveler