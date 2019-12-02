$(document).ready(function() {


    // catturo click per invio messaggio
    $('#send-input').click(function() {
        console.log($('#r-input-bar input').val());
        var messageToSend = $('#r-input-bar input').val();

        // clono un elemento template e rimuovo la classe template
        var HTMLnewElement = $('.template').clone().removeClass('template');
        console.log("prima html: ", HTMLnewElement.html());
        console.log("prima text: ", HTMLnewElement.text());

        // valorizzo l'elemento HTML da aggiungere nel contenitore conversazioni con il testo introdotto dall'utente
        // $($(HTMLnewElement).html()).text(messageToSend);
        $(HTMLnewElement).children().text(messageToSend);

        // <div class="template"><span class="msg-wrapper msg-mine">template</span></div>
        // '.msg-wrapper').text(messageToSend);

        console.log("dopo html: ", HTMLnewElement.html());
        console.log("dopo text: ", HTMLnewElement.text());

        // faccio una append del messaggio che l'utente ha inviato all'interno del contenitore delle conversazioni
        $('#r-conversation').append(HTMLnewElement);
    });

});