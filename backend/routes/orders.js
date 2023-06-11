const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { database } = require("../config/helpers");

// create application/json parser
const jsonParser = bodyParser.json();

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
		.sort({ id: 1 })
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
router.get("/:id", (req, res) => {
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
		.filter({ "o.id": orderId })
		// Esegue la query e ottiene l'ordine specifico con i dettagli associati
		.getAll()
		.then((orders) => {
			if (orders.length > 0) {
				// Se è presente l'ordine, invia una risposta con lo status 200 e l'array dell'ordine
				res.status(200).json(orders);
			} else {
				// Se l'ordine non è presente, invia una risposta con un messaggio di nessun ordine trovato
				res.json({
					message: "Nessun ordine trovato with orderId " + orderId,
				});
			}
		})
		.catch((err) => console.log(err));
});

/**
 * Endpoint per effettuare un nuovo ordine.
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Object} res - Oggetto della risposta HTTP.
 * @returns {void}
 */
router.post("/new", jsonParser, (req, res) => {
	let { userId, products } = req.body;

	if (userId != null && userId > 0 && !isNaN(userId)) {
		// Inserimento dell'ordine nella tabella 'orders'
		database
			.table("orders")
			.insert({
				user_id: userId,
			})
			.then((newOrderId) => {
				if (newOrderId.affectedRows > 0) {
					// Iterazione sui prodotti dell'ordine
					products.forEach(async (p) => {
						// Recupero dei dati del prodotto dalla tabella 'products'
						let data = await database
							.table("products")
							.filter({ id: p.id })
							.withFields(["quantity"])
							.get();

						let inCart = p.incart;

						if (data.quantity > 0) {
							// Sottrazione del numero di pezzi ordinati dalla quantità disponibile nel database
							data.quantity = data.quantity - inCart;

							if (data.quantity < 0) {
								data.quantity = 0;
							}
						} else {
							data.quantity = 0;
						}

						// Inserimento dei dettagli dell'ordine nella tabella 'orders_details' rispetto al nuovo ID dell'ordine creato
						database
							.table("orders_details")
							.insert({
								order_id: newOrderId.insertId,
								product_id: p.id,
								quantity: inCart,
							})
							.then((newId) => {
								// Aggiornamento della quantità del prodotto nella tabella 'products'
								database
									.table("products")
									.filter({ id: p.id })
									.update({
										quantity: data.quantity,
									})
									.then((successNum) => {})
									.catch((err) => console.log(err));
							})
							.catch((err) => console.log(err));
					});
				} else {
					res.json({
						message: "New order failed while adding order details",
						success: false,
					});
				}
				res.json({
					message:
						"Order successfully placed with order id " +
						newOrderId.insertId,
					success: true,
					order_id: newOrderId,
					products: products,
				});
			})
			.catch((err) => console.log(err));
	} else {
		res.json({ message: "New order failed", success: false });
	}
});

/**
 * Endpoint per effettuare il pagamento.
 * @param {Object} req - Oggetto della richiesta HTTP.
 * @param {Object} res - Oggetto della risposta HTTP.
 * @returns {void}
 */
router.post("/payment", jsonParser, (req, res) => {
	// Simulazione di un ritardo di 3 secondi per il pagamento
	setTimeout(() => {
		res.status(200).json({ success: true });
	}, 3000);
});

module.exports = router;
