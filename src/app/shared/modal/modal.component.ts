import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private service: TaskManagerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createForm() {
    let user = localStorage.getItem('user')
    this.addTaskForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      owner: new FormControl(user),
      status: new FormControl(),
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
    let newTask: ICard = {
      title: this.addTaskForm.get('title')?.value,
      description: this.addTaskForm.get('description')?.value,
      owner: this.addTaskForm.get('owner')?.value,
      status: 'backlog',
      deadline: this.addTaskForm.get('deadline')?.value
    }
    this.service.addTask(newTask).subscribe()
    this.cancel()
  }
}
