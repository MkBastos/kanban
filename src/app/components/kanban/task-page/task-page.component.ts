import { MatDialog } from '@angular/material/dialog';
import { ICard } from '../../../shared/interfaces/ICard.interface';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { TaskManagerService } from '../../../shared/services/task.manager.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  todo: ICard[] = [];
  execution: ICard[] = [];
  finished: ICard[] = [];
  cancelled: ICard[] = [];
  allTasks: any;

  panelOpenState = false;

  constructor(public dialog: MatDialog, private service: TaskManagerService) {}

  ngOnInit(): void {
    this.calculateDiff();
    this.getTasksByUser();
  }

  drop(event: CdkDragDrop<ICard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      switch (event.container.element.nativeElement.id) {
        case 'cdk-drop-list-0':
          let body = {
            status: (event.container.data[0].status = 'backlog'),
            createdAt: (event.container.data[0].createdAt = ''),
          };
          this.service.updateTask(event.container.data[0].id, body).subscribe();
          break;
        case 'cdk-drop-list-1':
          body = {
            status: (event.container.data[0].status = 'in execution'),
            createdAt: (event.container.data[0].createdAt = `${this.getFormatedDate()}  ${this.getHour()}`),
          };
          this.service.updateTask(event.container.data[0].id, body).subscribe();
          break;
        case 'cdk-drop-list-2':
          let body_finished = {
            status: (event.container.data[0].status = 'finished'),
            finishedAt: (event.container.data[0].finishedAt = `${this.getFormatedDate()}  ${this.getHour()}`),
          };
          this.service.updateTask(event.container.data[0].id, body_finished).subscribe();
          break;
        case 'cdk-drop-list-3':
          let body_cancelled = {status: event.container.data[0].status = 'cancelled'}
          this.service.updateTask(event.container.data[0].id, body_cancelled).subscribe();
          break;
      }
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasksByUser();
    });
  }

  getFormatedDate(): string {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let formatedDate = `${day}-${month + 1}-${year}`;
    return formatedDate;
  }

  getHour() {
    let hours = new Date();
    let hour = hours.getHours();
    let minutes = hours.getMinutes();
    let formatedHour = `${hour}:${minutes}`;
    return formatedHour;
  }

  calculateDiff() {
    let created = new Date(2023, 3, 12, 0, 29);
    let finished = new Date(2023, 3, 12, 0, 30);
    let createdInMs = created.getTime();
    let finishedInMs = finished.getTime();
    let diff = createdInMs - finishedInMs;

    console.log(diff);
    this.convertDiff(diff);
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

  getTasksByUser() {
    this.service.getTasksByUser('miqueias').subscribe((next) => {
      this.todo = next.filter(
        (task: { status: string }) => task.status == 'backlog'
      );
      this.execution = next.filter(
        (task: { status: string }) => task.status == 'in execution'
      );
      this.finished = next.filter(
        (task: { status: string }) => task.status == 'finished'
      );
      this.cancelled = next.filter(
        (task: { status: string }) => task.status == 'cancelled'
      );
    });
  }
}
