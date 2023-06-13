import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppService } from '../api/app.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CodePage implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}
}
