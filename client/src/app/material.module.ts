import { NgModule } from '@angular/core';


import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
  MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule
  ],
  exports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule
  ]
})
export class MaterialModule {}
