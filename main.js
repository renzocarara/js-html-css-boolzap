$(document).ready(function() {


    // catturo click sull'icona di invio messaggio
    $('#send-input').click(function() {
        sendMsg(); //invoco funzione per gestire invio messaggio
        showAnswer(); // simulo una risposta dell'interlocutore
    });

    // catturo evento "keypress" sul tasto ENTER
    $('#r-input-bar').keypress(function(event) {
        // è stato premuto tasto ENTER (codice 13)
        if (event.which == 13) {
            sendMsg(); //invoco funzione per gestire invio messaggio
            showAnswer(); // simulo una risposta dell'interlocutore
        }
    });

    function showAnswer() {

        setTimeout(function() {
            // creo e visualizzo una risposta simulata

            // clono un elemento template e rimuovo la classe template
            var HTMLnewElement = $('.template').clone().removeClass('template');

            // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
            $(HTMLnewElement).addClass('msg-speaker'); // setto la "bubble" come messaggio ricevuto (allineato a sx e con sfondo bianco)
            $(HTMLnewElement).children('.msg-text').text("Ricevuto, OK!"); // inserisco testo fittizio
            $(HTMLnewElement).children('.msg-time').text('15:31'); //tbd (da implementre.. per il momento stringa fissa)

            // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
            $('#r-conversation').append(HTMLnewElement);
        }, 1000);
    }

    // catturo click nel campo input
    $('#text-input').click(function() {
        // cambio icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
        $('#send-input .fa-microphone').addClass('fa-arrow-alt-circle-right').removeClass('fa-microphone');
    });

}); // document ready

// --------------------------- FUNCTIONs ---------------------------------------
function sendMsg() {
    var messageToSend = $('#r-input-bar input').val();

    // procedo solo se l'utente ha inserito del testo nel campo di input
    if (messageToSend) {
        // clono un elemento template e rimuovo la classe template
        var HTMLnewElement = $('.template').clone().removeClass('template');

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-mine'); // setto la "bubble" come messaggio inviato (allineato a dx con sfondo verde)
        $(HTMLnewElement).children('.msg-text').text(messageToSend); // inserisco testo digitato
        $(HTMLnewElement).children('.msg-time').text('15:30'); //tbd (da implementre.. per il momento stringa fissa)

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('#r-conversation').append(HTMLnewElement);

        //resetto il campo di input
        $('#r-input-bar input').val("");

    }
}