const express = require("express");
const router = express.Router();
const { database } = require("../config/helpers");

/**
 * Rotta per ottenere tutti gli ordini con i dettagli associati.
 * @param {Object} req - Oggetto di richiesta HTTP.
 * @param {Object} res - Oggetto di risposta HTTP.
 */
router.get("/", (req, res) => {
	// Esegue una query al database per ottenere gli ordini con i dettagli associati
	database
		.table("orders_details as od")
		.join([
			{
				table: "orders as o",
				on: "o.id = od.order_id",
			},
			{
				table: "products as p",
				on: "p.id = od.product_id",
			},
			{
				table: "users as u",
				on: "u.id = o.user_id",
			},
		])
		// Seleziona i campi desiderati per la risposta
		.withFields([
			"o.id",
			"p.title as name",
			"p.description",
			"p.price",
			"u.username",
		])
    // ordina la response
    .sort({id:1})
		// Esegue la query e ottiene tutti gli ordini con i dettagli associati
		.getAll()
		.then((orders) => {
			if (orders.length > 0) {
				// Se sono presenti ordini, invia una risposta con lo status 200 e l'array degli ordini
				res.status(200).json(orders);
			} else {
				// Se non sono presenti ordini, invia una risposta con un messaggio di nessun ordine trovato
				res.json({ message: "Nessun ordine trovato" });
			}
		})
		.catch((err) => console.log(err));
});

/**
 * Rotta per ottenere un ordine specifico con i dettagli associati.
 * @param {Object} req - Oggetto di richiesta HTTP.
 * @param {Object} res - Oggetto di risposta HTTP.
 */
router.get('/:id', (req,res) => {
  // Ottiene l'ID dell'ordine dalla richiesta dei parametri
  const orderId = req.params.id;

  // Esegue una query al database per ottenere l'ordine specifico con i dettagli associati
  database
  .table("orders_details as od")
  .join([
    {
      table: "orders as o",
      on: "o.id = od.order_id",
    },
    {
      table: "products as p",
      on: "p.id = od.product_id",
    },
    {
      table: "users as u",
      on: "u.id = o.user_id",
    },
  ])
  // Seleziona i campi desiderati per la risposta
  .withFields([
    "o.id",
    "p.title as name",
    "p.description",
    "p.price",
    "u.username",
  ])
  // Filtra gli ordini per l'ID specificato
  .filter({'o.id': orderId})
  // Esegue la query e ottiene l'ordine specifico con i dettagli associati
  .getAll()
  .then((orders) => {
    if (orders.length > 0) {
      // Se è presente l'ordine, invia una risposta con lo status 200 e l'array dell'ordine
      res.status(200).json(orders);
    } else {
      // Se l'ordine non è presente, invia una risposta con un messaggio di nessun ordine trovato
      res.json({ message: "Nessun ordine trovato with orderId " + orderId });
    }
  })
  .catch((err) => console.log(err));
});


module.exports = router;
