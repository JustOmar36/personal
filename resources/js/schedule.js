let table;
let map;
let infowindow;
let service;
let markerinfo = [];
let directionsService;
let directionsRenderer;

document.addEventListener("DOMContentLoaded", function() {
    table = document.getElementById("table");
    var tds = selectThirdTds(table);
    initMap(tds);
  });

function toggleImg(id){
    if(document.getElementById(id).style.visibility ==  "visible"){
        document.getElementById(id).style.visibility = "hidden";
        document.getElementById(id).style.width="0";
    }
    else{
        document.getElementById(id).style.visibility = "visible";
        document.getElementById(id).style.width="100px";
    }
}
function replaceHolder(id){
    var placeholder = document.getElementById("placeholderimg");
    placeholder.src=document.getElementById(id).src;
    placeholder.style.width="700px"
}

function hidePH(){
    var placeholder = document.getElementById("placeholderimg");
    if(placeholder.style.display == 'none'){
      placeholder.style.display = 'block';
      document.getElementById('imgDisplay').innerHTML = 'Go Away'
    }
    else{
      placeholder.style.display = 'none';
      document.getElementById('imgDisplay').innerHTML = 'Come Back'
    }
}

function createMarker(place) {
    
    for (var i = 0; i < markerinfo.length; i++){
        if (markerinfo[i].includes(place.name)){
            place.name = markerinfo[i];
            var marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
              });
              
              
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
              });
        }
    }
  }

function initMap(locations) {
    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 44.9727, lng: -93.23540000000003}
    });

    service = new google.maps.places.PlacesService(map);
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    for(var i = 0; i < locations.length-1; i++) {
        var loc = locations[i].innerText;
            const request = {
            query: loc,
            fields: ["name",  "geometry"],
        };

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for(var i = 0; i <results.length; i++){
                    createMarker(results[i]);
                }
            }
        });
    };
}

function calculateRoute() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const destination = document.getElementById("destination").value;
          const travelMode = document.querySelector('input[name="travel-mode"]:checked').value;
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const request = {
            origin: origin,
            destination: destination,
            travelMode: travelMode,
          };
          directionsService.route(request, function (result, status) {
            if (status == "OK") {
              directionsRenderer.setDirections(result);
              const directionsPanel = document.getElementById("directions-panel");
              directionsPanel.innerHTML = "";
              const directionsList = document.createElement("ol");
              directionsList.style.marginLeft = "20px";
              result.routes[0].legs[0].steps.forEach(function (step) {
                const instructions = document.createElement("li");
                instructions.innerHTML = step.instructions;
                directionsList.appendChild(instructions);
              });
              directionsPanel.appendChild(directionsList);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          });
        }
      );
    }
  }

function selectThirdTds(table) {
    var contentString = "";
    var trs = table.getElementsByTagName("tr");
    var tdsArr = [];
    for (var i = 1; i < trs.length; i++) {
        var tds = trs[i].getElementsByTagName("td");
        tdsArr.push(tds[2]);
        contentString = "<div>" + tds[0].innerText + ", " + tds[1].innerText + " " + tds[3].innerText + ", " + tds[2].innerText + "</div>";
        markerinfo.push(contentString);
    }

    return tdsArr;
}
