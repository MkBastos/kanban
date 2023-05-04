import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild('graphic', { static: true }) element!: ElementRef;

  @Input() info!: any;
  @Input() type!: boolean;

  constructor(private service: TaskManagerService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.generateGraphic(this.type);
    this.filterTasks();
  }

  filterTasks() {
    let finishedTasks = this.info.filter(
      (task: { title: string }) => task.title == 'finished'
    );
  }

  generateGraphic(type?: boolean) {
    let label;
    let data;
    if (type) {
      data = this.info.filter(
        (task: { title: string }) => task.title == 'finished'
      );
      data = data[0].task;
      label = 'tempo por tarefa';
      return new Chart(this.element.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map((row: any) => row.title),
          datasets: [
            {
              label: label,
              data: data.map((row: any) => row.duration?.replace(':', '.')),
            },
            {
              type: 'line',
              label: 'sla',
              data: data.map((row: any) => row.sla?.replace(':', '.'))
          }
          ],
        },
      });
    } else {
      data = this.info;
      label = 'Total de tarefas no mês';
      return new Chart(this.element.nativeElement, {
        type: 'bar',
        data: {
          labels: data.map((row: any) => row.title),
          datasets: [
            {
              label: label,
              data: data.map((row: any) => row.task.length),
            },
          ],
        },
      });
    }
  }
}
