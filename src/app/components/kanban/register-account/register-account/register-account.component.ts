import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: TaskManagerService) { }

  addUserForm! : FormGroup;

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      user: new FormControl(''),
      password: new FormControl('', [Validators.required])
    })
  }

  submit() {
    console.log(this.addUserForm.value)
  }
}
