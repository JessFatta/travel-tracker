import Destination from "./Destination";
import dayjs from 'dayjs'

class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = dayjs(trip.date);
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
}

export default Trip 