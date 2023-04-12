import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild('graphic', { static: true }) element!: ElementRef;

  data = [
    {
      owner: 'miqueias',
      data: {mounth: 'janeiro', tasks: {title: 'todo', task: [{name: 'tarefa 1'}]}}
    }
  ];

  @Input() info!: any;

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
        labels: this.info.map((row: any) => row.title),
        datasets: [
          {
            label: 'Total de tarefas no mês',
            data: this.info.map((row: any) => row.task.length),
          },
        ],
      },
    });
  }
}
