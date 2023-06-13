// Definizione dell'interfaccia "Product"
export interface Product {
  image: string; // Proprietà per l'immagine del prodotto
  title: string; // Proprietà per il titolo del prodotto
}

export interface productDetails {
  image?: string; // Opzionale: URL dell'immagine del prodotto
  category?: string; // Opzionale: Categoria del prodotto
  name?: string; // Opzionale: Nome del prodotto
  price?: number; // Opzionale: Prezzo del prodotto
  rating: number; // Valore richiesto: Valutazione del prodotto
}
