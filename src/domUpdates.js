
function showTrips(filteredTrips, tripLocation){
    tripLocation.innerHTML = " "
    filteredTrips.forEach(trip => {
        tripLocation.innerHTML +=  `
        <div tabindex="0" class="single-trip">
            <img class="trip-image" src="${trip.image}" alt="${trip.alt || trip.destination}">
            <p>${trip.destination}</p>
        </div>
        `
    })
}

function displayWelcomeMessage(currentUser){
    welcomeMessage.innerText = `Welcome ${currentUser.returnFirstName()}!`
}

function displayNewTripCost(newTripInfo, destinations){
    let newTripCost = destinations.calculateCosts(newTripInfo.destinationID, newTripInfo.travelers, newTripInfo.duration)
    singleTripCost.innerText = `Your new trip to ${destinations.findById(newTripInfo.destinationID).destination} will cost $${newTripCost}.`
}

function showYearCosts(location, lastYearCosts){
    location.innerText = `Total Spent This Past Year: $${lastYearCosts}`
}

function invalidUsernameAndPassword(location){
    location.innerText = "Invalid username and password"
}
  
function invalidUsername(location){
    location.innerText = "Invalid username"
}
  
function invalidPassword(location){
    location.innerText = "Invalid password"
}


export default { showTrips, displayWelcomeMessage, displayNewTripCost, showYearCosts, invalidUsernameAndPassword, invalidUsername, invalidPassword }