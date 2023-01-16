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
//Event Listeners
// window.addEventListener('load', function(){
//     resolvePromises()
// })
tripForm.addEventListener('submit', postNewTrip)
loginForm.addEventListener('submit', evaluateInformation)


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
function resolvePromises(userId){
    Promise.all([loadTravelerData(),loadDestinationData(), loadTripsData()])
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

function postNewTrip(event){
    event.preventDefault()
    let newTrip = {
        id: trips.length + 1,
        userID: currentUser.id,
        destinationID: destinations.findByName(destinationOptions.value).id,
        travelers: numOfTravelers.valueAsNumber,
        date: startDate.value.split('-').join('/'),
        duration: tripDuration.valueAsNumber,
        status: 'pending',
        suggestedActivities: [],}
    fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip), 
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if(!response.ok) {
          throw new Error("Data failed to post");
        }
        resolvePromises(currentUser.id)
        displayNewTripCost(newTrip)
        return response.json();
      })
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
      invalidUsernameAndPassword()
    } else if (userTraveler !== "traveler" || userId > 50 || !userId){
      invalidUsername()
    } else if (passwordInput !== "travel") {
      invalidPassword()
    }
}

function invalidUsernameAndPassword(){
    wrongInputError.innerText = "Invalid username and password"
}
  
function invalidUsername(){
    wrongInputError.innerText = "Invalid username"
}
  
function invalidPassword(){
    wrongInputError.innerText = "Invalid password"
}

function hideLogInPage(){
    loginSection.classList.add('hidden')
    topHeader.classList.remove('hidden')
    tripsSection.classList.remove('hidden')
}
//DOM 

function updateDOM(){
    showPastTrips()
    showPendingTrips()
    showUpcomingTrips()
    displayWelcomeMessage()
    displayYearCosts()
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
            alt: destinations.findById(trip.destinationID).alt,
        }
    })
    pastTripSection.innerHTML = " "
    pastTrips.forEach(trip => {
        pastTripSection.innerHTML +=  `
        <div tabindex="0" class="single-trip">
            <img class="trip-image" src="${trip.image}" alt="${trip.alt}">
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
            alt: destinations.findById(trip.destinationID).alt,
        }
    })
    pendingTripsSection.innerHTML = " "
    pendingTrips.forEach(trip => {
        pendingTripsSection.innerHTML += `
        <div tabindex="0" class="single-trip">
            <img class="trip-image" src="${trip.image}" alt="${trip.alt}">
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
            alt: destinations.findById(trip.destinationID).alt,
        }
    })
    upcomingTripsSection.innerHTML = " "
    upcomingTrips.forEach(trip => {
        upcomingTripsSection.innerHTML += `
        <div tabindex="0" class="single-trip">
            <img class="trip-image" src="${trip.image}" alt="${trip.alt}">
            <p>${trip.destination}</p>
        </div>
        `
    })
}

function displayWelcomeMessage(){
    welcomeMessage.innerText = `Welcome ${currentUser.returnFirstName()}!`
}

function displayYearCosts(){
    const lastYear = new Date(new Date(currentDate) - 365 * 24 * 60 * 60 * 1000)
    const lastYearCosts = currentUser.userTrips.filter(trip => {
        return (convertStringToDate(trip.date) < convertStringToDate(currentDate)) && (convertStringToDate(trip.date) > convertStringToDate(lastYear)) && (trip.status === 'approved')
    }).reduce((acc, trip)=> {
        acc += destinations.calculateCosts(trip.destinationID, trip.travelers, trip.duration)
        return acc
    }, 0)
    yearsTotalCost.innerText = `Total Spent This Past Year: $${lastYearCosts}`
}

function addDestinationOptions(){
    destinationOptions.innerHTML += destinations.data.map(destination => {
        return `
        <option>${destination.destination}</option>
        `
    })
}

function displayNewTripCost(newTripInfo){
    let newTripCost = destinations.calculateCosts(newTripInfo.destinationID, newTripInfo.travelers, newTripInfo.duration)
    singleTripCost.innerText = `Your new trip to ${destinations.findById(newTripInfo.destinationID).destination} will cost $${newTripCost}.`
}
