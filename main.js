// DATABASE:boolzappDB
// --------------------  DESCRIZIONE STRUTTURA DATI: ---------------------------
// boolzappDB: è array di n elementi, ognuno rappresenta una chat di uno specifico CONTATTO
// è una array di elementi composti da oggetti omogenei contenenti una coppia di proprietà
// la prima proprietà è una stringa con il nome del CONTATTO
// la seconda proprietà è un altro array ed è la CHAT
// ogni elemento di questo secondo array CHAT è un oggetto con 3 proprietà
// questi oggetti rappresentano ognuno un messaggio scambiato, e tutti insieme compongono una CHAT

//
// un elemento di boolzappDB è fatto così:
// {
//     'CONTATTO':'nome del contatto',
//     'CHAT': [messaggio, messaggio, messaggio,...]
// }
//
// un elemento 'messaggio' di CHAT è fatto così:
// {
//     'TIPO MESSAGGIO': 'msg-mine' o 'msg-speaker',
//     'TESTO': 'Ciao io sono Michele',
//     'ORA': '9:30'
// }


var boolzappDB = [
    // elemento 1
    {
        'contact': 'michele',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Ciao io sono Michele',
                'msgTime': '9:30'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Ciao Michele, come va?',
                'msgTime': '9:31'
            }
        ]
    },
    // elemento 2
    {
        'contact': 'francesca',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Ciao Francesca, come stai',
                'msgTime': '10:50'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Molto bene, grazie',
                'msgTime': '10:51'
            },

            {
                'msgFlow': 'msg-mine',
                'msgText': 'Ci vediamo?',
                'msgTime': '10:51'
            }
        ]
    },
    // elemento 3
    {
        'contact': 'antonio',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Ciao Antonio, come va',
                'msgTime': '10:45'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Sono stanco grazie',
                'msgTime': '10:46'
            }
        ]
    },
    // elemento 4
    {
        'contact': 'mario',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Mario ci sei?',
                'msgTime': '10:45'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Eccomi',
                'msgTime': '10:46'
            }
        ]
    },
    // elemento 5
    {
        'contact': 'marco',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Ciao Marco, ci vediamo?',
                'msgTime': '10:45'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Perchè no!',
                'msgTime': '10:46'
            }
        ]
    },
    // elemento 6
    {
        'contact': 'franco',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Franco dove sei finito?',
                'msgTime': '10:45'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Sto scrivendo un DB...',
                'msgTime': '10:46'
            }
        ]
    },
    // elemento 7
    {
        'contact': 'milena',

        'chat': [{
                'msgFlow': 'msg-mine',
                'msgText': 'Milena mi aiuti?',
                'msgTime': '8:44'
            },

            {
                'msgFlow': 'msg-speaker',
                'msgText': 'Dimmi pure, cosa posso fare per te?',
                'msgTime': '8:46'
            }
        ]
    }
];


