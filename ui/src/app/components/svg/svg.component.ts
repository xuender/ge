import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { select, zoom } from 'd3';
import { darkenHex, negateHex, selectAttribute, selectParent } from './color';
import { getBox, getGraph } from './svg';

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
  private selection?: d3.Selection<SVGGElement, unknown, null, undefined>;
  private _url = '';
  private _svg = '';
  constructor() {}

  get svg() {
    return this._svg;
  }

  get url() {
    return this._url;
  }

  private oldElement?: Node;
  private selectElement?: SVGGElement;
  private selectID = '';

  @Input()
  set svg(data: string) {
    this._svg = data;

    if (!this.selection || !data) {
      return;
    }

    this.selection.selectChildren().remove();

    const image = this.selection.append('g');
    data = data.replace(/class="node"/g, 'class="node" style="cursor:pointer"');
    data = data.replace(/class="edge"/g, 'class="edge" style="cursor:pointer"');
    data = data.replace(/fill="none"/g, 'fill="white"');
    // console.log(data);
    image.html(data);

    // this.selection.selectAll('.node, .edge').on('click', (e: PointerEvent) => {
    //   console.log('click', e);
    //   console.log('id', clickID(e.target));
    //   // document.querySelector("#node1 ellipse").setAttribute('fill', 'red')
    // });
    this.initSelection();
  }

  @Input()
  set url(url: string) {
    this._url = url;

    if (!this.selection || !url) {
      return;
    }

    this.selection.selectChildren().remove();

    const image = this.selection.append('svg:image');
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

    const elem: SVGSVGElement = this.svgElement.nativeElement;
    const svg = select(elem);
    this.selection = svg.append('g');
    const svgZoom = zoom().on('zoom', (e) => {
      if (this.selection) {
        this.selection.attr(
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

  private click(event: PointerEvent) {
    const select = selectParent(event.target as HTMLElement, ['edge', 'node']);
    if (!select) {
      return;
    }

    const id = select.id;
    if (!id || id == this.selectID) {
      return;
    }
    if (this.selectElement && this.oldElement) {
      const parent = this.selectElement.parentElement;
      parent?.removeChild(this.selectElement);
      parent?.appendChild(this.oldElement);
    }

    const cname = select.getAttribute('class');
    const gs = getGraph(select as SVGGElement);
    if (!gs) {
      return;
    }
    this.oldElement = select.cloneNode(true);
    this.oldElement?.addEventListener('click', (e) =>
      this.click(e as PointerEvent)
    );
    console.log('click id:', id, 'select:', this.selectID, select, cname, gs);
    this.selectID = id;
    this.selectElement = select;

    gs.forEach((g) => selectAttribute(g, cname === 'node'));
  }
  private initSelection() {
    this.selection
      ?.selectAll('.node,.edge')
      .on('click', (event: PointerEvent) => this.click(event));
  }
}
