import { expect } from 'chai'

import Traveler from '../src/Traveler'
import DataRepo from '../src/DataRepo'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import { travelerTestData, tripsTestData, destinationTestData } from './test-data'

describe('DataRepo', () => {
  let dataRepo
  let travelerData
  let tripData
  let destinationData
  // let traveler1
  // let traveler2
   let traveler3
  //let travelers;
  let dataRepoTestData
  

  beforeEach(() => {

    travelerData = travelerTestData.map((traveler) => new Traveler(traveler))
    tripData = tripsTestData.map((trip) => new Trip(trip))
    destinationData = destinationTestData.map((destination) => new Destination(destination))
    // traveler1 = new Traveler(travelerTestData[0])
    // traveler2 = new Traveler(travelerTestData[1])
    traveler3 = new Traveler(travelerTestData[2])
    
    dataRepoTestData = {
      travelers: travelerData,
      trips: tripData,
      destinations: destinationData
    }
    dataRepo = new DataRepo(dataRepoTestData)
  })

  it('should be a function', () => {
    expect(DataRepo).to.be.a('function')
  })

  it('should instantiate TravelersRepo', () => {
    expect(dataRepo).to.be.an.instanceof(DataRepo)
  })

  it('should have traveler, trip, and destination data', () => {
    expect(dataRepo.travelers).to.deep.equal(travelerData)
    expect(dataRepo.trips).to.deep.equal(tripData)
    expect(dataRepo.destinations).to.deep.equal(destinationData)

  })

  it('should store a list of trips for a traveler', () => {
    expect(dataRepo.getTravelerTrips()).to.deep.equal
    ([])
  })

  it('should calculate annual trips cost for a user', () => {
    expect(dataRepo.getAnnualTripsCost()).to.equal(1990)
  })
})