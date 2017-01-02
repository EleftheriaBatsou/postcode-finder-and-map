$("button").click(function(event) {

    event.preventDefault();

    var place = $("#place").val().replace(' ', '+');
	var url = 'https://maps.googleapis.com/maps/api/geocode/xml?address=' + place + '&key=AIzaSyCmtQZ74r7_QI3tkGq2jAG3gXw8UAgZuY4';
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'xml',
		success: processXml,
	});
});

function processXml(xml)
{
	var postal = "Please be more specific (ie. street address).";
	
	$(xml).find("address_component").each(function(){
		if($(this).find("type").text() == "postal_code")
		{
			postal = $(this).find("long_name").text();
		}
	});

	$("#title").html("Postal Code For: " + $("#place").val());
	$("#results").html(postal).fadeIn();
  
}


// for the map
/*
$(document).ready(function(){
  $("address").each(function(){                         
    var embed ="<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $(this).text() ) +"&amp;output=embed'></iframe>";
                                $(this).html(embed);
                             
   });
});
*/


/* Find the position in a map from postcode or adress */
var geocoder;
var map;
var infowindow;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var loca = new google.maps.LatLng(41.7475, -74.0872);

  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: loca,
    zoom: 8
  });

}


function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
