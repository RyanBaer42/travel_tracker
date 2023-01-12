class Destinations{
    constructor(destinationData){
        this.data = destinationData;
    }
    findById(id){
        return this.data.find(destination => {
            return destination.id === id
        })
    }
    findByName(name){
        return this.data.find(location => {
            return location.destination === name
        })
    }
    calculateCosts(id, numPeople, days){
       let destination = this.findById(id)
       let costForFlight = destination.estimatedFlightCostPerPerson * numPeople
       let costForLodging = destination.estimatedLodgingCostPerDay * days * numPeople
       let agentFee =  (costForFlight + costForLodging) * .1
       return costForFlight + costForLodging + agentFee
    }
}

export default Destinations