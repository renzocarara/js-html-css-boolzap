// DATABASE: boolzappDB
// DESCRIZIONE:
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

    // costruisco le conversazioni, leggo da una struttura dati (boolzappDB)
    // presente in questo script, creo il codice HTML e scrivo sulla pagina
    createChats();

    // MILESTONE1 - PUNTO 2

    // catturo click sull'icona di invio messaggio
    $('#send-input').click(function() {
        sendMsg(); //invoco funzione per gestire invio messaggio
    });

    // catturo evento "keypress" = ENTER, quando il cursore è posizionato
    // nella barra per l'invio del messaggio
    $('#send-msg-bar').keypress(function(event) {
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
            $('#contacts-panel .contact').each(function(index) {

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
            $('#contacts-panel .contact').each(function() {
                // rendo tutti i contatti visibili
                $(this).removeClass('notSearched');
            });
        }

    }); // end evento keyup in search bar


    // MILESTONE3 - PUNTO 1

    // gestisco click su CONTATTO nell'elenco in colonna a sinistra
    $('.contact').click(function() {
        // quando l'utente clicca su uno dei contatti in elenco,
        // nel pannello di destra deve apparire la conversazione associata a quel contatto
        // ogni conversazione è identificata da un attributo data-contact, che mi dà la corrispondenza con i contatti

        // disattivo il precedente contatto attivo
        $('.contact').removeClass('contact-active');
        // metto come contatto attivo quello appena cliccato
        $(this).addClass('contact-active');

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
        $('#myspeaker-header .myspeaker-text span:first-child').text(contactName);
        // aggiorno l'attributo src del tag img con la funzione attr()
        $('#myspeaker-header img').attr("src", "images/" + contactName.toLowerCase() + ".png");
    });

    // MILESTONE3 - PUNTO 2

    // gestisco evento mouseenter sui messaggi visualizzati
    $(document).on('mouseenter', '.msg-wrapper', function() {
        // quando l'utente posiziona il mouse all'interno del messaggio,
        // visualizzo un simbolino che dà accesso ad un dropdown menu
        $(this).find('.angle-down').removeClass('hidden');
    });

    // gestisco evento mouseleave sui messaggi visualizzati
    $(document).on('mouseleave', '.msg-wrapper', function() {
        // quando l'utente sposta il mouse all'esterno del messaggio,
        // nascondo il simbolino che dà accesso al dropdown menu
        $(this).find('.angle-down').addClass('hidden');
    });

    // gestisco click su icona per dropdown menu
    $(document).on('click', '.angle-down', function() {
        // quando l'utente clicca sull'iconcina del dropdown menu,
        // visualizzo il dropdown menu
        $(this).nextAll('.msg-dropdown').toggleClass('no-show');
    });

    // gestisco click su voce menu "Delete message"
    $(document).on('click', '.msg-dropdown ul li:last-child', function() {
        // rimuovo (cancello definitivamente l'elemento HTML)
        // il messaggio associato al dropdown menu cliccato
        // partendo dall'elemento cliccato (this) scorro verso l'alto il DOM,
        // cercando il primo ANCESTOR di classe "msg-wrapper"
        $(this).closest('.msg-wrapper').remove();
    });

    // gestisco il click su tutto il documento per nascondere i dropdown menu visualizzati
    // (simile all'applicazione whatsappWeb reale)
    $(document).click(function(evento) {
        //
        if (!$(evento.target).closest(".msg-wrapper").length) {
            // il click è all'esterno dell'elemento .msg-wrapper
            // chiudo tutti i dropdown menu eventualmente aperti
            $(".msg-dropdown").addClass("no-show");
        }

    });

}); // document ready

