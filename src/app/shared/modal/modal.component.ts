import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICard } from '../../shared/interfaces/ICard.interface';
import { TaskManagerService } from '../services/task.manager.service';
import { createMask } from '@ngneat/input-mask';
import { dateLessThanToday } from '../validators/date-validator'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  addTaskForm!: FormGroup;
  dateMask = createMask<Date>({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
  })
  deadlineValidator = dateLessThanToday



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {task: ICard},
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private service: TaskManagerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.editTask(this.data)
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.addTaskForm = this.formBuilder.group({
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      owner: new FormControl(localStorage.getItem('user')),
      status: new FormControl('backlog'),
      create_date: new FormControl(),
      deadline: new FormControl('', [Validators.required, this.deadlineValidator()])
    });
  }

  getErrorMessage(input: any) {
    let error = input._control.ngControl.control.errors
    let obj = {invalidDate: true}
    if (error.invalidDate == obj.invalidDate) {
      return 'data inválida'
    }
    return 'campo obrigatório'
  }

  salvar() {
    let id = this.addTaskForm.get('id')?.value
    let newTask: ICard = {
      id: this.addTaskForm.get('id')?.value,
      title: this.addTaskForm.get('title')?.value,
      description: this.addTaskForm.get('description')?.value,
      owner: this.addTaskForm.get('owner')?.value,
      status: this.addTaskForm.get('status')?.value,
      deadline: `${this.addTaskForm.get('deadline')?.value} 17:00`
    }
    if (id) {
      console.log('tem id ', id)
      console.log('task ', newTask)
      this.service.updateTask(id, newTask).subscribe()
      return this.cancel()
    }
    this.service.addTask(newTask).subscribe()
    return this.cancel()
  }

  editTask(item: any) {
    let task: ICard = item
    console.log('recebido: ',item)
    if(task) {
      this.addTaskForm.patchValue({
        id: task.id,
        title: task.title,
        owner: task.owner,
        description: task.description,
        status: task.status,
        create_date: task.createdAt,
        deadline: task.deadline
      })
    }
  }
}
