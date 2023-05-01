import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/component/login-page.component';
import { RegisterAccountComponent } from './register-account/register-account/register-account.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { GraphicComponent } from './dashboard-page/graphics/graphic/graphic.component';
import { LoginGuard } from './login-page/guard/login-guard.guard';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { KanbanRoutingModule } from './kanban.routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    TaskPageComponent,
    MenuPageComponent,
    GraphicComponent,
    RegisterAccountComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    InputMaskModule,
    MatSnackBarModule
  ],
  providers: [LoginGuard],
})
export class KanbanModule {}
