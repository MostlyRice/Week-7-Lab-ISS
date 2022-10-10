let url = "https://api.wheretheiss.at/v1/satellites/25544"

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

fetch(url)
    .then(response => response.json())
    .then(issData => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
    })
    .catch(error => {
        console.log(error)
    })