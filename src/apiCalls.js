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



export { fetchTravelerData, fetchDestinationData, fetchTripData }