
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


  // $.ajax({
  //  url: ,
  //  type: "GET", 
  //  dataType: "json",
  //  success: function(data) {

  //  },
  //  fail: function(error) {

  //  }
  // })




function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 41.8781, lng: -87.6298}
    });
    const geocoder = new google.maps.Geocoder();


    $('#submit').on('click', function() {
      geocodeAddress(geocoder, map);

    });
  }


function geocodeAddress(geocoder, resultsMap) {
    const address = $('#address').value;
    geocoder.geocode({'address': address}, function(results, status) {

      console.log(geocoder)
      console.log(resultsMap)
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




