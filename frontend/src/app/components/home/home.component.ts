// Importazione dei moduli necessari
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/header.interface';
import {
  Product,
  Timing,
  productDetails,
} from 'src/app/interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  interval: any;
  // Dichiarazione e inizializzazione dell'array "timing" di tipo "Timing"
  timing: Timing[] = [
    { time: 12, title: 'DAYS' },
    { time: 10, title: 'HOURS' },
    { time: 34, title: 'MINS' },
    { time: 59, title: 'SECS' },
  ];

  /**
   * Voci del menu da visualizzare nell'intestazione.
   */
  menuItems: MenuItem[] = [
    { route: '/', label: 'Laptops' },
    { route: '/cart', label: 'Cameras' },
    { route: '/a', label: 'Smartphones' },
    { route: '/v', label: 'Accessories' }
  ];

  // Dichiarazione e inizializzazione dell'array "showcaseArray" di tipo "Product"
  showcaseArray: Product[] = [
    { image: 'shop01', title: 'Laptops' },
    { image: 'shop02', title: 'Accessories' },
    { image: 'shop03', title: 'Cameras' },
  ];

  // Definizione della matrice dei dettagli dei prodotti
  products: productDetails[] = [
    {
      image: '/assets/images/product01.png',
      category: 'Laptop',
      name: 'Nenno Pisittu',
      price: 2013,
      rating: 5,
    },
    {
      image: '/assets/images/product02.png',
      category: 'Headphones',
      name: 'Pistis',
      price: 222,
      rating: 4,
    },
    {
      image: '/assets/images/product03.png',
      category: 'Laptop',
      name: 'Efisio',
      price: 9999,
      rating: 1,
    },
    {
      image: '/assets/images/product04.png',
      category: 'Tablet',
      name: 'YUUUU',
      price: 2013,
      rating: 2,
    },
    {
      image: '/assets/images/product05.png',
      category: 'Headphones',
      name: 'LOL',
      price: 965,
      rating: 5,
    },
    {
      image: '/assets/images/product06.png',
      category: 'Laptop',
      name: 'MSI',
      price: 789,
      rating: 4,
    },
    {
      image: '/assets/images/product07.png',
      category: 'Smartphone',
      name: 'GOO',
      price: 745,
      rating: 2,
    },
    {
      image: '/assets/images/product08.png',
      category: 'Laptop',
      name: 'Asus',
      price: 852,
      rating: 3,
    },
    {
      image: '/assets/images/product09.png',
      category: 'Camera',
      name: 'HI',
      price: 456,
      rating: 4,
    },
  ];

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

  /**
 * Metodo chiamato durante l'inizializzazione del componente.
 */
ngOnInit() {
  this.startTimer();
}

/**
 * Avvia il timer per la sincronizzazione dei tempi.
 */
startTimer() {
  // Imposta un intervallo di 1 secondo per eseguire la logica del timer
  this.interval = setInterval(() => {
    // Decrementa il tempo nell'array di timing dell'indice 3
    this.timing[3].time--;

    // Verifica se il tempo nell'array di timing dell'indice 3 è arrivato a -1
    if (this.timing[3].time == -1) {
      // Resetta il tempo nell'array di timing dell'indice 3 a 59
      this.timing[3].time = 59;

      // Decrementa il tempo nell'array di timing dell'indice 2
      this.timing[2].time--;
    }

    // Verifica se il tempo nell'array di timing dell'indice 2 è arrivato a -1
    if (this.timing[2].time == -1) {
      // Resetta il tempo nell'array di timing dell'indice 2 a 59
      this.timing[2].time = 59;

      // Decrementa il tempo nell'array di timing dell'indice 1
      this.timing[1].time--;
    }

    // Verifica se il tempo nell'array di timing dell'indice 1 è arrivato a -1
    if (this.timing[1].time == -1) {
      // Resetta il tempo nell'array di timing dell'indice 1 a 23
      this.timing[1].time = 23;

      // Decrementa il tempo nell'array di timing dell'indice 0
      this.timing[0].time--;
    }

    // Verifica se il tempo nell'array di timing dell'indice 0 è arrivato a -1
    if (this.timing[0].time == -1) {
      // Resetta i tempi in tutti gli array di timing a 0
      this.timing[0].time = 0;
      this.timing[1].time = 0;
      this.timing[2].time = 0;
      this.timing[3].time = 0;

      // Interrompi l'esecuzione dell'intervallo
      clearInterval(this.interval);
    }
  }, 1000);
}


}
