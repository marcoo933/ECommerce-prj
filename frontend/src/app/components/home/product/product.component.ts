import { Component, Input } from '@angular/core';
import { productDetails } from 'src/app/interfaces/home.interface';

@Component({
  selector: 'app-product', // Selettore del componente
  templateUrl: './product.component.html', // URL del template HTML associato al componente
  styleUrls: ['./product.component.css'] // URL del file CSS associato al componente
})
export class ProductComponent {
  @Input() productDetails: productDetails={rating:0}; // Input decorato per ricevere i dettagli del prodotto come input dal componente padre
}
