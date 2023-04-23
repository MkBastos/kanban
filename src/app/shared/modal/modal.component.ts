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

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  addTaskForm!: FormGroup;

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
    this.addTaskForm = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      owner: new FormControl(),
      status: new FormControl(),
      create_date: new FormControl(),
    });
  }

  salvar() {
    let newTask: ICard = {
      title: this.addTaskForm.get('title')?.value,
      description: this.addTaskForm.get('description')?.value,
      owner: this.addTaskForm.get('owner')?.value,
      status: 'backlog'
    }
    this.service.addTask(newTask).subscribe()
    this.cancel()
  }
}
