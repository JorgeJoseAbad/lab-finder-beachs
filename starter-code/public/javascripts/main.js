
function initMap(){

  var autocomplete;
  var places;
  var markers=[];

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    console.log(markers);
    console.log("setMapOnAll");
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
    console.log(markers);
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    console.log("clearMarkers");
    setMapOnAll(null);
  }

  function deleteMarkers() {
    console.log("deleteMarkers");
    clearMarkers();
    markers = [];
  }

  var sol = {
    lat: 40.417080,
    lng: -3.703
  };

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: sol
  });


autocomplete = new google.maps.places.Autocomplete(
  document.getElementById('autocomplete')
);

places = new google.maps.places.PlacesService(map);

//autocomplete.addListener('place_changed', onPlaceChanged);
//document.addListener('click',onPlaceChanged);
document.getElementById("myBtn").addEventListener("click", onPlaceChanged);
//startMap();

function viewFlags(){
  document.getElementById('array-buttons').style.visibility = 'visible';
}

function originalMarker(placeName,markerPlace){
  //send thatBeach to route mongoose, bbdd
  const beachName ={
    placeName:placeName
  }

  //get inicial BBDD status of the required beach
  $.ajax({
    type: "GET",
    url: '/beach',
    data: beachName,
    success: function(data, status, headers, config) {
      if (data != null && data !== '') {
        let flagColor = data;
        const flagSVG = {
          path : "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z",
          fillColor: flagColor,
          fillOpacity: 0.6,
          scale: 3,
          anchor: new google.maps.Point(8, 24)
        }

        marker = new google.maps.Marker({
                position: markerPlace,
                map: map,
                label: {
                  text: "Finded!",
                  color: flagColor,
                  fontSize: '18px'
                },
                icon: flagSVG,
                title: 'Destination!'
              });
        markers.push(marker);
      }
    },
    error: function(result,status,xhr) {
      console.log("ERROR");
      console.log(result)

    }
  })

}

function onPlaceChanged() {

      viewFlags()

      var place = autocomplete.getPlace();
      var marker;
      var flagColor;
      let markerPlace ={
        lat: 0,
        lng:0
      };
      deleteMarkers();

      if (place.geometry) {

        map.panTo(place.geometry.location);
        map.setZoom(15);
        markerPlace.lat = place.geometry.location.lat(map);
        markerPlace.lng = place.geometry.location.lng(map);
        originalMarker(place.name,markerPlace);
        //search();
      } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
      }

      function onPlaceMarker(){

        flagColor = this.id; //en id está el color elegido

        const flagSVG = {
          path : "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z",
          fillColor: flagColor,
          fillOpacity: 0.6,
          scale: 3,
          anchor: new google.maps.Point(8, 24)
        }

        //const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        //const image2 = "https://maps.google.com/mapfiles/kml/shapes/flag.png";

        marker = new google.maps.Marker({
                position: markerPlace,
                map: map,
                label: {
                  text: "Finded!!",
                  color: flagColor,
                  fontSize: '18px'
                },
                icon: flagSVG,
                title: 'Destination!'
              });
        markers.push(marker);

        const thatBeach = {
          name: place.name,
          flag: flagColor
        }

        //send thatBeach to route, mongoose, bbdd
        $.ajax({
          type: "POST",
          url: '/new',
          data: thatBeach,
          success: function() {
            console.log("enviado", this)
          },
        })

      }

      document.getElementById("red").addEventListener("click", onPlaceMarker);
      document.getElementById("yellow").addEventListener("click", onPlaceMarker);
      document.getElementById("green").addEventListener("click", onPlaceMarker);

    }

}
