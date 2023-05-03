import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmModalComponent } from './modal/confim-modal/confirm.modal/confirm.modal.component';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [ModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    InputMaskModule
  ],
  providers: []
})
export class SharedModule {}

export { ModalComponent };
