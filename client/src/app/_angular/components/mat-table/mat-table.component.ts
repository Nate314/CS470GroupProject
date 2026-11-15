import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export class Table {
    props: string[];
    titles: string[];
    data: MatTableDataSource<any>;
}

@Component({
  standalone: false,
  selector: 'app-mat-table',
  templateUrl: 'mat-table.component.html',
})
export class MatTableComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @Input() table;

    constructor() { }
    ngOnInit() {
        this.table.data.paginator = this.paginator;
        this.table.data.sort = this.sort;
    }

    getImage(str: string) {
        return `${str},`.split(',')[0];
    }

    getExtraAfterImage(str: string) {
        if (str.split(',').length > 0) {
            return str.split(',')[1];
        } else {
            return '';
        }
    }
}
