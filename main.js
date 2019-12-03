$(document).ready(function() {

    // catturo click sull'icona di invio messaggio
    $('#send-input').click(function() {
        sendMsg(); //invoco funzione per gestire invio messaggio
        showAnswer(); // simulo una risposta dell'interlocutore
    });

    // catturo evento "keypress" = ENTER, quando il cursore è posizionato
    // nella barra per l'invio del messaggio
    $('#r-input-bar').keypress(function(event) {
        // è stato premuto tasto ENTER (codice 13)
        if (event.which == 13) {
            sendMsg(); //invoco funzione per gestire invio messaggio
            showAnswer(); // simulo una risposta dell'interlocutore
        }
    }); // end evento keypress tasto ENTER su campo send message


    // catturo click nel campo input
    $('#text-input').click(function() {
        // cambio icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
        $('#send-input .fa-microphone').addClass('fa-arrow-alt-circle-right').removeClass('fa-microphone');
    }); // end evento click in message input


    // intercetto la pressione di un tasto sul campo barra di ricerca
    $('#search-input').keyup(function(event) {
        console.log("event.which", event.which);

        var stringToSearch = $('#search-input').val();
        if (stringToSearch) {
            // se il campo search è valorizzato, elaboro
            console.log("stringToSearch:", stringToSearch);

            // ciclo each su tutte le chat presenti
            $('#l-chat-container .l-chat').each(function(index) {

                // estraggo il nome del contatto per la chat corrente
                var contactName = $(this).find('.contact-name').text();
                console.log("nome contatto:", contactName);

                // verifico se il nome del contatto contiene la stringa ricercata
                if (contactName.toLowerCase().includes(stringToSearch.toLowerCase())) {
                    // questo contatto contiene la stringa ricercata
                    console.log("stringa cercata:", stringToSearch, " è presente nel contatto:", contactName);
                    // rendo il contatto visibile, qualora non lo fosse, rimuovendo classe che me lo nasconde
                    $(this).removeClass('notSearched');

                } else {
                    console.log("stringa cercata:", stringToSearch, " NON è presente nel contatto:", contactName);
                    // questo contatto NON contiene la stringa ricercata
                    // nascondo il contatto che non soddisfa il parametro di ricerca
                    $(this).addClass('notSearched');
                }
            }); // end ciclo each

        } else {
            // il campo search è vuoto
            console.log("campo vuoto");

            // ciclo each su tutte le chat presenti
            $('#l-chat-container .l-chat').each(function() {
                // rendi tutti i contatti visibili
                $(this).removeClass('notSearched');
            });
        }

    }); // end evento keyup in search bar

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

function showAnswer() {
    // creo e visualizzo una risposta simulata

    setTimeout(function() {
        // clono un elemento template e rimuovo la classe template
        var HTMLnewElement = $('.template').clone().removeClass('template');

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-speaker'); // setto la "bubble" come messaggio ricevuto (allineato a sx e con sfondo bianco)
        $(HTMLnewElement).children('.msg-text').text("Ricevuto, OK!"); // inserisco testo fittizio
        $(HTMLnewElement).children('.msg-time').text('15:31'); //tbd (da implementre.. per il momento stringa fissa)

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('#r-conversation').append(HTMLnewElement);
    }, 1000);
} // end function showAnswer()