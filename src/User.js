class User {
    constructor(newUser){
        this.id = newUser.id
        this.name = newUser.name
        this.travelerType = newUser.travelerType
    }
    returnFirstName(){
        return this.name.split(' ')[0]
    }
}
//should have a method that finds this users past, pending, and upcoming trips
//these methods should store their trips in seperate variables that will them be added to the DOM

export default User;