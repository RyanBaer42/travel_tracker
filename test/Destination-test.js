import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User'
import Destinations from '../src/Destinations'

describe('Destinations', () => {
    let destinationData;
    let destinations;
    beforeEach(() => {
        destinationData = [
            {
            id: 1,
            destination: "Lima, Peru",
            estimatedLodgingCostPerDay: 70,
            estimatedFlightCostPerPerson: 400,
            image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            alt: "overview of city buildings with a clear sky"
            },
            {
            id: 2,
            destination: "Stockholm, Sweden",
            estimatedLodgingCostPerDay: 100,
            estimatedFlightCostPerPerson: 780,
            image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            alt: "city with boats on the water during the day time"
            },
            {
            id: 3,
            destination: "Sydney, Austrailia",
            estimatedLodgingCostPerDay: 130,
            estimatedFlightCostPerPerson: 950,
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            alt: "opera house and city buildings on the water with boats"
            },
            {
            id: 4,
            destination: "Cartagena, Colombia",
            estimatedLodgingCostPerDay: 65,
            estimatedFlightCostPerPerson: 350,
            image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
            alt: "boats at a dock during the day time"
            },
            {
            id: 5,
            destination: "Madrid, Spain",
            estimatedLodgingCostPerDay: 150,
            estimatedFlightCostPerPerson: 650,
            image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            alt: "city with clear skys and a road in the day time"
            },
            {
            id: 6,
            destination: "Jakarta, Indonesia",
            estimatedLodgingCostPerDay: 70,
            estimatedFlightCostPerPerson: 890,
            image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            alt: "lit up city at night"
            },
            {
            id: 7,
            destination: "Paris, France",
            estimatedLodgingCostPerDay: 100,
            estimatedFlightCostPerPerson: 395,
            image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
            alt: "city during the day time with eiffel tower"
            },
            {
            id: 8,
            destination: "Tokyo, Japan",
            estimatedLodgingCostPerDay: 125,
            estimatedFlightCostPerPerson: 1000,
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
            alt: "city with people walking in crosswalk and brightly lit shops at night"
            },
            {
            id: 9,
            destination: "Amsterdam, Netherlands",
            estimatedLodgingCostPerDay: 100,
            estimatedFlightCostPerPerson: 950,
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            alt: "canal with boats and trees and buildings along the side"
            },
            {
            id: 10,
            destination: "Toronto, Canada",
            estimatedLodgingCostPerDay: 90,
            estimatedFlightCostPerPerson: 450,
            image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
            },
        ]
        destinations = new Destinations(destinationData)
    })
    it('Should be a function', function(){
        expect(Destinations).to.be.a('function')
    })
    it('should be an instance of Destinations', function(){
        expect(destinations).to.be.a.instanceOf(Destinations)
    })
    it('should store all destination data in a attribute', function(){
        expect(destinations.data).to.equal(destinationData)
    })
    it('Should return a single destination by its id', function(){
        expect(destinations.findById(1)).to.equal(destinationData[0])
    })
    it('Should return a single destination based off of its name', function(){
        expect(destinations.findByName("Paris, France")).to.equal(destinationData[6])
    })
    it('Should calculate the cost of traveling to a destination based on the locations ID, number of visitors, and days. Accounting for the 10% agent fee', function(){
        expect(destinations.calculateCosts(10, 2, 10)).to.equal(2970)
    })
})