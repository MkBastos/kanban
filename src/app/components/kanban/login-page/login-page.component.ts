import { Component, HostListener, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  @HostListener('window:keydown.enter', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.loginForm.valid) {
      this.login()
    }
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    let data = {
      user: this.loginForm.get('user')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loginForm.reset();
    this.service.validate(data);
  }
}
