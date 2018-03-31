var mymap = L.map('mapid').setView([40.748704, -73.838017], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/charlesreid1/cjds79t1o1emg2rp9lx6n5tov/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhcmxlc3JlaWQxIiwiYSI6ImNqZHM1eXluZjA4MWQyd254NXN0YzIzMHYifQ.w9Ukoj77D4iB-7oMB9GuKg', {
    maxZoom: 18,
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    id: 'mapbox.terminal'
}).addTo(mymap);

/*
L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle.");

L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap).bindPopup("I am a polygon.");
*/

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);