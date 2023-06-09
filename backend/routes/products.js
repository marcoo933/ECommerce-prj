// Importa il modulo 'express'
const express = require('express');

// Crea un nuovo router usando il modulo 'express.Router()'
const router = express.Router();

// Importa il modulo 'database' dalla cartella 'config/helpers'
const { database } = require('../config/helpers');

/* GET ALL PRODUCTS */
router.get('/', function(req, res) {
  // Ottieni il valore della pagina dalla query della richiesta
  // Imposta il valore predefinito come 1 se la query non è definita o è 0
  let page = (req.query.page === undefined && req.query.page !== 0) ? req.query.page : 1;

  // Ottieni il limite dalla query della richiesta
  // Imposta il valore predefinito come 10 se la query non è definita o è 0
  const limit = (req.query.limit === undefined && req.query.limit !== 0) ? req.query.limit : 10;

  let startValue;
  let endValue;

  if (page > 0) {
    // Calcola i valori di startValue e endValue in base alla pagina e al limite
    startValue = (page * limit) - limit;
    endValue = page * limit;
  } else {
    // Se la pagina è inferiore o uguale a 0, imposta i valori predefiniti
    startValue = 0;
    endValue = 10;
  }

  // Esegue una query sul database per ottenere i prodotti con determinati campi e condizioni
  database.table('products as p')
  .join([
    {
      table: 'categories as c',
      on: 'c.id = p.cat_id'
    }
  ])
  .withFields([
    'c.title as category',  // Seleziona il campo 'title' dalla tabella 'categories' con alias 'category'
    'p.title as name',  // Seleziona il campo 'title' dalla tabella 'products' con alias 'name'
    'p.price',  // Seleziona il campo 'price' dalla tabella 'products'
    'p.quantity',  // Seleziona il campo 'quantity' dalla tabella 'products'
    'p.image',  // Seleziona il campo 'image' dalla tabella 'products'
    'p.id'  // Seleziona il campo 'id' dalla tabella 'products'
  ])
  .slice(startValue, endValue)  // Esegue una suddivisione dei risultati per ottenere solo un intervallo specifico
  .sort({ id: -1 })  // Ordina i risultati in base all'ID in ordine decrescente (-1 indica l'ordine decrescente)
  .getAll()  // Esegue la query e restituisce tutti i risultati
  .then(prods => {
    if (prods.length > 0) {
      // Se ci sono prodotti trovati, invia una risposta con i dettagli dei prodotti
      res.status(200).json({
        count: prods.length,  // Numero totale di prodotti trovati
        products: prods  // Array dei prodotti trovati
      });
    } else {
      // Se non ci sono prodotti trovati, invia un messaggio di avviso
      res.json({ message: 'No products found' });
    }
  })
  .catch(err => console.log(err));  // Gestisce gli eventuali errori durante l'esecuzione della query
});

// Esporta il router per essere utilizzato in altre parti dell'applicazione
module.exports = router;
