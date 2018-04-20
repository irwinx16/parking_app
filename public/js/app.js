
console.log("Connected");

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

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 41.8781, lng: -87.6298}
    });
    
    const geocoder = new google.maps.Geocoder();


    $('#submit').on('click', function() {
      geocodeAddress(geocoder, map);

        $.ajax({
          url: "https://data.cityofchicago.org/resource/ys7w-i4tk.json",
          type: "GET",
          data: {
          "$limit" : 10000,
          "$$app_token" : "5c3YpZQAnB9JU1TCIMCuysdnK"
          }

        }).done(function(data) {
          // alert("Retrieved " + data.length + " records from the dataset!");

            for (let i = 0; i < data.length; i++) {

              const addr = {
                addresRangeHigh: data[i].address_range_high,
                addresRangeLow: data[i].address_range_low,
                streetDirection: data[i].street_direction,
                streetName: data[i].street_name,
                zone: data[i].zone

          }
          console.log(addr);
            }

        });
    });
}


function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {


      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}




