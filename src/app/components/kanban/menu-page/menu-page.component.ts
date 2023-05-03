import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  logedUser!: any;
  button = 'logout';
  tabLoadTimes: Date[] = [];
  showDash:boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getLogedUser()
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent, tabGroup: any): boolean {
    return this.showDash = tabGroup._allTabs.first.isActive;
  }

  getLogedUser() {
    this.logedUser = localStorage.getItem('user');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