// --------------------------- FUNCTIONs ---------------------------------------
function sendMsg() {
    var messageToSend = $('#send-msg-bar input').val();

    // procedo solo se l'utente ha inserito del testo nel campo di input
    if (messageToSend) {

        var currentTime = catchTime(); // orario corrente

        // creo un oggetto con i dati da inserire nel messaggio
        var newMsg = {
            'msgFlow': 'msg-mine',
            'msgText': messageToSend,
            'msgTime': currentTime
        };

        // recupero il codice html dal template HANDLEBARS
        var message = $('#template-msg-wrapper').html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce un funzione
        var messageFunction = Handlebars.compile(message);

        // passo alla funzione creata da HANDLEBARS, l'oggetto che contiene i valori che andranno a sostituire i placeholder,
        // la funzione mi estrae i dati necessari per sostituire i placeholder contenuti nel template
        message = messageFunction(newMsg);

        // faccio una append del nuovo elemento all'interno della conversazione attiva in questo momento
        $('.conversation.c-active').append(message);

        //resetto il campo di input inserendo una stringa vuota
        $('#send-msg-bar input').val("");

        // ripristino icona alla destra del campo di input, rimuovendo e aggiungendo classi di Fontawesome
        $('#send-input i').removeClass('far fa-paper-plane').addClass('fas fa-microphone');

        // visualizzo (sposto) il contatto in cima al panello dei contatti
        $('.contact.contact-active').prependTo('#contacts-panel');

        showAnswer(); // simulo una risposta dell'interlocutore
    }
}

// MILESTONE2 - PUNTO 2

function showAnswer() {
    // creo e visualizzo una risposta simulata

    setTimeout(function() {

        var fakeAnswer = "Ricevuto, OK!"; // testo fittizio per la risposta simulata
        var currentTime = catchTime(); // ora corrente

        // creo un oggetto con i dati da inserire nel messaggio
        var newMsg = {
            'msgFlow': 'msg-speaker',
            'msgText': fakeAnswer,
            'msgTime': currentTime
        };

        // recupero il codice html dal template HANDLEBARS
        var message = $('#template-msg-wrapper').html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce un funzione
        var messageFunction = Handlebars.compile(message);

        // passo alla funzione creata da HANDLEBARS, l'oggetto che contiene i valori che andranno a sostituire i placeholder,
        // la funzione mi estrae i dati necessari per sostituire i placeholder contenuti nel template
        message = messageFunction(newMsg);

        // faccio una append del nuovo elemento all'interno del contenitore delle conversazioni
        $('.conversation.c-active').append(message);
    }, 1000);
} // end function showAnswer()


function catchTime() {
    // ritorna l'ora corrente nel formato hh:mm
    var date = new Date();
    return (date.getHours() + ":" + date.getMinutes());
}


function createChats() {

    // ciclo su tutto il DB e scorro tutti gli elementi
    for (var i = 0; i < boolzappDB.length; i++) {

        // estraggo il nome contatto corrente
        var contact = boolzappDB[i].contact;

        // estraggo tutta la chat corrente
        var chat = boolzappDB[i].chat;

        // recupero il codice html dal template HANDLEBARS
        var conversation = $('#template-conversation').html();

        // do in pasto a HANDLEBARS il codice html, lui mi restituisce un funzione
        var conversationFunction = Handlebars.compile(conversation);

        // uso la funzione generata da HANDLEBARS, creo l'html in cui i vari placeholder vengono sostituiti con il contenuto
        // della variabile che passo alla funzione, passo un oggetto, che rappresenta la conversazione corrente
        // la variabile è un oggetto che al suo interno ha una chiave che identifica il "placeholder" da sostituire
        conversation = conversationFunction(boolzappDB[i]);

        // inserisco la conversazione sulla pagina con il codice HTML che ho appena generato dal template HANDLEBARS
        // nel ciclo for che segue andrò a scrivere all'interno di questo elemento tutti i singoli messaggi della conversazione
        // inserisco la singola conversazione sulla pagina HTML all'interno del contenitore 'conversations'
        // (da non confondersi con 'conversation' che rappresenta una singola conversazione)
        $('.conversations').append(conversation);

        // scorro i messaggi della chat accoppiata al contatto corrente
        for (var j = 0; j < chat.length; j++) {

            // recupero il codice html dal template HANDLEBARS
            var message = $('#template-msg-wrapper').html();

            // do in pasto a HANDLEBARS il codice html, lui mi restituisce un funzione
            var messageFunction = Handlebars.compile(message);

            // passo alla funzione creata da HANDLEBARS, l'oggetto chat su cui sto lavorando,
            // la funzione mi estrae i dati necessari per sostituire i placeholder contenuti nel template
            message = messageFunction(chat[j]);

            // appendo il messaggio che ho costruito nlla conversazione che sto costruendo, l'ultima inserita in conversation
            $('.conversations .conversation:last-child').append(message);

        } // fine ciclo scansione messaggi della singola conversazione

    } // fine ciclo scansione di tutte le conversazioni

    // setto come "attiva" la 1a conversazione che ho caricato dal DB
    $('.conversation').first().addClass('c-active');
}