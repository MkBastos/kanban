import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  nome = 'Miqueias';
  button = 'logout';
  tabLoadTimes: Date[] = [];
  showDash = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  tabChanged(tabChangeEvent: MatTabChangeEvent, tabGroup: any): boolean {
    return this.showDash = tabGroup._allTabs.first.isActive;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
