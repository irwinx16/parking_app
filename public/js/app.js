console.log("Connected");

//--------VARIABLES--------//
const streetArray = [];
const directionArray = [];
let zone = 'No Zone Detected';


//--------LOGIN AND REGISTRATION--------//
$('a').on('click', (e) => {
  console.log(e.currentTarget.innerText)
  //When user clicks 'Login', toggle login elements to be visible and hide registration elements. 
  if(e.currentTarget.innerText === 'Login') {
    if($('#login').hasClass('invisible2')){
      $('#login').toggleClass('invisible2')
      $('#registration').toggleClass('invisible2')
    }
  //When we click 'Registration', toggle registration elements tob e visible and hide login elements. 
  } else if (e.currentTarget.innerText === 'Registration'){
    if($('#registration').hasClass('invisible2')){
      $('#login').toggleClass('invisible2')
      $('#registration').toggleClass('invisible2');
      } else {
        console.log('do nothing')
      }
    }
});


//--------GOOGLE MAPS--------//

//PUT THE MAP ON THE PAGE
function initMap() {
  // Create a new map --> google.maps function. Zoom and center are ALWAYS required parameters.
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.8781, lng: -87.6298}
  });

  // Create a new geocoder --> google.maps function.
  const geocoder = new google.maps.Geocoder();
  //When someone clicks on the submit button, run the geocodeAddress function.
  document.getElementById('submit').addEventListener('click', function() {
    //Call the geocodeAddres function
    geocodeAddress(geocoder, map);
  });
  document.getElementById('street').addEventListener('keypress', (event) => {
    if(event.keyCode=="13") {
      geocodeAddress(geocoder, map);
    } 
  });
}
//PUT A PIN ON THE MAP AT THE USER'S ADDRESS
function geocodeAddress(geocoder, resultsMap) {
  //Grab user input and format it in a way that can be run against the chicago API
  const streetNum = document.getElementById('streetNum').value;
  const streetDir = document.getElementById('streetDir').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const address = (streetNum + ' ' + streetDir + ' ' + street + ', ' + city);
  $('.address').val(address)

  //Takes the address and formats it in a way that googlemaps can work with
  geocoder.geocode({'address': address}, function(results, status) {
   
    //status is 'OK' when no errors occurred. Address was succesfully parsed and at least one geocode was returned. 
    if (status === 'OK') {
      //
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(17);
      const marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      console.log(results[0]);
      zoneAddress(geocoder, resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
//RUN ADDRESS THROUGH CHICAGO PARKING API
function zoneAddress(geocoder, resultsMap) {
  
  const streetNum = document.getElementById('streetNum').value;
  const streetDir = document.getElementById('streetDir').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const address = (streetNum + ' ' + streetDir + ' ' + street + ' ' + city);
  
  geocoder.geocode({'address': address}, function(results, status) {
    $.ajax({
      url: "https://data.cityofchicago.org/resource/ys7w-i4tk.json",
      type: "GET",
      data: {
       "$limit" : 10000,
       "$$app_token" : "5c3YpZQAnB9JU1TCIMCuysdnK"
      }
    }).done(function(data) {
      //SPLIT ADDRESS INTO ARRAY OF STRINGS
      const addressSplit = address.split(' ')
      // console.log(addressSplit);
      //LOOP THROUGH THE DATA IN THE CHI PARKING API
      for (let i = 0; i < data.length; i++){
        //FIND STREET NAME IN PARKING API & MAKE IT LOWERCASE
        const findStreet = data[i].street_name;
        const lowStreet = findStreet.toLowerCase();
        //MAKE STRING FROM ADDRESS LOWERCASE
        const lowAddress = street.toLowerCase();
        //LOOK FOR STREET NAME WITHIN CHICAGO LIST
        if (lowStreet.indexOf(lowAddress)) {
          //This displays all of the objects where the streets that are NOT matches
          // console.log('No Match')
        } else {
          //This pushes all of the streets where objects ARE matches
          streetArray.push(data[i]);
        }
      }
      directionCheck(streetNum, streetDir);
    }); 
  });
}
//FUNCTION TO FILTER BY STREET DIRECTION
function directionCheck (streetNum, streetDir) {
  const userDirection = streetDir.toLowerCase().charAt(0);

  for(let i = 0; i < streetArray.length; i++){
    let chiDirection = streetArray[i].street_direction.toLowerCase();
    // console.log(streetArray[i]);
    // console.log("User Direction " + userDirection);
    // console.log("Chicago Direction " + chiDirection);
    if(chiDirection == userDirection){
      directionArray.push(streetArray[i]);
    }
  }
  findZone(streetNum);
}
//FUNCTION TO IDENTIFY ZONE 
function findZone(streetNum) {
  // console.log(streetNum);
  // console.log("Now we will find the zone!");
  for(let i = 0; i < directionArray.length; i++){
    let lowerLimit = directionArray[i].address_range_low;
    let upperLimit = directionArray[i].address_range_high;
    if ((streetNum >= lowerLimit) && (streetNum <= upperLimit)){
      zone = directionArray[i].zone
      console.log('Zone is ' + zone)
      console.log(directionArray[i]);
    } else {
      }
    }
    if(zone > 0){
      $('#zone').val('Zone ' + zone)
      $('#returnZone').text('The address you provided is in zone ' + zone + '.  Please check parking restrictions.')
    } else {
      $('#zone').val(zone)
      $('#returnZone').text(zone)
    }
}
$('#flag').velocity("fadeIn", { duration: 3000 });

// $("#flag")
//     .velocity({ width: 100 }, 3000)
//     .velocity({ height: 100 }, 1250);
