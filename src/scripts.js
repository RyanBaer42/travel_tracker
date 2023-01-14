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
let currentUser;
let currentDate = '2020/06/01'

//query selectors
const pastTripSection = document.getElementById('pastTrips')
const pendingTripsSection = document.getElementById('pendingTrips')
const upcomingTripsSection = document.getElementById('upcomingTrips')
const welcomeMessage = document.getElementById('welcomeMessage')
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
        return data
    })
}


//Promises
function resolvePromises(){
    Promise.all([loadTravelerData(),loadDestinationData(), loadTripsData()])
    .then((values) => {
        userRepo = new UserRepository(values[0].travelers)
        destinations = new Destinations(values[1].destinations)
        trips = values[2].trips
        assignUser(33)
        updateDOM()
    })
}

//Data Model

function assignUser(userId){
    currentUser = userRepo.returnSingleUser(userId)
    currentUser.filterTrips(trips)
}

//DOM 

function updateDOM(){
    showPastTrips()
    showPendingTrips()
    showUpcomingTrips()
    displayWelcomeMessage()
}

function convertStringToDate(string){
    return Date.parse(string)
}

function showPastTrips(){
    const pastTrips = currentUser.userTrips.filter(trip => {
       return convertStringToDate(trip.date) < convertStringToDate(currentDate) && trip.status === 'approved'
    }).map(trip => {
        return {
            destination: destinations.findById(trip.destinationID).destination,
            image: destinations.findById(trip.destinationID).image,
        }
    })
    pastTripSection.innerHTML += pastTrips.map(trip => {
        return `
        <div class="single-trip">
            <img class="trip-image" src="${trip.image}">
            <p>${trip.destination}</p>
        </div>
        `
    })
}

function showPendingTrips(){
    const pendingTrips = currentUser.userTrips.filter(trip => {
        return convertStringToDate(trip.date) > convertStringToDate(currentDate) && trip.status === 'pending'
    }).map(trip => {
        return {
            destination: destinations.findById(trip.destinationID).destination,
            image: destinations.findById(trip.destinationID).image,
        }
    })
    pendingTripsSection.innerHTML += pendingTrips.map(trip => {
        return `
        <div class="single-trip">
            <img class="trip-image" src="${trip.image}">
            <p>${trip.destination}</p>
        </div>
        `
    })
}

function showUpcomingTrips(){
    const upcomingTrips = currentUser.userTrips.filter(trip => {
        return convertStringToDate(trip.date) > convertStringToDate(currentDate) && trip.status === 'approved'
    }).map(trip => {
        return {
            destination: destinations.findById(trip.destinationID).destination,
            image: destinations.findById(trip.destinationID).image,
        }
    })
    upcomingTripsSection.innerHTML += upcomingTrips.map(trip => {
        return `
        <div class="single-trip">
            <img class="trip-image" src="${trip.image}">
            <p>${trip.destination}</p>
        </div>
        `
    })
}

function displayWelcomeMessage(){
    welcomeMessage.innerText = `Welcome ${currentUser.returnFirstName()}!`
}

