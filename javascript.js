let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let isslong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000 
let maxFailedAttempts = 3

let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})


let map = L.map('iss-map').setView([0, 0,], 1) 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts)

function iss(attempts) {  // update for recursive timeout code update

    if (attempts <= 0 ) {
        alert('Failed to contact ISS server after several attempts.')
        return
    }

    fetch(url).then( (res) => {
        return res.json() 
    }).then( (issData) => {
        console.log(issData)

        let lat = issData.latitude
        let long = issData.longitude

        issLat.innerHTML = lat
        isslong.innerHTML = long

        if (!issMarker) {
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let currentDateTime = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched on ${currentDateTime}`

    }).catch( (err) => {
        attempts--
        console.log('ERROR!', err)
    }).finally( () => {
        setTimeout(iss, update, attempts)
    })
}