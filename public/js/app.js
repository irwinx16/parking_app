
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

      
});

}



function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      // console.log(results[0].address_components[0].short_name);

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
              

                // Do we just need address range and street name for matching purposes?

                addresRangeHigh: data[i].address_range_high,
                addresRangeLow: data[i].address_range_low,
                streetDirection: data[i].street_direction,
                streetName: data[i].street_name,
                zone: data[i].zone

          }


                const addrNumber = results[0].address_components[0].short_name;
                  // console.log(addr.addresRangeHigh);
                  // console.log(addr.addresRangeLow);

                const streetNameVal = results[0].address_components[1].short_name;

                


                 console.log(data[0]) 

                  // data.street_name just gives us the NAME 
                  // concatenatte street name street type and street direction into a string and compare it that way??

                   console.log(results[0])


                  // streetNameVal and addr.streetName are not same string 
                  // console.log(streetNameVal)
                  // console.log("----------");
                  // console.log(addr.streetName);





          // if (addrNumber >= addr.addresRangeLow && addrNumber <= addr.addresRangeHigh && streetNameVal === addr.streetName) {
          //   // this keeps looping because add.addressRangeLow checks every line in the API 
              // this also does not work because streetNameVal and add.streetnName dont't match 
          //   console.log('There is a permit');
          // } else {
          //   console.log('There is no permit');
          //       }

          
      }
       // console.log(addr);
      // console.log(results[0].address_components[1].short_name)

      


                // console.log("----------");
                // console.log(data[0].street_name)
                //   // This is show as just the name (EX: HARDING)
                //   // Needs to match or include streetName variable based on the adress typed in 
                // console.log("----------");



        }); 


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




