import { travelerTestData } from "../test/test-data";
import Trip from "./Trip"

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType
    this.allTrips;
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName
  }
}


export default Traveler