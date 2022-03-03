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
})