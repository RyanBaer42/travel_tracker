const errorMessage = document.getElementById('errorMessage')
const topHeader = document.getElementById('topHeader')
const tripsSection = document.getElementById('tripsSection')

function loadGetData(link){
    return fetch(link)
    .then((response) => {
        if (response.ok){
                return response.json()
        }
        throw Promise.reject(response)
    })
    .then((data) => {
        errorHandling('message', 'noError')
        return data
    })
    .catch((response) => {
        errorHandling('Sorry, the server is down. Try again later', 'error')
        console.log('Something went wrong: ', response);
    });
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

function errorHandling(message, display) {
    if (display === 'error') {
        errorMessage.innerText = message
        errorMessage.classList.remove('hidden')
        topHeader.classList.add('hidden')
        tripsSection.classList.add('hidden')
    } 
}

export default { loadGetData, postNewTrip};