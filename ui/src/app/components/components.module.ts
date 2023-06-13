import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgComponent } from './svg/svg.component';

@NgModule({
  declarations: [SvgComponent],
  imports: [CommonModule],
  exports: [SvgComponent],
})
export class ComponentsModule {}
