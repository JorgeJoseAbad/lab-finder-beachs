


function initMap(){

  var autocomplete;
  var places;


  var sol = {
    lat: 40.417080,
    lng: -3.703
  };

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });


console.log(map);

autocomplete = new google.maps.places.Autocomplete(
  document.getElementById('autocomplete')
);

places = new google.maps.places.PlacesService(map);

autocomplete.addListener('place_changed', onPlaceChanged);
//startMap();

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  var marker;
  let markerPlace ={
    lat: 0,
    lng:0
  };

  if (place.geometry) {
    console.log(place.geometry.location.lat(map));
    console.log(place.geometry.location.lng(map));
    map.panTo(place.geometry.location);
    map.setZoom(15);
    markerPlace.lat=place.geometry.location.lat(map);
    markerPlace.lng=place.geometry.location.lng(map);

   marker= new google.maps.Marker({
            position: markerPlace,
            map: map,
            title: 'Destination!'
          });


    //search();
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }
}





}



  /*infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')
    });



*/



// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
