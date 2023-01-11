import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User'

describe('User Repository', () => {
    let UserRepo;
    let UserData;
    beforeEach(() => {
        UserData = [
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
            },
            {
            id: 6,
            name: "Laverna Flawith",
            travelerType: "shopper"
            },
            {
            id: 7,
            name: "Emmet Sandham",
            travelerType: "relaxer"
            },
            {
            id: 8,
            name: "Carlin O'Reilly",
            travelerType: "history buff"
            },
            {
            id: 9,
            name: "Natalee Deegin",
            travelerType: "relaxer"
            },
            {
            id: 10,
            name: "Rickie Jodlowski",
            travelerType: "relaxer"
            },
            {
            id: 11,
            name: "Joy Dovington",
            travelerType: "history buff"
            },
            {
            id: 12,
            name: "Lannie Heynel",
            travelerType: "history buff"
            },
            {
            id: 13,
            name: "Torin Billington",
            travelerType: "photographer"
            },
            {
            id: 14,
            name: "Ellynn Kyne",
            travelerType: "history buff"
            },
            {
            id: 15,
            name: "Emeline Winslet",
            travelerType: "history buff"
            }]
        UserRepo = new UserRepository(UserData)
    })

    it('should be a function', function(){
        expect(UserRepository).to.be.a('function')
    })
    it('should be an instance of a UserRepository', function(){
        expect(UserRepo).to.be.a.instanceOf(UserRepository)
    })
    it('should store all user data', function(){
        expect(UserRepo.userData).to.deep.equal(UserData)
    })
    it('should create a single user based on the user ID being passed in', function(){
        var newUser = new User(UserData[0])
        expect(UserRepo.returnSingleUser(1)).to.deep.equal(newUser)
    })
})