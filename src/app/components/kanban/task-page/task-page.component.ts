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

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  todo: ICard[] = [];
  done: ICard[] = [];
  finished: ICard[] = [];
  cancelled: ICard[] = [];

  panelOpenState = false;

  constructor(public dialog: MatDialog, private service: TaskManagerService) {}

  ngOnInit(): void {
    this.getHour()
    this.todo = this.service.getTasks();
  }

  drop(event: CdkDragDrop<ICard[]>) {
    console.log(event.previousContainer.element.nativeElement.id);
    console.log(event.container.element.nativeElement.id);
    if (event.previousContainer === event.container) {
      console.log('move');
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
      event.container.data[0].createdAt = `${this.getFormatedDate()}  ${this.getHour()}`;
      switch (event.container.element.nativeElement.id) {
        case 'cdk-drop-list-0':
          event.container.data[0].status = 'backlog';
          event.container.data[0].createdAt = '';
          break;
        case 'cdk-drop-list-1':
          event.container.data[0].status = 'done';
          break;
        case 'cdk-drop-list-2':
          event.container.data[0].status = 'finished';
          event.container.data[0].finishedAt = `${this.getFormatedDate()}  ${this.getHour()}`;
          break;
        case 'cdk-drop-list-3':
          event.container.data[0].status = 'cancelled';
          break;
      }
      console.log(event.container.data[0])
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getFormatedDate(): string {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let formatedDate = `${day}-${(month + 1)}-${year}`
    return formatedDate
  }

  getHour() {
    let hours = new Date()
    let hour = hours.getHours()
    let minutes = hours.getMinutes()
    let formatedHour = `${hour}:${minutes}`
    return formatedHour
  }
}
