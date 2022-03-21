let c = (el) => document.querySelector(el);

var lat = 0;
var lng = 0;

var markIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    shadowUrl: 'mages/icon-location.svg',

    iconSize:     [46, 56], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 8], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

c('.pesquisa').addEventListener('submit', async (e) => {
    e.preventDefault();
    showMessage('');

    showMessage('Carregando...')

    let input = c('#ip').value;


    let request = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_J1dMZ4Ksr6IQBy95HR6qzgTrUqfuy&ipAddress=${input}`);

    let resultado = await request.json();

    
    if ('code' in resultado) {

        showMessage('IP não encontrado ou não existe.')
        c('.message').style.color = '#ff3232';


    } else {

        c('.ip').innerHTML = resultado.ip;
        c('.loc').innerHTML = `${resultado.location.region}, ${resultado.location.country}`;
        c('.zone').innerHTML = `UTC ${resultado.location.timezone}`;
        c('.isp').innerHTML = resultado.isp;
        
        lat = resultado.location.lat;
        lnt = resultado.location.lng;
       
        
        var map = L.map('map').setView([lat, lnt], 13);
        
        L.marker([lat, lnt], {icon: markIcon}).addTo(map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        showMessage('')

        c('.message').style.display = "none";
    
    }

});

function showMessage(msg) {
    c('.message').style.display = "flex";
    c('.message').innerHTML = msg;
}


