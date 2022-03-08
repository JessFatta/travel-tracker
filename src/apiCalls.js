const fetchTravelerData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


const fetchDestinationData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

const fetchTripData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

const postNewTrip = (trip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(trip),
  })
  .then((response) => response.json())
}

// const errorHandling = (response) => {
//   if(!response.ok) {
//     throw 'We are having some trouble completing your request'
//   } else {
//     pendingTripText.innerText = 'Trip Successfully Submitted'
//     response.json()
//   }
//   }



export { fetchTravelerData, fetchDestinationData, fetchTripData, postNewTrip }