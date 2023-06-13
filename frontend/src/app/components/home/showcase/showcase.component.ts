// Import dei moduli necessari
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent {
  @Input() image = ''; // Proprietà di input per l'immagine
  @Input() title = ''; // Proprietà di input per il titolo
}
