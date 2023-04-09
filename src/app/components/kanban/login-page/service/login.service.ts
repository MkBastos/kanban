import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  validate(data: any) {
    let login = {
      user: 'mkbastos',
      password: '123456'
    }
    if (data.user == login.user && data.password == login.password) {
      localStorage.setItem('isAuthorized', 'true')
      this.router.navigate(['home'])
    } else {
      localStorage.setItem('isAuthorized', 'false')
      this.openSnackBar('usuário ou senha incorreta!', 'X')
    }
  }

  openSnackBar(message: string, action: any) {
    let snackBarRef = this._snackBar.open(message, action, {horizontalPosition: 'center', verticalPosition: 'top', duration: 2000})
  }
}
