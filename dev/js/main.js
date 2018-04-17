$(document).ready(function () {
    $( ".filter-btn " ).click(function() {
        $( ".filter-mobile" ).addClass( "visible" );
    });
    $( ".close-btn" ).click(function() {
        $( ".filter-mobile" ).removeClass( "visible" );
    });
});