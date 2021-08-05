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
            turtleSpeed = 2000 - ui.value;
            $("#speedLabel").html(`Turtle Speed: ${turtleSpeed} ms`);
            if (ui.value % 8 == 0) {
                red = ui.value / 8;
                blue = turtleSpeed / 8;
            }
            theColour = `rgb(${red}, 0, ${blue})`;
            $("#custom-handle").css("background-color", theColour);
            
        }
    });

} );