import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  nome = 'Miqueias'
  button = 'logout'

  constructor(private router: Router) { }

  ngOnInit(): void {}

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
