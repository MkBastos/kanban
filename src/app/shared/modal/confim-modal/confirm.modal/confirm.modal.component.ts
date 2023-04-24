import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';

@Component({
  selector: 'app-confirm.modal',
  templateUrl: './confirm.modal.component.html',
  styleUrls: ['./confirm.modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {task: any}, private dialogRef: MatDialogRef<ConfirmModalComponent>, private service: TaskManagerService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close()
  }

  deleteTask() {
    this.service.deleteTask(this.data.task).subscribe(
      next => this.dialogRef.close()
    )
  }

}
