console.log("Connected");

//CONSTANT VARIABLES
const streetArray = [];
const directionArray = [];
let zone = 'No Zone Detected';


//TOGGLE BETWEEN LOGIN & REGISTER
$('a').on('click', (e) => {
	console.log(e.currentTarget.innerText)

	if(e.currentTarget.innerText === 'Login') {
		if($('#login').hasClass('invisible')){
			$('#login').toggleClass('invisible')
			$('#registration').toggleClass('invisible')
		}
	} else if (e.currentTarget.innerText === 'Registration'){
		if($('#registration').hasClass('invisible')){
			$('#login').toggleClass('invisible')
			$('#registration').toggleClass('invisible');
      } else {
        console.log('do nothing')
		  }
	} else if(e.currentTarget.innerText === 'Logout') {    // req.session.destroy((err) => {
    //   if(err){
    //     console.log("Uh Oh. That didn't work. Session Still Running.")
    //   } else {
    //     console.log('Logout Successful. Session Destroyed.')
    //     res.redirect('/')
    //   }
    // })

    console.log('Logout Clicked')
  }
});

//PUT THE MAP ON THE PAGE
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 41.8781, lng: -87.6298}
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);

  });
}
//PUT A PIN ON THE MAP AT THE USER'S ADDRESS
function geocodeAddress(geocoder, resultsMap) {
  const streetNum = document.getElementById('streetNum').value;
  const streetDir = document.getElementById('streetDir').value;
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const address = (streetNum + ' ' + streetDir + ' ' + street + ', ' + city);

  $('#address').val(address)

  geocoder.geocode({'address': address}, function(results, status) {
   
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      // console.log(results[0]);
      // zoneAddress(geocoder, resultsMap);
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
    } else {

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
      console.log(address);
      // $('#zone').val(zone)
    } else {

      }

    }

    if(zone > 0){
      $('#zone').val('Your Spot is in Zone ' + zone)
      $('#returnZone').text('Your Spot is in Zone ' + zone)

    } else {
      $('#zone').val(zone)
      $('#returnZone').text(zone)
    }

}

