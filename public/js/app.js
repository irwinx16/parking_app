
console.log("Connected");

//CONSTANT VARIABLES



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
	}
})

//PUT THE MAP ON THE PAGE
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
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
  const address = (streetNum + ' ' + streetDir + ' ' + street + ' ' + city);

  geocoder.geocode({'address': address}, function(results, status) {
   
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
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
          console.log(addressSplit);

          //LOOP THROUGH THE DATA IN THE CHI PARKING API
          for (let i = 0; i < data.length; i++){

            //FIND STREET NAME IN PARKING API & MAKE IT LOWERCASE
            const findStreet = data[i].street_name;
            const lowStreet = findStreet.toLowerCase();
            //MAKE STRING FROM ADDRESS LOWERCASE
            const lowAddress = street.toLowerCase();

            //LOOK FOR STREET NAME WITHIN CHICAGO LIST
            if (lowStreet.indexOf(lowAddress)) {
              console.log('No Match')
            } else {
              console.log(data[i])
            }

          }

          // City of Chicago
          console.log(data[0]) 
          //zone specific
          console.log(data[0].zone)

        }); 
    });
}




