import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppService } from './api/app.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  appPages = [
    { title: 'Editor', url: '/editor', icon: 'desktop' },
    { title: 'Code', url: '/code', icon: 'code-slash' },
  ];
  constructor(public app: AppService) {}
}
