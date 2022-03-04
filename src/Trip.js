import Destination from "./Destination";

class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities
  }


  getDestinationName(destinationTestData) {
    const destination = destinationTestData.find(destination => {
      if(destination.id === this.destinationID) {
        this.destinationName = destination.destination
        this.destinationImage = destination.destinationImage
        this.destinationAlt = destination.alt
      }
    })
    return destination
  }

  calculateTripCost(destinationTestData) {
    let tripCost = 0;
    let agentCharge = .1;
    destinationTestData.forEach(destination => {
      if(this.destinationID === destination.id) {
        const flightsCost = destination.estimatedFlightCostPerPerson * this.travelers
        const lodgingCost = destination.estimatedLodgingCostPerDay * this.duration * this.travelers
        tripCost += flightsCost
        tripCost += lodgingCost
      }
    })
    let totalWithFee = tripCost * agentCharge 
    return totalWithFee + tripCost
  }
}

export default Trip 