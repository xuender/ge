import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, zoom } from 'd3';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent implements OnInit {
  @ViewChild('svg', { static: true })
  svgElement?: ElementRef;
  @Input()
  height = 0;
  @Input()
  width = 0;
  private g?: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _url = '';
  private _svg = '';
  constructor() {}

  get svg() {
    return this._svg;
  }
  get url() {
    return this._url;
  }

  @Input()
  set svg(data: string) {
    this._svg = data;

    if (!this.g || !data) {
      return;
    }

    this.g.selectChildren().remove();

    const image = this.g.append('svg');
    image.html(data);
  }

  @Input()
  set url(url: string) {
    this._url = url;

    if (!this.g || !url) {
      return;
    }

    this.g.selectChildren().remove();

    const image = this.g.append('svg:image');
    image.attr('xlink:href', url);
    image.attr('width', this.width);
    image.attr('height', this.height);
  }

  ngOnInit() {
    if (!this.width) {
      this.width = window.innerWidth;
    }

    if (!this.height) {
      this.height = window.innerHeight;
    }

    if (!this.svgElement) {
      return;
    }

    const el: SVGSVGElement = this.svgElement.nativeElement;
    const svg = select(el);
    this.g = svg.append('g');
    const svgZoom = zoom().on('zoom', (e) => {
      if (this.g) {
        this.g.attr(
          'transform',
          `translate(${e.transform.x}, ${e.transform.y}) scale(${e.transform.k})`
        );
      }
    });

    svg.call(svgZoom as any);

    if (this._url) {
      this.url = this._url;
    }

    if (this._svg) {
      this.svg = this._svg;
    }
  }
}
