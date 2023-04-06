let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 44.9727, lng: -93.23540000000003}
    });
    map.addListener("click", function (event) {
        var latlng = event.latLng;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, function (results, status) {
          if (status === "OK") {
            document.getElementById("location").value = results[0].formatted_address;
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      });
    }