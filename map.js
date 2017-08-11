
var searchObj = {"location": 97219}
function initMap() {
  var myLatlng = new google.maps.LatLng(40.2010 , -98.9836);
  var myOptions = {
    zoom: 4, 
    scrollwheel: false,
    center: myLatlng

  }

  var map = new google.maps.Map(document.getElementById("map"), myOptions);
  var bounds = new google.maps.LatLngBounds();
  var geocoder = new google.maps.Geocoder()
  var markers = []; 

  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      console.log(results)

      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {


          setMapOnAll(null);
          markers = []; 
          results[0].address_components.forEach((result, i)=>{ 
            if (result.types[0]== "postal_code") {

             let zipcode = Number(result.long_name)
             searchObj["location"]=zipcode
            console.log(searchObj)        
              
              $.when(makeApiCall(searchObj)).then(function(){

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var newLatLng = new google.maps.LatLng(lat , lng);
                var marker = new google.maps.Marker({
                  position: newLatLng,
                  title:"You!",
                  icon: 'markers/paleblue_markerA.png'

                });
                markers.push(marker) 
               // To add the marker to the map, call setMap();
               marker.setMap(map);  
               bounds.extend(marker.getPosition());
               map.fitBounds(bounds);

	       //addMore(addresses,map); 
	       for(var s=0; s<shelters.length; s++){
          makeMoreCalls(shelters[s])
          }


     })
              

            }
          })
        }
      }
    });
  });


  function makeMoreCalls(shelterId){  
    var url = `https://api.petfinder.com/shelter.get?id=${shelterId}&key=a4d4d400939b10647da19b7593286b34&output=full&format=json`;
    return $.ajax({
      type : 'GET',
      data : {},
      url : url+'&callback=?' ,
      dataType: 'json',
      success : function(data) {       
        console.log(data.petfinder.shelter)
        let lat = data.petfinder.shelter.latitude.$t;
        let lng = data.petfinder.shelter.longitude.$t;
        var newLatLng = new google.maps.LatLng(lat , lng);
        var marker = new google.maps.Marker({
          position: newLatLng,
          title:data.petfinder.shelter.name.$t

        });
        markers.push(marker) 		
        marker.setMap(map);  
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);

      }

    })
  }

  
  function addMore(addresses, map){
    for( i = 0; i < addresses.length; i++ ) {
     var address = addresses[i]
     geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })		

   }  
 }


      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

	  /*
  google.maps.event.addListener(map, 'click', function(event) {
	console.log(addresses)

    for( i = 0; i < addresses.length; i++ ) {
	var address = addresses[i]
	console.log(address)
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          //setMapOnAll(null);
          results[0].address_components.forEach((result, i)=>{ 
            if (result.types[0]== "postal_code") {

              let zipcode = Number(result.long_name)
              console.log(zipcode)
	      console.log(addresses)
              $.when(makeApiCall(zipcode)).then(function(){
	      
	      
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var newLatLng = new google.maps.LatLng(lat , lng);
                var marker = new google.maps.Marker({
                  position: newLatLng,
                  title:"Hello World!"
                });
              // To add the marker to the map, call setMap();
              marker.setMap(map)
	      
	      })
	    }
	  })
	}
		  


      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    })

    }


  })


  /*
   *         map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
/*
  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      console.log(results)
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {

          //setMapOnAll(null);
          results[0].address_components.forEach((result, i)=>{ 
            if (result.types[0]== "postal_code") {

              let zipcode = Number(result.long_name)
              console.log(zipcode)
              console.log(zips)
              $.when(makeApiCall(zipcode)).then(function(){

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var newLatLng = new google.maps.LatLng(lat , lng);
                var marker = new google.maps.Marker({
                  position: newLatLng,
                  title:"Hello World!"
                });
              // To add the marker to the map, call setMap();
              marker.setMap(map);  


            })
              

            }
          })
        }
      }
    });
  });

  */
}


