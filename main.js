$(document).ready(function() {


    // catturo click per invio messaggio
    $('#send-input').click(function() {
        console.log($('#r-input-bar input').val());
        var messageToSend = $('#r-input-bar input').val();

        // clono un elemento template e rimuovo la classe template
        var HTMLnewElement = $('.template').clone().removeClass('template');

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni con il testo introdotto dall'utente
        $(HTMLnewElement).text(messageToSend);

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('#r-conversation').append(HTMLnewElement);
    });

});