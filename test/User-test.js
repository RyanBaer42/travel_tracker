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
})