import { GraphicComponent } from './dashboard-page/graphics/graphic/graphic.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { LoginGuard } from './login-page/guard/login-guard.guard';

const kanbanRoutes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'home',
    component: MenuPageComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'task',
        component: TaskPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(kanbanRoutes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
