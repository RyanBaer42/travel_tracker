import './css/styles.css';
import UserRepository from './UserRepository';
import Destinations from './Destinations'
import apiCalls from './apiCalls';
import domUpdates from './domUpdates';

//Global Variables
let userRepo;
let destinations;
let trips;
let currentUser;
let currentDate = '2020/12/01'

//query selectors
const pastTripSection = document.getElementById('tripsPerSectionPast')
const pendingTripsSection = document.getElementById('tripsPerSectionPending')
const upcomingTripsSection = document.getElementById('tripsPerSectionUpcoming')
const welcomeMessage = document.getElementById('welcomeMessage')
const yearsTotalCost = document.getElementById('tripsTotalCost')
const startDate = document.getElementById('start')
const tripDuration = document.getElementById('duration')
const numOfTravelers = document.getElementById('numOfTravelers')
const destinationOptions = document.getElementById('destinationOptions')
const singleTripCost = document.getElementById('singleTripCost')
const wrongInputError = document.getElementById('wrongInputError')
const loginSection = document.getElementById('loginSection')
const topHeader = document.getElementById('topHeader')
const tripsSection = document.getElementById('tripsSection')
const tripForm = document.getElementById('tripForm')
const loginForm = document.getElementById('loginForm')

tripForm.addEventListener('submit', function(event){
    event.preventDefault()
    saveNewTrip()
})
loginForm.addEventListener('submit', evaluateInformation)

//Promises
function resolvePromises(userId){
    Promise.all([apiCalls.loadGetData('http://localhost:3001/api/v1/travelers'),apiCalls.loadGetData('http://localhost:3001/api/v1/destinations'), apiCalls.loadGetData('http://localhost:3001/api/v1/trips')])
    .then((values) => {
        userRepo = new UserRepository(values[0].travelers)
        destinations = new Destinations(values[1].destinations)
        trips = values[2].trips
        assignUser(userId)
        updateDOM()
        addDestinationOptions()
    })
}

//Data Model

function assignUser(userId){
    currentUser = userRepo.returnSingleUser(userId)
    currentUser.filterTrips(trips)
}

function evaluateInformation(event){
    event.preventDefault()
    let userIdInput = username.value.split("r")[2]
    let userId = parseInt(userIdInput)
    let userTraveler = username.value.slice(0,8)
    let passwordInput = pass.value
    if(userTraveler === "traveler" && passwordInput === "travel" && userId <= 50 && userId){
      resolvePromises(userId)
      hideLogInPage()
    } else if (userTraveler !== "traveler" && passwordInput !== "travel"){
      domUpdates.invalidUsernameAndPassword(wrongInputError)
    } else if (userTraveler !== "traveler" || userId > 50 || !userId){
      domUpdates.invalidUsername(wrongInputError)
    } else if (passwordInput !== "travel") {
      domUpdates.invalidPassword(wrongInputError)
    }
}

function hideLogInPage(){
    loginSection.classList.add('hidden')
    topHeader.classList.remove('hidden')
    tripsSection.classList.remove('hidden')
}
//DOM 

function updateDOM(){
    findPastTrips()
    findPendingTrips()
    findUpcomingTrips()
    domUpdates.displayWelcomeMessage(currentUser)
    findYearCosts()
}

function convertStringToDate(string){
    return Date.parse(string)
}

function createTripObject(array){
    return array.map(trip => {
        return {
            destination: destinations.findById(trip.destinationID).destination,
            image: destinations.findById(trip.destinationID).image,
            alt: destinations.findById(trip.destinationID).alt,
        }
    })
}

function findPastTrips(){
    const pastTrips = currentUser.userTrips.filter(trip => {
       return convertStringToDate(trip.date) < convertStringToDate(currentDate) && trip.status === 'approved'
    })
    let newArray = createTripObject(pastTrips)
    domUpdates.showTrips(newArray, pastTripSection)
}

function findPendingTrips(){
    const pendingTrips = currentUser.userTrips.filter(trip => {
        return convertStringToDate(trip.date) > convertStringToDate(currentDate) && trip.status === 'pending'
    })
    let newArray = createTripObject(pendingTrips)
    domUpdates.showTrips(newArray, pendingTripsSection)
}

function findUpcomingTrips(){
    const upcomingTrips = currentUser.userTrips.filter(trip => {
        return convertStringToDate(trip.date) > convertStringToDate(currentDate) && trip.status === 'approved'
    })
    let newArray = createTripObject(upcomingTrips)
    domUpdates.showTrips(newArray, upcomingTripsSection)
}

function findYearCosts(){
    const lastYear = new Date(new Date(currentDate) - 365 * 24 * 60 * 60 * 1000)
    const lastYearCosts = currentUser.userTrips.filter(trip => {
        return (convertStringToDate(trip.date) < convertStringToDate(currentDate)) && (convertStringToDate(trip.date) > convertStringToDate(lastYear)) && (trip.status === 'approved')
    }).reduce((acc, trip)=> {
        acc += destinations.calculateCosts(trip.destinationID, trip.travelers, trip.duration)
        return acc
    }, 0)
    domUpdates.showYearCosts(yearsTotalCost, lastYearCosts)
}

function addDestinationOptions(){
    destinationOptions.innerHTML += destinations.data.map(destination => {
        return `
        <option>${destination.destination}</option>
        `
    })
}

function saveNewTrip(){
    let newTrip = {
        id: trips.length + 1,
        userID: currentUser.id,
        destinationID: destinations.findByName(destinationOptions.value).id,
        travelers: numOfTravelers.valueAsNumber,
        date: startDate.value.split('-').join('/'),
        duration: tripDuration.valueAsNumber,
        status: 'pending',
        suggestedActivities: [],}
    apiCalls.postNewTrip(newTrip)
    .then(response => {
        if(!response.ok) {
          throw new Error("Data failed to post");
        }
        resolvePromises(currentUser.id)
        domUpdates.displayNewTripCost(newTrip, destinations)
        return response.json();
      })
}