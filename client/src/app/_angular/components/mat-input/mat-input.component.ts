import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup } from '@angular/forms';

export class Table {
    props: string[];
    titles: string[];
    data: MatTableDataSource<any>;
}

@Component({
  selector: 'app-mat-input',
  templateUrl: 'mat-input.component.html',
})
export class MatInputComponent implements OnInit {

    @ViewChild('input') input: ElementRef;

    @Input() type: string;
    @Input() form: FormGroup;
    @Input() fcn: string;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() autofocus: boolean;

    @Output() keyuped: EventEmitter<any> = new EventEmitter<any>();
    @Output() keydowned: EventEmitter<any> = new EventEmitter<any>();
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }
    ngOnInit() {
        if (this.autofocus) {
            this.input.nativeElement.focus();
        }
    }

    event(emitter: EventEmitter<any>, event) {
        emitter.emit(event);
    }
}
