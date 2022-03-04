import { expect } from 'chai'

import Traveler from '../src/Traveler'
import TravelerRepo from '../src/TravelerRepo'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import { travelerTestData, tripsTestData, destinationTestData } from './test-data'

describe('TravelerRepo', () => {
  let travelerRepo
  let traveler1
  let traveler2
  let traveler3
  let travelers;
  let destinations = []
  let trips = []

  beforeEach(() => {

    travelers = [traveler1, traveler2, traveler3]
    traveler1 = new Traveler(travelerTestData[0])
    traveler2 = new Traveler(travelerTestData[1])
    traveler3 = new Traveler(travelerTestData[2])
    travelerRepo = new TravelerRepo(travelers)
  })

  it('should be a function', () => {
    expect(TravelerRepo).to.be.a('function')
  })

  it('should instantiate TravelersRepo', () => {
    expect(travelerRepo).to.be.an.instanceof(TravelerRepo)
  })

  // it('should have an array of travelers', () => {
  //   //expect(travelerRepo.travelers.length).to.equal(3)
  //   expect(travelerRepo.travelers[0]).to.equal(traveler1)
  // })

  // it('should store a list of trips for a traveler', () => {
  //   expect(traveler3.getTravelerTrips(traveler3, tripsTestData)).to.deep.equal
  //   ([tripsTestData[2], tripsTestData[3]])
  // })

  it('should calculate annual trips cost for a user', () => {
    expect(travelerRepo.getAnnualTripsCost(traveler1, 2022, destinationTestData)).to.equal(1990)
  })
})