$(document).ready(function() {

    // costruisco le conversazioni, leggo da una struttura dati presente in questo script,
    // creo il codice HTML e scrivo sulla pagina
    createChats();

    // MILESTONE1 - PUNTO 2

    // catturo click sull'icona di invio messaggio
    $('#send-input').click(function() {
        sendMsg(); //invoco funzione per gestire invio messaggio
    });

    // catturo evento "keypress" = ENTER, quando il cursore è posizionato
    // nella barra per l'invio del messaggio
    $('#r-input-bar').keypress(function(event) {
        // è stato premuto tasto ENTER (codice 13)
        if (event.which == 13) {
            sendMsg(); //invoco funzione per gestire invio messaggio
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


    // MILESTONE2 - PUNTO 2

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


    // MILESTONE3 - PUNTO 1

    // gestisco click su CONTATTO nell'elenco in colonna a sinistra
    $('.l-chat').click(function() {
        // quando l'utente clicca su uno dei contatti in elenco,
        // nel pannello di destra deve apparire la conversazione associata a quel contatto
        // ogni conversazione è identificata da un attributo data-contact, che mi dà la corrispondenza con i contatti

        // disattivo il precedente contatto attivo
        $('.l-chat').removeClass('chat-active');
        // metto come contatto attivo quello appena cliccato
        $(this).addClass('chat-active');

        // estraggo il nome del contatto cliccato
        var contactName = $(this).find('.contact-name').text();

        // nascondo tutte le conversazioni, inclusa quella attualmente visualizzata
        $('.conversation').removeClass('c-active');

        // visualizzo nuova conversazione appena selezionata, utilizzo il nome del contatto
        // per referenziarmi alla giusta conversazione, tramite l'attributo data-contact
        $('.conversation[data-contact="' + contactName.toLowerCase() + '"]').addClass('c-active');

        // aggiorno i campi del pannello di intestazione (sopra alla conversazione)
        // dove appare nome e immagine del contatto relativo alla chat corrente
        // aggiorno il nome
        $('#r-myspeaker .speaker-text span:first-child').text(contactName);
        // aggiorno l'attributo src del tag img con la funzione attr()
        $('#r-myspeaker img').attr("src", "images/" + contactName.toLowerCase() + ".png");
    });

    // MILESTONE3 - PUNTO 2

    // gestisco evento mouseenter sui messaggi visualizzati
    $('.msg-wrapper').mouseenter(function() {
        // quando l'utente posiziona il mouse all'interno del messaggio,
        // visualizzo un simbolino che dà accesso ad un dropdown menu
        $(this).find('.angle-down').removeClass('hidden');
    });

    // gestisco evento mouseleave sui messaggi visualizzati
    $('.msg-wrapper').mouseleave(function() {
        // quando l'utente sposta il mouse all'esterno del messaggio,
        // nascondo il simbolino che dà accesso al dropdown menu
        $(this).find('.angle-down').addClass('hidden');
    });

    // gestisco click su icona per dropdown menu
    $('.angle-down').click(function() {
        // quando l'utente clicca sull'iconcina del dropdown menu,
        // visualizzo il dropdown menu
        $(this).nextAll('.msg-dropdown').toggleClass('no-show');
    });

    // gestisco click su voce menu "Delete message"
    $('.msg-dropdown ul li:last-child').click(function() {
        // rimuovo (cancello definitivamente l'elemento HTML)
        // il messaggio associato al dropdown menu cliccato
        // partendo dall'elemnto cliccato (this) scorro verso l'alto il DOM,
        // cercando il primo ANCESTOR di classe "msg-wrapper"
        $(this).closest('.msg-wrapper').remove();
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
        var HTMLnewElement = $('.template.msg-wrapper').clone(true, true).removeClass('template');
        var currentTime = catchTime();

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-mine'); // stilo il messaggio come messaggio inviato (allineato a dx con sfondo verde)
        $(HTMLnewElement).children('.msg-text').text(messageToSend); // inserisco testo digitato
        $(HTMLnewElement).children('.msg-time').text(currentTime); // inserisco ora corrente hh:mm

        // faccio una append del nuovo elemento all'interno della conversazione
        $('.conversation.c-active').append(HTMLnewElement);

        //resetto il campo di input inserendo una stringa vuota
        $('#r-input-bar input').val("");

        showAnswer(); // simulo una risposta dell'interlocutore
    }
}

// MILESTONE2 - PUNTO 2

function showAnswer() {
    // creo e visualizzo una risposta simulata

    setTimeout(function() {
        // clono un elemento template e rimuovo la classe template
        // passando 2 parametri a "true" alla clone() permetto che gli event handler e i dati legati all'elemnto
        // che vado a clonare siano copiati anche sull'elemento clonato (con il primo true) e i suoi figli (con il secondo true)
        var HTMLnewElement = $('.template.msg-wrapper').clone(true, true).removeClass('template');
        var currentTime = catchTime();

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni
        $(HTMLnewElement).addClass('msg-speaker'); // stilo il messaggio come messaggio ricevuto (allineato a sx e con sfondo bianco)
        $(HTMLnewElement).children('.msg-text').text("Ricevuto, OK!"); // inserisco testo fittizio
        $(HTMLnewElement).children('.msg-time').text(currentTime); // inserisco ora corrente hh:mm

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('.conversation.c-active').append(HTMLnewElement);
    }, 1000);
} // end function showAnswer()


function catchTime() {
    // ritorna l'ora corrente nel formato hh:mm
    var time = "";
    var date = new Date();

    time = date.getHours() + ":" + date.getMinutes();
    return time;
}


function createChats() {

    // ciclo su tutto il DB e scorro tutti gli elementi
    for (var i = 0; i < boolzappDB.length; i++) {

        // estraggo il nome contatto corrente
        var contact = boolzappDB[i].contact;

        // estraggo tutta la chat corrente
        var chat = boolzappDB[i].chat;

        // clono un elemento 'conversation' che rappresenta una chat
        var conversation = $('.conversation.template').clone(true, true).removeClass('template');

        // inizio a valorizzare il clone col valore estratto dal DB
        conversation.attr('data-contact', contact); // aggiungo l'attributo data-contact

        // scorro i messaggi della chat accoppiata al contatto corrente
        for (var j = 0; j < chat.length; j++) {

            // estraggo le singole proprietà del messaggio corrente
            var flow = chat[j].msgFlow;
            var text = chat[j].msgText;
            var time = chat[j].msgTime;

            // creo un clone del messaggio
            var message = $('.msg-wrapper.template').clone(true, true).removeClass('template');

            // valorizzo il clone coi valori estratti dal DB
            message.addClass('' + flow); // aggiungo la classe che specifica se il msg è ricevuto o spedito
            message.find('.msg-text').text(text); // aggiungo il testo del messaggio
            message.find('.msg-time').text(time); // aggiungo l'ora

            // appendo il messaggio che ho ricostruito alla chat che sto costruendo
            conversation.append(message);

        } // fine ciclo scansione messaggi della chat

        // scrivo la singola conversazione sulla pagina HTML all'interno del contenitore 'conversations'
        // (da non confondersi con 'conversation' che rappresenta una singola chat)
        $('.conversations').append(conversation);

    } // fine ciclo scansione contatti/chats

    // setto come "attiva" la 1a conversazione che ho caricato dal DB
    $('.conversation').first().addClass('c-active');
}