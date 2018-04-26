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
    if($('#login').hasClass('invisible')){
      $('#login').toggleClass('invisible')
      $('#registration').toggleClass('invisible')
    }
  //When we click 'Registration', toggle registration elements tob e visible and hide login elements. 
  } else if (e.currentTarget.innerText === 'Registration'){
    if($('#registration').hasClass('invisible')){
      $('#login').toggleClass('invisible')
      $('#registration').toggleClass('invisible');
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
      //set specifications on how to display the map after user has clicked search
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(17);
      const marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      // allow user to see entire geocoded address in the console
      console.log(results[0]);
      // call function to run the address through the Chicago Parking API
      zoneAddress(geocoder, resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


//RUN ADDRESS THROUGH CHICAGO PARKING API
function zoneAddress(geocoder, resultsMap) {
  //Grab user input and format it in a way that can be run against the chicago API
  const streetNum = document.getElementById('streetNum').value;
  const streetDir = document.getElementById('streetDir').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const address = (streetNum + ' ' + streetDir + ' ' + street + ' ' + city);
  
  //AJAX Request to Chicago Parking + Function to find all results that match user streetname
  geocoder.geocode({'address': address}, function(results, status) {
    $.ajax({
      url: "https://data.cityofchicago.org/resource/ys7w-i4tk.json",
      type: "GET",
      data: {
       "$limit" : 10000,
       "$$app_token" : "5c3YpZQAnB9JU1TCIMCuysdnK"
      }
    }).done(function(data) {
      //Loop through the data in the chicago parking API
      for (let i = 0; i < data.length; i++){
        //Grab the street name from each object
        const findStreet = data[i].street_name;
        //Make both user input and street name from API lowercase/compatible with one another
        const lowStreet = findStreet.toLowerCase();
        const lowAddress = street.toLowerCase();
        //Look for a match between street names
        if (lowStreet.indexOf(lowAddress)) {
        } else {
          //This pushes all of the streets where objects ARE matches into the streetArray
          streetArray.push(data[i]);
        }
      }
      //Call function to check street directions
      directionCheck(streetNum, streetDir);
    }); 
  });
}


//FUNCTION TO FILTER BY STREET DIRECTION
function directionCheck (streetNum, streetDir) {
  //Take the first letter of the user's input in the direction field and make it lowercase
  const userDirection = streetDir.toLowerCase().charAt(0);
  //Loop through the matched streets and find those that have matching street directions
  for(let i = 0; i < streetArray.length; i++){
    //Make the direction lowercase/compatible with userDirection
    let chiDirection = streetArray[i].street_direction.toLowerCase();
    //If the directions match, push into a direction array
    if(chiDirection == userDirection){
      directionArray.push(streetArray[i]);
    }
  }
  //Call function to check address number
  findZone(streetNum);
}
//FUNCTION TO IDENTIFY ZONE 
function findZone(streetNum) {
  //Loop through the addresses that match user direction
  for(let i = 0; i < directionArray.length; i++){
    //Identify the limits of each zone
    let lowerLimit = directionArray[i].address_range_low;
    let upperLimit = directionArray[i].address_range_high;
    //Check to see if user number falls within the zone
    if ((streetNum >= lowerLimit) && (streetNum <= upperLimit)){
      zone = directionArray[i].zone
      //User can see the zone and specific chicago API object that corresponds with their address
      console.log('Zone is ' + zone)
      console.log(directionArray[i]);
    } else {
      }
    }
    // If there isn't a zone --> tell the user
    if(zone > 0){
      $('#zone').val('Zone ' + zone)
      $('#returnZone').text('The address you provided is in zone ' + zone + '.  Please check parking restrictions.')
    } else {
      $('#zone').val(zone)
      $('#returnZone').text(zone)
    }
}



//--------ANIMATION FOR THE CHICAGO FLAG-------//

$('#flag').velocity("fadeIn", { duration: 3000 });

// $("#flag")
//     .velocity({ width: 100 }, 3000)
//     .velocity({ height: 100 }, 1250);
