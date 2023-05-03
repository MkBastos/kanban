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
    this.getTaskTime(finishedTasks[0].task);
  }

  getTaskTime(list: any) {
    for (let item of list) {
      this.calculateDurationTime(item);
    }
  }

  calculateDurationTime(item: any) {
    let convertedCreatedDate = this.convertDateLocation(item.createdAt);
    let convertedFinishedDate = this.convertDateLocation(item.finishedAt);
    let createdTime = new Date(convertedCreatedDate);
    let finishedTime = new Date(convertedFinishedDate);
    const diffInMs: number = Math.abs(
      createdTime.getTime() - finishedTime.getTime()
    );
    let body = {
      duration: this.convertDiff(diffInMs),
    };
    this.service.updateTask(item.id, body).subscribe();
  }

  convertDiff(ms: number): string {
    const minutes = Math.round(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes =
      remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }

  convertDateLocation(date: string) {
    let formatedDate = date.split('/');
    let day = Number(formatedDate[0]);
    let formatedDay = day < 10 ? `0${day}` : `${day}`;
    let month = Number(formatedDate[1]);
    let formatedMonth = month < 10 ? `0${month}` : `${month}`;
    let formatedYear = formatedDate[2].split(' ');
    let year = formatedYear[0];
    let formatedHour = formatedYear[1];
    let newHour = formatedHour.split(':');
    let hour = newHour[0];
    let minute = newHour[1];
    return `${year}-${formatedMonth}-${formatedDay}T${hour}:${minute}`;
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
              label: 'sla',
              data: data.map((row: any) => row.deadline)
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
