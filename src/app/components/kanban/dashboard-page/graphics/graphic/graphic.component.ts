import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild('graphic', { static: true }) element!: ElementRef;
  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.generateGraphic();
  }

  generateGraphic() {
    new Chart(this.element.nativeElement, {
      type: 'line',
      data: {
        labels: this.data.map((row) => row.year),
        datasets: [
          {
            label: 'Aquisição por ano',
            data: this.data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
