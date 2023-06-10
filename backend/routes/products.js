const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/**
 * @description Gestisce la richiesta GET alla radice del percorso definito da questo router.
 * @route GET /
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Object} res - Oggetto della risposta HTTP.
 * @returns {Object} - Oggetto JSON contenente i prodotti trovati o un messaggio di errore.
 */
router.get('/', (req, res) => {
  // Verifica se il parametro 'page' è definito e diverso da 0, altrimenti lo imposta a 1
  let page = (req.query.page != undefined && req.query.page != 0 ) ? req.query.page : 1;
  // Verifica se il parametro 'limit' è definito e diverso da 0, altrimenti lo imposta a 10
  const limit = (req.query.limit != undefined && req.query.limit != 0 ) ? req.query.limit : 10;
  let startValue;
  let endValue;

  // Calcola i valori di inizio e fine in base al numero di pagina e al limite
  if(page > 0){
    startValue = (page * limit) - limit;
    endValue = page * limit;
  } else {
    // Se il numero di pagina è minore o uguale a 0, imposta i valori di default
    startValue = 0;
    endValue = 10;
  }

  // Esegue la query al database per ottenere i prodotti con join sulla tabella delle categorie
  database.table('products as p')
    .join([{
      table:'categories as c',
      on: 'c.id = p.cat_id'
    }])
    .withFields([
      'c.title as category', // Alias del campo "title" della tabella "categories" come "category"
      'p.title as name', // Alias del campo "title" della tabella "products" come "name"
      'p.price', // Campo "price" della tabella "products"
      'p.quantity', // Campo "quantity" della tabella "products"
      'p.image', // Campo "image" della tabella "products"
      'p.id' // Campo "id" della tabella "products"
    ])
    .slice(startValue, endValue) // Limita i risultati in base ai valori di inizio e fine
    .sort({ id: -1 }) // Ordina i risultati in ordine decrescente in base all'id
    .getAll() // Ottiene tutti i risultati della query
    .then(prods => {
      if (prods.length > 0) {
        // Se ci sono prodotti, restituisci una risposta JSON con i prodotti trovati
        res.status(200).json({
          count: prods.length, // Numero totale di prodotti restituiti
          products: prods // Array dei prodotti
        });
      } else {
        // Se non ci sono prodotti, restituisci un messaggio JSON
        res.json({ message: 'Nessun prodotto trovato' });
      }
    })
    .catch(err => console.log(err)); // Gestione degli errori durante l'esecuzione della query
});



/**
 * @description Ottiene un singolo prodotto.
 * @route GET /:prodId
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Object} res - Oggetto della risposta HTTP.
 * @returns {Object} - Oggetto JSON contenente il prodotto o un messaggio di errore.
 */
router.get('/:prodId', (req, res) => {
  // Ottieni l'ID del prodotto dalla richiesta
  let productId = req.params.prodId;
  console.log(productId);

  // Esegue la query al database per ottenere i prodotti con join sulla tabella delle categorie
  database.table('products as p')
    .join([{
      table:'categories as c',
      on: 'c.id = p.cat_id'
    }])
    .withFields([
      'c.title as category', // Alias del campo "title" della tabella "categories" come "category"
      'p.title as name', // Alias del campo "title" della tabella "products" come "name"
      'p.price', // Campo "price" della tabella "products"
      'p.quantity', // Campo "quantity" della tabella "products"
      'p.image', // Campo "image" della tabella "products"
      'p.images',
      'p.id' // Campo "id" della tabella "products"
    ])
    .filter({'p.id': productId})
    .get() // Ottiene tutti i risultati della query
    .then(prod => {
      if (prod) {
        // Se ci sono prodotti, restituisci una risposta JSON con i prodotti trovati
        res.status(200).json(prod);
      } else {
        // Se non ci sono prodotti, restituisci un messaggio JSON
        res.json({ message: 'Nessun prodotto trovato con l\'ID del prodotto ' + productId });
      }
    })
    .catch(err => console.log(err)); // Gestione degli errori durante l'esecuzione della query
});


/**
 * Questo endpoint ottiene i prodotti in base alla categoria specificata.
 *
 * @param {Object} req - L'oggetto della richiesta HTTP.
 * @param {Object} res - L'oggetto della risposta HTTP.
 */
router.get('/category/:catName', (req, res) => {
  // Ottieni il numero di pagina dalla query string, se presente, altrimenti imposta il valore predefinito a 1
  let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
  
  // Ottieni il limite di prodotti per pagina dalla query string, se presente, altrimenti imposta il valore predefinito a 10
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;

  let startValue;
  let endValue;

  if (page > 0) {
    // Calcola i valori di inizio e fine per la pagina corrente
    startValue = (page * limit) - limit;
    endValue = page * limit;
  } else {
    // Se il numero di pagina è inferiore o uguale a 0, imposta i valori di inizio e fine al valore predefinito
    startValue = 0;
    endValue = 10;
  }

  // Ottieni il nome della categoria dalla richiesta
  const cat_title = req.params.catName;

  // Esegui una query sul database per ottenere i prodotti corrispondenti alla categoria specificata
  database.table('products as p')
    .join([{
      table:'categories as c',
      on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
    }])
    .withFields([
      'c.title as category', 
      'p.title as name', 
      'p.price',
      'p.quantity', 
      'p.image', 
      'p.id' 
    ])
    .slice(startValue, endValue) 
    .sort({ id: -1 }) 
    .getAll()
    .then(prods => {
      if (prods.length > 0) {
        // Se sono stati trovati prodotti corrispondenti, restituisci la risposta con i prodotti e il conteggio
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      } else {
        // Se non sono stati trovati prodotti corrispondenti, restituisci un messaggio di avviso
        res.json({ message: 'Nessun prodotto trovato per la categoria ' + cat_title + '.' });
      }
    })
    .catch(err => console.log(err)); 
});



module.exports = router;