let blue = 128;
let red = 127;
let theColour;

$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        min: 0,
        max: 2000,
        value: 1000,
        create: function() {
            //handle.text( $( this ).slider( "value" ) ); superflous according to customer
            $("#speedLabel").html(`Turtle Speed: ${$( this ).slider( "value" )} ms`);
        },
        slide: function( event, ui ) {
            var new_value = 2000 - ui.value;
            $("#speedLabel").html(`Turtle Speed: ${new_value} ms`);
            if (ui.value % 8 == 0) {
                red = ui.value / 8;
                blue = new_value / 8;
            }
            theColour = `rgb(${red}, 0, ${blue})`;
            $("#custom-handle").css("background-color", theColour);
            //handle.text(new_value);
            
        }
    });

} );