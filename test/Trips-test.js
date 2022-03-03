import { expect } from 'chai'
import { tripsTestData } from './test-data'
import Trip from '../src/Trip'

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

  it('should instantiate the Trips class', () => {
    expect(trip1).to.be.an.instanceof(Trip)
    expect(trip2).to.be.an.instanceof(Trip)
    expect(trip3).to.be.an.instanceof(Trip)
  })

  it('should have a trip ID', () => {
    expect(trip1.id).to.equal(1)
  })

  it('should have a user ID', () => {
    expect(trip1.userID).to.equal(44)
  })

  it('should have a destination ID', () => {
    expect(trip1.destinationID).to.equal(49)
  })

  it('should have the amount of travelers', () => {
    expect(trip1.travelers).to.equal(1)
  })

  it('should have a date', () => {
    expect(trip1.date).to.equal('2022/09/16')
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
})