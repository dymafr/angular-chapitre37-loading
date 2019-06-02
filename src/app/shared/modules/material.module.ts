import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressBarModule
} from '@angular/material';

const MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatCardModule,
  MatFormFieldModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class MaterialModule { }
