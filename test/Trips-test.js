import { expect } from 'chai'
import { destinationTestData, tripsTestData, travelerTestData } from './test-data'
import Trip from '../src/Trip'
import Destination from '../src/Destination'
import DataRepo from '../src/DataRepo'
import dayjs from 'dayjs'

describe('Trips', () => {
  let trip1;
  let trip2;
  let trip3;

  beforeEach(() => {

    trip1 = new Trip(tripsTestData[0]);
    trip2 = new Trip(tripsTestData[1]);
    trip3 = new Trip(tripsTestData[2]);
  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function')
  })

  it('should instantiate the Trip class', () => {
    expect(trip1).to.be.an.instanceof(Trip)
    expect(trip2).to.be.an.instanceof(Trip)
    expect(trip3).to.be.an.instanceof(Trip)
  })

  it('should have a trip ID', () => {
    expect(trip1.id).to.equal(1)
  })

  it('should have a user ID', () => {
    expect(trip1.userID).to.equal(1)
  })

  it('should have a destination ID', () => {
    expect(trip1.destinationID).to.equal(3)
  })

  it('should have the amount of travelers', () => {
    expect(trip1.travelers).to.equal(1)
  })

  it('should have a date', () => {
    expect(trip1.date.year()).to.equal(2022)
  })

  it('should have a duration', () => {
    expect(trip1.duration).to.equal(8)
  })

  it('should have a status', () => {
    expect(trip1.status).to.equal('approved')
  })

  it('should have suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([])
  })

  it('should have a method to return the destination name', () => {
    trip1.getDestinationName(destinationTestData)
    expect(trip1.destinationName).to.equal('Sydney, Australia')
  })
})