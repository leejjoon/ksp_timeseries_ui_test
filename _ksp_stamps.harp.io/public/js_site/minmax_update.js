 
    $( "form#minmax" ).submit(function( event ) {
	    var fitsmin = $( "#fitsmin" ).val();
	    var fitsmax = $( "#fitsmax" ).val();
	    update_minmax(fitsmin, fitsmax);
	    set_frame(current_frame);
	    console.log("test", fitsmin);
	    event.preventDefault();
	});
