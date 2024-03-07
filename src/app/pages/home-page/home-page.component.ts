import { Component } from '@angular/core';
import { Benefits } from 'src/app/shared/interfaces/benefits.interface';
import { HomeCategories } from 'src/app/shared/interfaces/home-categories.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

public categories1: HomeCategories[] = [
  {
    image: '../../../assets/images/categories/software.png',
    categoryName: 'SOFTWARE'
  },
  {
    image: '../../../assets/images/categories/audioInterface.png',
    categoryName: 'INTERFAZ DE AUDIO'
  },
  {
    image: '../../../assets/images/categories/headphones.png',
    categoryName: 'AURICULARES'
  },
  {
    image: '../../../assets/images/categories/monitores.png',
    categoryName: 'MONITORES'
  }
];
public categories2: HomeCategories[] = [
  {
    image: '../../../assets/images/categories/midi.png',
    categoryName: 'MIDI'
  },
  {
    image: '../../../assets/images/categories/mixer.png',
    categoryName: 'MESAS DE MEZCLAS'
  },
  {
    image: '../../../assets/images/categories/microphone.png',
    categoryName: 'MICRÓFONOS'
  },
  {
    image: '../../../assets/images/categories/cable.png',
    categoryName: 'CABLES'
  },
];

public benefits1: Benefits[] = [
  {
    image: '../../../assets/images/iconos/iconosVentajas/garantia.png',
    title: '5 años de garantía'
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/pagoSeguro.png',
    title: 'Pago seguro'
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/envio.png',
    title: 'Envíos gratis (mín. 50€)'
  },

]
public benefits2: Benefits[] = [
  {
    image: '../../../assets/images/iconos/iconosVentajas/bestEcommerce.png',
    title: 'Ecommerce del año'
  },

  {
    image: '../../../assets/images/iconos/iconosVentajas/soporteTecnico.png',
    title: 'Soporte técnico'
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/devoluciones.png',
    title: '30 días de devoluciones'
  },
]


}
