const fs = require('fs');

class Ticket {
    constructor(numero, caja) {
        this.numero = numero;
        this.caja = caja;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(caja) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        console.log('numero ticket; ', numeroTicket);
        this.tickets.shift(); // Elimina el primer elemento del arreglo

        let atenderTicket = new Ticket(numeroTicket, caja);
        this.ultimos4.unshift(atenderTicket); // Agrega el elemento al inicio del arreglo.

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Elimina el ultimo elemento del arreglo.
        }

        console.log('Ultimos 4 Tickets Atendidos:');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema');
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}