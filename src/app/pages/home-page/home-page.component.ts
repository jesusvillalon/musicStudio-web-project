import { Component } from '@angular/core';
import { HomeCategories } from 'src/app/shared/interfaces/home-categories.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

public categories: HomeCategories[] = [
  {
    image: '../../../assets/images/categories/software.jpg',
    categoryName: 'SOFTWARE'
  },
  {
    image: '../../../assets/images/categories/audioInterface.webp',
    categoryName: 'INTERFAZ DE AUDIO'
  },
  {
    image: '../../../assets/images/categories/headphones.webp',
    categoryName: 'AURICULARES'
  },
  {
    image: '../../../assets/images/categories/monitores.jpeg',
    categoryName: 'MONITORES'
  },
  {
    image: '../../../assets/images/categories/midi.jpeg',
    categoryName: 'MIDI'
  },
  {
    image: '../../../assets/images/categories/mixer.webp',
    categoryName: 'MESAS DE MEZCLAS'
  },
  {
    image: '../../../assets/images/categories/microphone.webp',
    categoryName: 'MICRÓFONOS'
  },
  {
    image: '../../../assets/images/categories/cable.webp',
    categoryName: 'CABLES'
  },
];




}
