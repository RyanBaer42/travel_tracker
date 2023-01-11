import User from "./User";

class UserRepository{
    constructor(userData){
        this.userData = userData
    }
    returnSingleUser(id){
       let singleUser = this.userData.find(user => user.id === id)
       return new User(singleUser)
    }
}

export default UserRepository;