import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as paper from 'paper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  tool = new paper.Tool();
  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    paper.setup(this.canvas.nativeElement);
    this.drawImg();

    const layer = new paper.Layer();
    let start;
    let length;
    this.tool.minDistance = 10;
    this.tool.onMouseDown = (e) => {
      start = e.point;
      length = layer.children.length;
      layer.activate();
    };

    this.tool.onMouseDrag = (e) => {
      const tl = new paper.Point(start);
      const size = new paper.Size((e.point.x - start.x), (e.point.y - start.y));
      const rect = new paper.Rectangle(tl, size);
      const path = new paper.Path.Rectangle(rect);
      path.strokeColor = new paper.Color('red');
      path.strokeWidth = 3;
      path.dashArray = [5, 1];
      if (layer.children.length >= (length + 2) && layer.children.length >= 2) {
        layer.removeChildren(layer.children.length - 2, layer.children.length - 1);
      }
    };
  }

  drawImg() {
    const center = new paper.Point(400, 320);
    const raster = new paper.Raster('../assets/6.jpg');
    raster.position = center;
    const img = raster.image;
    const size = raster.view.size;
    const initScale = (size.width / img.width) - (size.height / img.height) > 0 ? (size.height / img.height) : (size.width / img.width);
    raster.scale(initScale);
  }
}
