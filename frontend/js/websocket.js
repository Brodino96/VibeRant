const socket = new WebSocket('ws://localhost:3000');

// Evento quando la connessione è aperta
socket.addEventListener('open', () => {
    console.log('Connesso al WebSocket server');
});

// Evento quando si ricevono messaggi dal server
socket.addEventListener('message', (event) => {
    console.log('Dati ricevuti dal server:', event.data);
});

// Evento quando la connessione è chiusa
socket.addEventListener('close', () => {
    console.log('Connessione chiusa');
});

// Evento in caso di errore
socket.addEventListener('error', (error) => {
    console.error('Errore WebSocket:', error);
});