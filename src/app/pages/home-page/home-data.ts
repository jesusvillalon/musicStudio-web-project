import { HomeCategories, InitialCategories } from 'src/app/shared/interfaces/home-categories.interface';
import { Benefits } from 'src/app/shared/interfaces/benefits.interface';
import { Brands } from 'src/app/shared/interfaces/brands.interface';

export const initialCategories: InitialCategories[] = [
  {categoryTitle: 'software'},
  {categoryTitle: 'auriculares'},
  {categoryTitle: 'midi'},
  {categoryTitle: 'microfono'},
  {categoryTitle: 'cables'},
  {categoryTitle: 'ofertas'},
];
export const categories1: HomeCategories[] = [
  {
    image: '../../../assets/images/categories/software.png',
    categoryTitle: 'SOFTWARE',
    categoryName: 'software'
  },
  {
    image: '../../../assets/images/categories/audioInterface.png',
    categoryTitle: 'INTERFAZ DE AUDIO',
    categoryName: 'interfaz-de-audio'
  },
  {
    image: '../../../assets/images/categories/headphones.png',
    categoryTitle: 'AURICULARES',
    categoryName: 'auriculares'
  },
  {
    image: '../../../assets/images/categories/monitores.png',
    categoryTitle: 'MONITORES',
    categoryName: 'monitores'
  },
];
export const categories2: HomeCategories[] = [
  {
    image: '../../../assets/images/categories/midi.png',
    categoryTitle: 'MIDI',
    categoryName: 'midi'
  },
  {
    image: '../../../assets/images/categories/mixer.png',
    categoryTitle: 'MESAS DE MEZCLAS',
    categoryName: 'mesas-de-mezclas'
  },
  {
    image: '../../../assets/images/categories/microphone.png',
    categoryTitle: 'MICRÓFONOS',
    categoryName: 'microfonos'
  },
  {
    image: '../../../assets/images/categories/cable.png',
    categoryTitle: 'CABLES',
    categoryName: 'cables'
  },
];
export const benefits1: Benefits[] = [
  {
    image: '../../../assets/images/iconos/iconosVentajas/garantia.png',
    title: '5 años de garantía',
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/pagoSeguro.png',
    title: 'Pago seguro',
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/envio.png',
    title: 'Envíos gratis (mín. 50€)',
  },
];
export const benefits2: Benefits[] = [
  {
    image: '../../../assets/images/iconos/iconosVentajas/bestEcommerce.png',
    title: 'Ecommerce del año',
  },

  {
    image: '../../../assets/images/iconos/iconosVentajas/soporteTecnico.png',
    title: 'Soporte técnico',
  },
  {
    image: '../../../assets/images/iconos/iconosVentajas/devoluciones.png',
    title: '30 días de devoluciones',
  },
];
export const brands: Brands[] = [
  { image: '../../../assets/images/brands/akg.jpg', name: 'akg' },
  {
    image: '../../../assets/images/brands/audio_technica.jpg',
    name: 'audio-technica',
  },
  { image: '../../../assets/images/brands/behringer.jpg', name: 'behringer' },
  {
    image: '../../../assets/images/brands/beyerdynamic.jpg',
    name: 'beyerdynamic',
  },
  { image: '../../../assets/images/brands/boss.jpg', name: 'boss' },
  { image: '../../../assets/images/brands/korg.jpg', name: 'korg' },
  { image: '../../../assets/images/brands/kramer.png', name: 'kramer' },
  { image: '../../../assets/images/brands/ludwig.jpg', name: 'ludwig' },
  {
    image: '../../../assets/images/brands/native_instruments.jpg',
    name: 'native-instrument',
  },
  { image: '../../../assets/images/brands/nord.jpg', name: 'nord' },
  { image: '../../../assets/images/brands/rode.jpg', name: 'rode' },
  { image: '../../../assets/images/brands/roland.jpg', name: 'roland' },
  {
    image: '../../../assets/images/brands/sennheiser.jpg',
    name: 'sennheiser',
  },
  { image: '../../../assets/images/brands/udg.jpg', name: 'udg' },
  {
    image: '../../../assets/images/brands/universal_audio.jpg',
    name: 'universal-audio',
  },
  { image: '../../../assets/images/brands/yamaha.jpg', name: 'yamaha' },
];
