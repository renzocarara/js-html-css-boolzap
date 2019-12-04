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


    // catturo l'evento "keyup" nel campo input della barra invio messagi
    $('#text-input').keyup(function() {

        // verifco che il campo input abbia un valore
        if ($('#text-input').val()) {
            // cambio icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
            $('#send-input i').addClass('far fa-paper-plane').removeClass('fas fa-microphone');
        } else {
            // ripristino icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
            $('#send-input i').removeClass('far fa-paper-plane').addClass('fas fa-microphone');
        }
    }); // end evento click in message input


    // intercetto la pressione di un tasto sul campo barra di ricerca
    $('#search-input').keyup(function(event) {

        var stringToSearch = $('#search-input').val();
        // solo se il campo search è valorizzato, elaboro
        if (stringToSearch) {
            // ciclo each su tutte le chat presenti
            $('#l-chat-container .l-chat').each(function(index) {

                // estraggo il nome del contatto per la chat corrente
                var contactName = $(this).find('.contact-name').text();

                // verifico se il nome del contatto contiene la stringa ricercata
                if (contactName.toLowerCase().includes(stringToSearch.toLowerCase())) {
                    // questo contatto contiene la stringa ricercata
                    // rendo il contatto visibile, qualora non lo fosse, rimuovendo classe che me lo nasconde
                    $(this).removeClass('notSearched');

                } else {
                    // questo contatto NON contiene la stringa ricercata
                    // nascondo il contatto che non soddisfa il parametro di ricerca
                    $(this).addClass('notSearched');
                }
            }); // end ciclo each

        } else {
            // il campo search è vuoto
            // ciclo each su tutte le chat presenti
            $('#l-chat-container .l-chat').each(function() {
                // rendo tutti i contatti visibili
                $(this).removeClass('notSearched');
            });
        }

    }); // end evento keyup in search bar


    // gestico evento mouseenter sui messaggi visualizzati
    $('.msg-wrapper').mouseenter(function() {
        console.log("mouseenter su msg-wrapper");
        // quando l'utente posiziona il mouse all'interno del messaggio,
        // visualizzo un simbolino che dà accesso ad un dropdown menu
        $(this).find('.angle-down').removeClass('hidden');


    });
    // gestico evento mouseleave sui messaggi visualizzati
    $('.msg-wrapper').mouseleave(function() {
        console.log("mouseleave su msg-wrapper");
        // quando l'utente sposta il mouse all'esterno del messaggio,
        // nascondo il simbolino che dà accesso al dropdown menu
        $(this).find('.angle-down').addClass('hidden');


    });
    // gestico click su icona per dropdown menu
    $('.angle-down').click(function() {
        console.log("click su msg-dropdown");
        // quando l'utente clicca sull'iconcina del dropdown menu,
        // visualizzo il dropdown menu
        $(this).nextAll('.msg-dropdown').toggleClass('hidden').addClass('active');
    });


    // se c'è un dropdown menu aperto, e l'utente clicca in qualunque
    // punto sul documento  nascondo il dropdown menu
    $(document).click(function() {

        //---------- per cercare un dropdown aperto potrei settare una classe (active), quando apro un dropdown
        //---------- solo se c'e' un drop down aperto allora chiudo tutti i dropdown menu aperti
        // if ($('.msg-dropdown').hasClass('active')) {
        // $('.msg-dropdown').removeClass('active');
        // $('.msg-dropdown').addClass('hidden');
        // }
    });




}); // document ready

// --------------------------- FUNCTIONs ---------------------------------------
function sendMsg() {
    var messageToSend = $('#r-input-bar input').val();

    // procedo solo se l'utente ha inserito del testo nel campo di input
    if (messageToSend) {
        // clono un elemento template e rimuovo la classe template
        // passando 2 parametri a "true" alla clone() permetto che gli event handler e i dati legati all'elemnto
        // che vado a clonare siano copiati anche sull'elemento clonato (con il primo true) e i suoi figli (con il secondo true)
        var HTMLnewElement = $('.template').clone(true, true).removeClass('template');
        var currentTime = catchTime();

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-mine'); // setto la "bubble" come messaggio inviato (allineato a dx con sfondo verde)
        $(HTMLnewElement).children('.msg-text').text(messageToSend); // inserisco testo digitato
        $(HTMLnewElement).children('.msg-time').text(currentTime); //tbd (da implementre.. per il momento stringa fissa)

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
        // passando 2 parametri a "true" alla clone() permetto che gli event handler e i dati legati all'elemnto
        // che vado a clonare siano copiati anche sull'elemento clonato (con il primo true) e i suoi figli (con il secondo true)
        var HTMLnewElement = $('.template').clone(true, true).removeClass('template');
        var currentTime = catchTime();

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-speaker'); // setto la "bubble" come messaggio ricevuto (allineato a sx e con sfondo bianco)
        $(HTMLnewElement).children('.msg-text').text("Ricevuto, OK!"); // inserisco testo fittizio
        $(HTMLnewElement).children('.msg-time').text(currentTime); //tbd (da implementre.. per il momento stringa fissa)

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('#r-conversation').append(HTMLnewElement);
    }, 1000);
} // end function showAnswer()


function catchTime() {
    // ritorna l'ora corrente nel formato hh:mm
    var time = "";
    var date = new Date();

    time = date.getHours() + ":" + date.getMinutes();
    return time;
}