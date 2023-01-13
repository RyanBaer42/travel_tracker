import './css/styles.css';
import UserRepository from './UserRepository';
import Destinations from './Destinations'
import User from './User';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//Global Variables
let userRepo;
let destinations;
let trips;

//Event Listeners
window.addEventListener('load', function(){
    resolvePromises()
})
// API Calls GET Requests
function loadTravelerData(){
    const travelersURL = 'http://localhost:3001/api/v1/travelers'
    return fetch(travelersURL)
    .then((response) => {
        if (response.ok){
                return response.json()
        }
    })
    .then((data) => {
        console.log(data)
        return data
    })
}

function loadDestinationData(){
    const destinationURL = 'http://localhost:3001/api/v1/destinations'
    return fetch(destinationURL)
    .then((response) => {
        if (response.ok){
                return response.json()
        }
    })
    .then((data) => {
        console.log(data)
        return data
    })
}

function loadTripsData(){
    const tripsURL = 'http://localhost:3001/api/v1/trips'
    return fetch(tripsURL)
    .then((response) => {
        if (response.ok){
                return response.json()
        }
    })
    .then((data) => {
        console.log(data)
        return data
    })
}


//Promises
function resolvePromises(){
    Promise.all([loadTravelerData(),loadDestinationData(), loadTripsData()])
    .then((values) => {
        userRepo = new UserRepository(values[0].travelers)
        destinations = new Destinations(values[1])
        trips = values[2]
        assignUser(1)
        // updateDOM()
    })
}

//Data Model

function assignUser(userId){
    let currentUser = userRepo.returnSingleUser(userId)
    currentUser.filterTrips()
}

//DOM 
// function updateDOM(){
//     showPastTrips()
// }


// function showPastTrips(){
    
// }


