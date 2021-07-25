$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        min: 0,
        max: 2000,
        value: 1000,
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        }
    });

} );