import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
    flag: string;
    name: string;
    population: string;
  }

@Component({
  selector: 'app-mat-input',
  templateUrl: 'mat-input.component.html',
})
export class MatInputComponent implements OnInit {
    formCtrl = new FormControl();
    filteredOptions: Observable<any[]>;

    @ViewChild('input') input: ElementRef;

    @Input() type: string;
    @Input() form: FormGroup;
    @Input() fcn: string;
    @Input() label: string;
    @Input() placeholder: string;
    @Input() autofocus: boolean;
    @Input() options: string[];
    @Input() filterkey: string;
    @Input() imgkey: string;
    @Input() displaykey: string;

    @Output() keyuped: EventEmitter<any> = new EventEmitter<any>();
    @Output() keydowned: EventEmitter<any> = new EventEmitter<any>();
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() blured: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.filteredOptions = this.formCtrl.valueChanges
        .pipe(
        startWith(''),
        map(option => option ? this._filterOptions(option) : this.options.slice())
        );
    }

    private _filterOptions(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option[this.filterkey].toLowerCase().indexOf(filterValue) === 0);
    }

    ngOnInit(): void {
        if (this.autofocus) {
            this.input.nativeElement.focus();
        }
    }

    event(emitter: EventEmitter<any>, event) {
        emitter.emit(event);
    }

    optionChosen(option) {
        console.log(option);
        this.form.controls[this.fcn].setValue(option[this.displaykey]);
        this.input.nativeElement.value = option[this.displaykey];
        this.event(this.clicked, option);
    }
}
