import { expect } from 'chai'
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler;
  let travelerData;
  
  beforeEach(() => {
    travelerData = {
      id: 1,
      name: 'Ham Leadbeater',
      travelerType: 'relaxer'
    }

    traveler = new Traveler(travelerData)
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

  it('should instaniate the Traveler class', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  })

  it('should have an id', () => {
    expect(traveler.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater')
  })

  it('should have a traveler type', () => {
    expect(traveler.travelerType).to.equal('relaxer')
  })

  it('should have a method to calculate total amount spent on trips and include a 10% agent fee', () => {
    expect(traveler.totalAmountSpent())
  })
  //maybe it should store an array of trips?
})