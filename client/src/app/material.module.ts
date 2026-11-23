import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule,MatListModule
  ],
  exports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule,MatListModule
  ]
})
export class MaterialModule {}
