$(document).ready(function() {


    // catturo click per invio messaggio
    $('#send-input').click(function() {
        var messageToSend = $('#r-input-bar input').val();

        if (messageToSend) {
            // procedo solo se l'utente ha inserito del testo nel campo di input

            // clono un elemento template e rimuovo la classe template
            var HTMLnewElement = $('.template').clone().removeClass('template');

            // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni con il testo introdotto dall'utente
            $(HTMLnewElement).text(messageToSend);

            // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
            $('#r-conversation').append(HTMLnewElement);

        }
    });


    // catturo click nel campo input
    $('#text-input').click(function() {
        // cambio icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
        $('#send-input .fa-microphone').addClass('fa-arrow-alt-circle-right').removeClass('fa-microphone');
    });

});