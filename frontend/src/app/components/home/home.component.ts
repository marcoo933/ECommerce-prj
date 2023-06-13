// Importazione dei moduli necessari
import { Component } from '@angular/core';
import { Product, productDetails } from 'src/app/interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Dichiarazione e inizializzazione dell'array "showcaseArray" di tipo "Product"
  showcaseArray: Product[] = [
    { image: 'shop01', title: 'Laptops' },
    { image: 'shop02', title: 'Accessories' },
    { image: 'shop03', title: 'Cameras' },
  ];

  // Definizione della matrice dei dettagli dei prodotti
  products: productDetails[] = [
    {
      image: "/assets/images/product01.png",
      category: "Laptop",
      name: "Nenno Pisittu",
      price: 2013,
      rating: 5
    },
    {
      image: "/assets/images/product02.png",
      category: "Headphones",
      name: "Pistis",
      price: 222,
      rating: 4
    },
    {
      image: "/assets/images/product03.png",
      category: "Laptop",
      name: "Efisio",
      price: 9999,
      rating: 1
    },
    {
      image: "/assets/images/product04.png",
      category: "Tablet",
      name: "YUUUU",
      price: 2013,
      rating: 2
    },
    {
      image: "/assets/images/product05.png",
      category: "Headphones",
      name: "LOL",
      price: 965,
      rating: 5
    },
    {
      image: "/assets/images/product06.png",
      category: "Laptop",
      name: "MSI",
      price: 789,
      rating: 4
    },
    {
      image: "/assets/images/product07.png",
      category: "Smartphone",
      name: "GOO",
      price: 745,
      rating: 2
    },
    {
      image: "/assets/images/product08.png",
      category: "Laptop",
      name: "Asus",
      price: 852,
      rating: 3
    },
    {
      image: "/assets/images/product09.png",
      category: "Camera",
      name: "HI",
      price: 456,
      rating: 4
    }
  ];
}
