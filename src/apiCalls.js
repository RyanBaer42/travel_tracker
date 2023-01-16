function loadGetData(link){
    return fetch(link)
    .then((response) => {
        if (response.ok){
                return response.json()
        }
    })
    .then((data) => {
        return data
    })
}

function postNewTrip(newTrip){
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip), 
        headers: {
            'Content-Type': 'application/json'
        }
      })
}

export default { loadGetData, postNewTrip};