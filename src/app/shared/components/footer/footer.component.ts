import { Component } from '@angular/core';
import { SocialMedia } from '../../interfaces/socialMedia.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public socialMedia1: SocialMedia[] = [
    {
      logoImg: '../../../../assets/images/iconos/RRSS/facebook.png',
      title: 'facebook'
    },
    {
      logoImg: '../../../../assets/images/iconos/RRSS/twitter.png',
      title: 'twitter'
    },
    {
      logoImg: '../../../../assets/images/iconos/RRSS/instagram.png',
      title: 'instagram'
    },
  ];
 public socialMedia2: SocialMedia[] = [
  {
    logoImg: '../../../../assets/images/iconos/RRSS/linkedin.png',
    title: 'linkedin'
  },
  {
    logoImg: '../../../../assets/images/iconos/RRSS/telegram.png',
    title: 'telegram'
  },
  {
    logoImg: '../../../../assets/images/iconos/RRSS/whatsapp.png',
    title: 'whatsapp'
  },
 ]

}
