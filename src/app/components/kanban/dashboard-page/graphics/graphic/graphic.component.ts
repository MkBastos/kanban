import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';

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
      data: {
        mounth: 'janeiro',
        tasks: { title: 'todo', task: [{ name: 'tarefa 1' }] },
      },
    },
  ];

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
    this.getTaskTime(finishedTasks[0].task);
  }

  getTaskTime(list: any) {
    for (let item of list) {
      this.calculateAverageTime(item);
    }
  }

  calculateAverageTime(item: any) {
    let convertedCreatedDate = this.convertDateLocation(item.createdAt);
    let convertedFinishedDate = this.convertDateLocation(item.finishedAt);
    let createdTime = new Date(convertedCreatedDate);
    let finishedTime = new Date(convertedFinishedDate);
    const diffInMs: number = Math.abs(createdTime.getTime() - finishedTime.getTime());
    let body = {
      averageTime: this.convertDiff(diffInMs)
    }
    this.service.updateTask(item.id, body).subscribe()
  }

  convertDiff(ms: number): string {
    const minutes = Math.round(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }

  convertDateLocation(date: string) {
    let day = Number(date.slice(0, 2));
    let formatedDay = day < 10 ? `0${day}` : `${day}`
    let month = Number(date.slice(3, 4))
    let formatedMonth = month < 10 ? `0${month}` : `${month}`
    let year = date.slice(5, 9);
    let hour = date.slice(10, 12);
    let minute = date.slice(13, 15);
    return `${year}-${formatedMonth}-${formatedDay}T${hour}:${minute}`;
  }

  generateGraphic(type?: boolean) {
    console.log(type)
    let label
    if(type) {
      label = 'Média de tempo por tarefa'
    } else {
      label = 'Total de tarefas no mês'
    }
    new Chart(this.element.nativeElement, {
      type: 'line',
      data: {
        labels: this.info.map((row: any) => row.title),
        datasets: [
          {
            label: label,
            data: this.info.map((row: any) => row.task.length),
          },
        ],
      },
    });
  }

}
