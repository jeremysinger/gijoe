$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        min: 0,
        max: 2000,
        value: 1000,
        create: function() {
            handle.text( $( this ).slider( "value" ) );
            $("#speedLabel").html(`Turtle Speed: ${$( this ).slider( "value" )} ms`);
        },
        slide: function( event, ui ) {
            var new_value = 2000 - ui.value;
            $("#speedLabel").html(`Turtle Speed: ${new_value} ms`);
            
            handle.text(new_value);
        }
    });

} );