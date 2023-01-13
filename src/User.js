class User {
    constructor(newUser){
        this.id = newUser.id
        this.name = newUser.name
        this.travelerType = newUser.travelerType
        this.userTrips = []
        //pass in all of this specific users trips from the global variable theyre stored in
    }
    returnFirstName(){
        return this.name.split(' ')[0]
    }
    filterTrips(allTrips){
        this.userTrips = allTrips.filter(trip => {
            return trip.userID === this.id
        })
    }
}
//should have a method that finds this users past, pending, and upcoming trips
//these methods should store their trips in seperate variables that will them be added to the DOM

export default User;