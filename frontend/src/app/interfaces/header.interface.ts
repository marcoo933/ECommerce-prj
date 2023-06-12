// Interfaccia per rappresentare le informazioni di contatto
export interface ContactInfo {
  icon: string; // Icona associata alle informazioni di contatto
  text: string; // Testo delle informazioni di contatto
}

// Interfaccia per rappresentare le informazioni dell'utente
export interface UserInfo {
  icon: string; // Icona associata alle informazioni dell'utente
  text: string; // Testo delle informazioni dell'utente
}

// Interfaccia per rappresentare un elemento di menu
export interface MenuItem {
  route: string; // Percorso associato all'elemento di menu
  label: string; // Etichetta dell'elemento di menu
}
