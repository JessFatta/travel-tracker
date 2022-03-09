import { expect } from 'chai'
import { travelerTestData } from './test-data'
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler1;
  let traveler2;
  let traveler3;
  
  beforeEach(() => {

    traveler1 = new Traveler(travelerTestData[0]);
    traveler2 = new Traveler(travelerTestData[1]);
    traveler3 = new Traveler(travelerTestData[2]);
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

  it('should instaniate the Traveler class', () => {
    expect(traveler1).to.be.an.instanceof(Traveler)
    expect(traveler2).to.be.an.instanceof(Traveler)
    expect(traveler3).to.be.an.instanceof(Traveler)
  })

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater')
  })

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal('relaxer')
  })

  it('should have a method to return the travelers first name', () => {
    expect(traveler1.getFirstName()).to.equal('Ham')
  })
})