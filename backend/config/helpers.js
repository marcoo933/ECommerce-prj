// Importa il modulo 'mysqli'
const MySqli = require('mysqli');

// Crea una nuova istanza di MySqli e passa i dettagli di connessione come oggetto di configurazione
let conn = new MySqli({
  Host: 'localhost',    // Indirizzo del server di database
  post: 3306,           // Porta del server di database
  user: 'root',    // Nome utente per l'accesso al database
  passwd: 'admin',    // Password per l'accesso al database
  db: 'mega_shop'       // Nome del database
});

// Emetti la connessione al database impostando 'fromSlave' su false e 'db' su una stringa vuota
let db = conn.emit({ fromSlave: false, db: '' });

// Esporta un oggetto che contiene la configurazione del database
module.exports = {
  database: db
};