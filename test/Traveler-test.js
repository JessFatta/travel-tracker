import { expect } from 'chai'
import { travelerTestData } from './test-data'
import Traveler from '../src/Traveler'


describe('Traveler', () => {
  //let traveler;
  //let travelerData;
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

  
  // it('should be able to store all trips for a user', () => {
  //     expect(traveler1.allTripsForCurrentUser().to.deep.equal([]))
  //     //maybe it should store an array of trips?
  //   })
    
    // it('should have a method to calculate total amount spent on trips and include a 10% agent fee', () => {
    //   expect(traveler1.getYearlyAmountSpent())
    // })
  //should be able to see past, current, upcoming, and pending trips
  //should be able to make a trip request
  //should be able to select a date, duration, num travelers, select destination
  //should see estimated cost with 10% fee after making a selection
  //should see a pending response after submitting trip request
})