import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, NgZone } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import * as moment_ from 'moment-timezone';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { LogsBodyComponent } from './logsBody/logs-body/logs-body.component';
import { FormConfig } from './models/field-config.model';
import { FormService } from './services/form.service';
import { SelectionModel } from '@angular/cdk/collections';
import { LogRecord } from './models/log-record.model';
import { ConfirmValidParentMatcher } from './validators/custom-validators';

const moment = moment_;

export const MY_FORMATS = {
  parse: { dateInput: 'DD-MM-YYYY' },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-logs',
  templateUrl: './logs-comp.component.html',
  styleUrls: ['./logs-comp.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class LogsComponent implements OnChanges, AfterViewInit {
  formSubscription: any;
  channelName!: string;
  LogsFormFilter!: FormGroup;
  todayDate = moment(new Date());
  filter: { [key: string]: any } = {};
  dataTable = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);
  index!: number;

  @Input()
  instanceTimeZone!: string;
  @Input()
  instanceDateTimeFormat!: { date: string | undefined; };
  @Input()
  isLoadingResults!: boolean;
  @Input()
  dataSource$!: { subscribe: (arg0: (res: any) => void) => void; };
  @Input() resultsLength: any;
  @Input()
  page!: { num: number; length: number; };
  @Input()
  formConfig!: FormConfig;
  @Input()
  displayedColumns!: string[];
  @Output() searchFilter = new EventEmitter<any>();
  @Output() actionApplied = new EventEmitter<any>();

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private dialog: MatDialog,
    private formService: FormService,
    private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formConfig && changes.formConfig.firstChange) {
      this.setForm();
      if (changes.instanceDateTimeFormat && changes.instanceDateTimeFormat.firstChange) {
        // @ts-ignore
        MY_FORMATS.display.dateInput = this.instanceDateTimeFormat?.date;
        // @ts-ignore
        MY_FORMATS.parse.dateInput = this.instanceDateTimeFormat?.date;
        this.todayDate.format(this.instanceDateTimeFormat.date);
        this.setInitialDateValues();
      }
      if (changes.instanceTimeZone && changes.instanceTimeZone.firstChange) {
        this.search(this.LogsFormFilter.value);
      }
    }

    if (this.page) {
      const list = document.getElementsByClassName('mat-paginator-range-label');
      list[0].innerHTML = `${(this.page.num * 20) + 1} - ${(this.page.num * 20) + this.page.length}`;
    }
    this.dataSource$.subscribe((res: { data: [], index: 0 }) => {
      this.dataTable.data = res.data;
      this.index = res.index;
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataTable.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataTable.data.forEach(row => this.selection.select(row));
  }


  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  setInitialDateValues(): void {
    const dates = Object.keys(this.LogsFormFilter.controls).filter(key => key.includes('date'));
    dates.forEach(dateField => {
      this.LogsFormFilter?.get(dateField)?.patchValue(this.todayDate);
    });
  }

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  ApplyAction(): void {
    this.actionApplied.emit({
      rows: this.selection.selected
    });
  }


  setPaginator(): void {
    this.paginator.page.subscribe((page: { pageIndex: any; }) => {
      if (this.filter) {
        // output (searchParams)
        this.searchFilter.emit({
          index: page.pageIndex,
          filter: this.filter
        });
      } else {
        // output(searchParams)
        this.searchFilter.emit({
          index: page.pageIndex,
        });
      }
    });
  }

  openDialog(data: any): void {
    const dialogConfig = {
      data: '',
      type: ''
    };
    if (this.isJson(data)) {
      dialogConfig.data = JSON.parse(data);
      dialogConfig.type = 'json';
    } else {
      dialogConfig.data = data;
      dialogConfig.type = 'xml';
    }
    this.zone.run(() => {
      this.dialog.open(LogsBodyComponent, {
        data: dialogConfig,
        width: '80vw',
        height: '80vh'
      });
    });
  }

  isJson(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  countSuccessfullLogs(): number {
    // @ts-ignore
    return this.dataTable.data.filter((v: LogRecord) => v.response && v.response.status_code === 200).length;
  }

  countFailedLogs(): number {
    // @ts-ignore
    return this.dataTable.data.filter((v: LogRecord) => v.response && v.response.status_code !== 200).length;
  }


  refresh(): void {
    this.setForm();
    Object.keys(this.filter).forEach(key => {
      this.filter[key] = null;
    });
    Object.values(this.LogsFormFilter.controls).forEach(control => {
      control.patchValue(null);
    });
    // output (refreshed)
    this.searchFilter.emit({
      filter: this.filter
    });
  }


  setForm(): void {
    this.LogsFormFilter = this.formService.toFormGroup(this.formConfig);
    this.todayDate = moment(new Date());
  }


  search(val: any): void {
    if (this.LogsFormFilter.valid) {
      this.setFilterValues(val);
      if (this.formConfig.custom_configurations) {
        this.applyCustoms(val);
      }
      // output(searchFileds)
      this.searchFilter.emit({
        index: 0,
        filter: this.filter
      });
    } else {
      this.getFieldErrors();
    }
  }


  getFieldErrors(): void {
    Object.keys(this.LogsFormFilter.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.LogsFormFilter?.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(() => {
          this.LogsFormFilter.get(key)?.markAsTouched();
        });
      }
    });
  }

  applyCustoms(formValue: { [x: string]: string; }): void {
    this.formConfig.custom_configurations?.forEach(config => {
      if (config === 'getDateTime') {
        /**
         * get fields with type date and time then sort them
         *  in dateTimeFields with date fields first
         */
        const dateTimeFields = this.formConfig.fields.filter(field => field.type === 'date' || field.type === 'time').
          sort((a, b) => (a.type > b.type) ? 1 : -1);
        for (let i = 0; i < dateTimeFields.length / 2; i++) {
          this.filter = {
            ...this.filter,
            [dateTimeFields[i].name]: this.getDateTime(formValue[dateTimeFields[i].name],
              formValue[dateTimeFields[i + 2].name], dateTimeFields[i].name)
          };
          delete this.filter[dateTimeFields[i + 2].name];
        }
      }
    });
  }


  setFilterValues(val: { [x: string]: any; }): void {
    Object.keys(val).forEach(key => {
      this.filter = {
        ...this.filter,
        [key]: val[key] !== null ? val[key] : null
      };
    });
  }

  getDateTime(date: moment.MomentInput, time: string, type?: string): string {
    const currentDate = moment(new Date()).format();
    // remove double quotes from instanceTimeZone varibale comes from cookies
    this.instanceTimeZone = this.instanceTimeZone.replace(/^"(.*)"$/, '$1');
    let DateTime;
    if (time !== null && moment(date).isValid()) {
      // both are valid
      const stringDateWithTime = `${moment(date).format('YYYY-MM-DD')} ${time}`;
      DateTime = moment.tz(stringDateWithTime, this.instanceTimeZone).format();
    } else if (time !== null && !moment(date).isValid()) {
      // here time is valid
      const currentDateWithTime = `${moment(currentDate).format('YYYY-MM-DD')} ${time}`;
      if (type) {
        this.LogsFormFilter.patchValue({
          [type]: moment(new Date())
        });
      }
      DateTime = moment.tz(currentDateWithTime, this.instanceTimeZone).format();
    } else if (time === null && moment(date).isValid()) {
      // date is valid
      let stringDate = `${moment(date).format('YYYY-MM-DD')}`;
      if (type?.includes('start')) {
        stringDate = stringDate + ' 00:00';
      } else {
        stringDate = stringDate + ' 23:59';
      }
      DateTime = moment.tz(stringDate, this.instanceTimeZone).format();
    } else {
      // both are invalid
      DateTime = null;
    }
    // @ts-ignore
    return DateTime;
  }
}
