import { travelerTestData } from "../test/test-data";

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName
  }

}


export default Traveler