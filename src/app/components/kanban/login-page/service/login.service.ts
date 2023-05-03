import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskManagerService } from 'src/app/shared/services/task.manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: TaskManagerService) { }

  validate(data: any) {
    let login = {user: '', password: ''}
    this.service.getUserById(data.user).subscribe(
      next => {
        login.user = next[0].user
        login.password = next[0].password
        if (data.user == login.user && data.password == login.password) {
          localStorage.setItem('isAuthorized', 'true')
          localStorage.setItem('user', login.user)
          this.router.navigate(['home'])
        } else {
          localStorage.setItem('isAuthorized', 'false')
          this.openSnackBar('usuário ou senha incorreta!', 'x')
        }
      }
    )
  }

  openSnackBar(message: string, action: any) {
    let snackBarRef = this._snackBar.open(message, action, {horizontalPosition: 'center', verticalPosition: 'top', duration: 2000})
  }
}
