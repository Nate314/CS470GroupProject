import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
  MatExpansionModule,

} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule
  ],
  exports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule
  ]
})
export class MaterialModule {}
