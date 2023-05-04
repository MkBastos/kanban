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
import { ConfirmModalComponent } from 'src/app/shared/modal/confim-modal/confirm.modal/confirm.modal.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  backlog: ICard[] = [];
  execution: ICard[] = [];
  finished: ICard[] = [];
  cancelled: ICard[] = [];
  allTasks: any;

  panelOpenState = false;

  constructor(public dialog: MatDialog, private service: TaskManagerService) {}

  ngOnInit(): void {
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
        0
      );
      this.updateMovedTasks(event);
    }
  }

  updateMovedTasks(event: CdkDragDrop<ICard[]>) {
    switch (event.container.element.nativeElement.id) {
      case 'cdk-drop-list-0':
        let backlog_body = {
          status: (event.container.data[0].status = 'backlog'),
          createdAt: (event.container.data[0].createdAt = ''),
        };
        this.service
          .updateTask(event.container.data[0].id, backlog_body)
          .subscribe();
        break;
      case 'cdk-drop-list-1':
        let execution_body = {
          status: (event.container.data[0].status = 'in execution'),
          createdAt:
            (event.container.data[0].createdAt = `${this.getFormatedDate()} ${this.getFormatedHour()}`),
          sla: this.calculateDurationTime(event.container.data[0], true),
        };
        this.service
          .updateTask(event.container.data[0].id, execution_body)
          .subscribe();
        break;
      case 'cdk-drop-list-2':
        let body_finished = {
          status: (event.container.data[0].status = 'finished'),
          finishedAt:
            (event.container.data[0].finishedAt = `${this.getFormatedDate()} ${this.getFormatedHour()}`),
          duration: this.calculateDurationTime(event.container.data[0]),
        };
        console.log('>>>', body_finished);
        this.service
          .updateTask(event.container.data[0].id, body_finished)
          .subscribe();
        break;
      case 'cdk-drop-list-3':
        this.deleteTask(event.container.data[0]);
        break;
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasksByUser();
    });
  }

  deleteTask(task: ICard) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasksByUser();
    });
  }

  getFormatedDate(): string {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let formatedDate = `${day}/${month + 1}/${year}`;
    return formatedDate;
  }

  getFormatedHour() {
    let hours = new Date();
    let hour = hours.getHours();
    let minutes = hours.getMinutes();
    let formatedHour = hour < 10 ? `0${hour}` : `${hour}`;
    let formatedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let result = `${formatedHour}:${formatedMinutes}`;
    return result;
  }

  getTasksByUser() {
    let user = localStorage.getItem('user');
    return this.service.getTasksByUser(user).subscribe((next) => {
      this.backlog = next.filter(
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

  calculateDurationTime(item: ICard, deadline?: boolean) {
    console.log('>', item.deadline);
    let convertedCreatedDate = this.convertDateFormat(item.createdAt as any);
    let createdTime = new Date(convertedCreatedDate);
    if (!deadline) {
      let convertedFinishedDate = this.convertDateFormat(
        item.finishedAt as any
      );
      let finishedTime = new Date(convertedFinishedDate);
      const diffInMs: number = Math.abs(
        createdTime.getTime() - finishedTime.getTime()
      );
      return this.convertDiff(diffInMs);
    } else {
      let convertedDeadlineDate = this.convertDateFormat(item.deadline as any);
      let deadlineTime = new Date(convertedDeadlineDate);
      const diffInMs: number = Math.abs(
        createdTime.getTime() - deadlineTime.getTime()
      );
      return this.convertDiff(diffInMs);
    }
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

  convertDateFormat(date: string) {
    console.log('>>>', date);
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
}
