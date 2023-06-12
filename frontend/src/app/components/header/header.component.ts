import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {
  ContactInfo,
  MenuItem,
  UserInfo,
} from 'src/app/interfaces/header.interface';

/**
 * Componente HeaderComponent per l'intestazione dell'applicazione.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Definizione di un array di categorie
  categories = ['All Categories', 'Categoria 2', 'Categoria 3'];

  // Inizializzazione della variabile selectedCategory con il valore 'All Categories'
  selectedCategory: string = 'All Categories';

  // Inizializzazione della variabile searchTerm come stringa vuota
  searchTerm: string = '';

  search(): void {
    // Logica per avviare la ricerca
    console.log('Categoria selezionata:', this.selectedCategory);
    console.log('Termine di ricerca:', this.searchTerm);
  }
  /**
   * Informazioni di contatto da visualizzare nell'intestazione.
   */
  contactInfo: ContactInfo[] = [
    { icon: 'call', text: '+021-95-51-54' },
    { icon: 'mail', text: 'email@email.com' },
    { icon: 'location_on', text: 'Via della montagna - 10' },
  ];

  /**
   * Informazioni dell'utente da visualizzare nell'intestazione.
   */
  userInfo: UserInfo[] = [
    { icon: 'attach_money', text: 'USD' },
    { icon: 'person', text: 'My Account' },
  ];

  /**
   * Voci del menu da visualizzare nell'intestazione.
   */
  menuItems: MenuItem[] = [
    { route: '/', label: 'Home' },
    { route: '/cart', label: 'Hot Deals' },
    { route: '/categories', label: 'Categories' },
    { route: '/laptops', label: 'Laptops' },
    { route: '/smartphones', label: 'Smartphones' },
    { route: '/cameras', label: 'Cameras' },
    { route: '/accessories', label: 'Accessories' },
  ];

  /**
   * Larghezza della finestra del browser.
   */
  windowWidth =
    window.innerWidth < window.screen.width
      ? window.innerWidth
      : window.screen.width;

  /**
   * Gestisce l'evento di ridimensionamento della finestra del browser.
   */
  @HostListener('window:resize')
  onWindowResize() {
    this.windowWidth =
      window.innerWidth < window.screen.width
        ? window.innerWidth
        : window.screen.width;
  }

  /**
   * Costruttore del componente HeaderComponent.
   * @param router Il router per la navigazione all'interno dell'applicazione.
   */
  constructor(private router: Router) {}

  /**
   * Verifica se l'URL del router corrente corrisponde all'URL specificato.
   * @param url L'URL da confrontare con l'URL corrente del router.
   * @returns True se l'URL corrente del router corrisponde all'URL specificato, altrimenti False.
   */
  isMenuActive(url: string): boolean {
    return this.router.url === url;
  }
}
