import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule
  ],
  exports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule
  ]
})
export class MaterialModule {}
