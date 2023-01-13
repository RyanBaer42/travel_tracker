import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User'

describe('User', () => {
    let userData;
    let user1;
    let user2;
    beforeEach(() => {
        userData = [
            {
            id: 1,
            name: "Ham Leadbeater",
            travelerType: "relaxer"
            },
            {
            id: 2,
            name: "Rachael Vaughten",
            travelerType: "thrill-seeker"
            },
            {
            id: 3,
            name: "Sibby Dawidowitsch",
            travelerType: "shopper"
            },
            {
            id: 4,
            name: "Leila Thebeaud",
            travelerType: "photographer"
            },
            {
            id: 5,
            name: "Tiffy Grout",
            travelerType: "thrill-seeker"
            }
        ]
        user1 = new User(userData[0])
        user2 = new User(userData[1])
    });
    it('Should be a function', function (){
        expect(User).to.be.a('function')
    })
    it('Should be an intance of a user', function(){
        expect(user1).to.be.a.instanceOf(User)
    })
    it('Should store the ID of the user being passed in', function(){
        expect(user1.id).to.equal(1)
    })
    it('Should store the name of the user being passed in', function(){
        expect(user1.name).to.equal("Ham Leadbeater")
    })
    it('Should store the travel type of the user being passed in', function(){
        expect(user1.travelerType).to.equal("relaxer")
    })
    it('Should have a method that returns the first name of the User', function(){
        expect(user1.returnFirstName()).to.equal("Ham")
    })
    it('should be able to store the name, ID, and travel type of a different user', function(){
        expect(user2.id).to.equal(2)
        expect(user2.name).to.equal("Rachael Vaughten")
        expect(user2.travelerType).to.equal("thrill-seeker")
    })
    it('should be able to filter the users tips out of all trips data and store them in an attribute', function(){
        const tripData = [
                {
                id: 1,
                userID: 44,
                destinationID: 49,
                travelers: 1,
                date: "2022/09/16",
                duration: 8,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 2,
                userID: 1,
                destinationID: 25,
                travelers: 5,
                date: "2022/10/04",
                duration: 18,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 3,
                userID: 3,
                destinationID: 22,
                travelers: 4,
                date: "2022/05/22",
                duration: 17,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 4,
                userID: 1,
                destinationID: 14,
                travelers: 2,
                date: "2022/02/25",
                duration: 10,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 5,
                userID: 42,
                destinationID: 29,
                travelers: 3,
                date: "2022/04/30",
                duration: 18,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 6,
                userID: 29,
                destinationID: 35,
                travelers: 3,
                date: "2022/06/29",
                duration: 9,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 7,
                userID: 37,
                destinationID: 17,
                travelers: 5,
                date: "2022/5/28",
                duration: 20,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 8,
                userID: 36,
                destinationID: 39,
                travelers: 6,
                date: "2022/02/07",
                duration: 4,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 9,
                userID: 24,
                destinationID: 19,
                travelers: 5,
                date: "2022/12/19",
                duration: 19,
                status: "approved",
                suggestedActivities: [ ]
                },
                {
                id: 10,
                userID: 9,
                destinationID: 50,
                travelers: 6,
                date: "2022/07/23",
                duration: 17,
                status: "approved",
                suggestedActivities: [ ]
                },
        ]
        user1.filterTrips(tripData)
        expect(user1.userTrips).to.deep.equal([
            {
            id: 2,
            userID: 1,
            destinationID: 25,
            travelers: 5,
            date: "2022/10/04",
            duration: 18,
            status: "approved",
            suggestedActivities: [ ]
            },
            {
            id: 4,
            userID: 1,
            destinationID: 14,
            travelers: 2,
            date: "2022/02/25",
            duration: 10,
            status: "approved",
            suggestedActivities: [ ]
            }
        ])
    })
})