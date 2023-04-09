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
  todo: ICard[] = []
  done: ICard[] = [];
  finished: ICard[] = [];
  cancelled: ICard[] = [];

  panelOpenState = false;

  constructor(public dialog: MatDialog, private service: TaskManagerService) {}

  ngOnInit(): void {
    this.todo = this.service.getTasks()
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
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
