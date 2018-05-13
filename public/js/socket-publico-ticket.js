var socket = io();

var lblTicket1 = $('#lblTicket2');
var lblTicket2 = $('#lblTicket3');
var lblTicket3 = $('#lblTicket1');
var lblTicket4 = $('#lblTicket4');

var lblCaja1 = $('#lblEscritorio1');
var lblCaja2 = $('#lblEscritorio2');
var lblCaja3 = $('#lblEscritorio3');
var lblCaja4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblCajas = [lblCaja1, lblCaja2, lblCaja3, lblCaja4];

socket.on('estadoActual', (data) => {
    actualizaHTML(data.ultimos4);
});
socket.on('ultimos4', (data) => {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
});

function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblCajas[i].text('Caja ' + ultimos4[i].caja);
    }
}