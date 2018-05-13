var socket = io();

var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('caja'));

if (!searchParams.has('caja')) {
    window.location = 'index.html';
    throw new Erro('La caja es necesaria');
}

var caja = searchParams.get('caja');
var label = $('small');

console.log(caja);
$('h1').text('Caja ' + caja);

$('button').on('click', function() {
    socket.emit('atenderTicket', { caja: caja }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});