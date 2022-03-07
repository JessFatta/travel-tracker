import { expect } from 'chai'

import Traveler from '../src/Traveler'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import DataRepo from '../src/DataRepo'
import { travelerTestData, tripsTestData, destinationTestData } from './test-data'

describe('DataRepo', () => {
  let dataRepo
  let travelerData
  let tripData
  let destinationData
  let dataRepoTestData
  

  beforeEach(() => {

    travelerData = travelerTestData.map((traveler) => new Traveler(traveler))
    tripData = tripsTestData.map((trip) => new Trip(trip))
    destinationData = destinationTestData.map((destination) => new Destination(destination))
    
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

  it('should instantiate DataRepo', () => {
    expect(dataRepo).to.be.an.instanceof(DataRepo)
  })

  it('should have traveler data', () => {
    expect(dataRepo.travelers).to.deep.equal(travelerData)
  })

  it('should have trip data', () => {
    expect(dataRepo.trips).to.deep.equal(tripData)
  })

  it('should have destination data', () => {
    expect(dataRepo.destinations).to.deep.equal(destinationData)
  })

  it('should have a method to return the traveler', () => {
    expect(dataRepo.getNewTraveler(travelerData)).to.equal()
  })

  it('should have a method to store a list of trips for a traveler', () => {
    expect(dataRepo.getTravelerTrips(3)).to.deep.equal
    ([{
      id: 3,
      userID: 3,
      destinationID: 1,
      travelers: 4,
      date: "2022/04/22",
      duration: 7,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 4,
      userID: 3,
      destinationID: 2,
      travelers: 4,
      date: "2022/05/22",
      duration: 17,
      status: "approved",
      suggestedActivities: []
    }])
  })

  it('should have a method to determine current date', () => {
    expect(dataRepo.getCurrentDate(tripData)).to.equal()
  })

  it('should have a method to determine past trips', () => {
    expect(dataRepo.getPastTrips(tripData)).to.equal()
  })

  // it('should calculate annual trips cost for a user', () => {
  //   console.log(tripsTestData[2])
  //   expect(dataRepo.getAnnualTripsCost(tripsTestData[2]).id).to.equal()
  // })
})