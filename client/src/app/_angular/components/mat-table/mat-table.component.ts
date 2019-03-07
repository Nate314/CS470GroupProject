import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

export class Table {
    props: string[];
    titles: string[];
    data: MatTableDataSource<any>;
}

@Component({
  selector: 'app-mat-table',
  templateUrl: 'mat-table.component.html',
})
export class MatTableComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() table;

    constructor() { }
    ngOnInit() {
        this.table.data.paginator = this.paginator;
        this.table.data.sort = this.sort;
    }
}
