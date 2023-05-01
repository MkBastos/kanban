import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';
import { userExistsValidator } from '../../../../shared/validators/user-validator'
import { validatePassword } from 'src/app/shared/validators/validated-password';
import { createMask } from '@ngneat/input-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: TaskManagerService, private snackbar: MatSnackBar, private route: Router) { }

  addUserForm! : FormGroup;
  password!: any;
  userValidator = userExistsValidator;
  passValidator = validatePassword;

  dateMask = createMask<Date>({
    alias: 'datetime',
    inputFormat: 'dd/mm/yyyy',
  })

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      user: ['', {Validators: [Validators.required], asyncValidators: [this.userValidator(this.service)]}],
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.passValidator()])
    })
  }

  getPassword() {
    if (this.addUserForm.get('password')?.value) {
      this.password = this.addUserForm.get('password')?.valueChanges.subscribe(
        next => console.log(next)
      )
    }
  }

  submit() {
    console.log(this.addUserForm.value)
    this.service.addNewUser(this.addUserForm.value).subscribe(
      next => {
        console.log(next)
        this.openSnackBar('conta criada com sucesso', 'x')
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {horizontalPosition: 'center', verticalPosition: 'top', duration: 2000})
    this.route.navigate(['login'])
  }

}
