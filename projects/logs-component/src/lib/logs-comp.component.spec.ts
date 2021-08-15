import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsComponent } from './logs-comp.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableModule
} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { TranslateModule } from '@ngx-translate/core';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { PrettyXMLPipe } from './pipes/xml.pipe';
import { LogsBodyComponent } from './logsBody/logs-body/logs-body.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as moment from 'moment';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;
  let snackBar: MatSnackBar;
  let datePicker: MatDatepicker<any>;
  let mockFilterDetails;
  let mockSearchDetails;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogsComponent, EllipsisPipe,
        PrettyXMLPipe,
        LogsBodyComponent],
      imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        AmazingTimePickerModule,
        TranslateModule,
        MatToolbarModule,
        MatNativeDateModule,
        HttpClientModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatDatepicker, ViewContainerRef]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    snackBar = TestBed.get(MatSnackBar);
    datePicker = TestBed.get(MatDatepicker);
    mockFilterDetails = {
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      status: '',
      description: ''
    };
    mockSearchDetails = {
      description: null,
      end_date: '2020-09-05T00:09:00+02:00',
      start_date: '2020-09-04T00:09:00+02:00',
      status: null
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should make expected calls', () => {
    const spy1 = spyOn(component, 'setForm');
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
  });

  it('setForm should build the form', () => {
    component.setForm();
    expect(component.LogsFormFilter.value).toEqual(mockFilterDetails);
  });

  describe('search', () => {
    it('search with search form', () => {
      component.search(mockSearchDetails);
      expect(component.filter).toEqual(mockSearchDetails);
    });
  });

  describe('getDateTime', () => {
    it('chnage date time formate', () => {
      const date = 'Fri Sep 04 2020 00:00:00 GMT+0200 (Eastern European Standard Time)';
      const time = '2:00';
      const dateTime = component.getDateTime(moment(date), time);
      expect(dateTime).toEqual('2020-09-04T02:11:00+02:00');
    });
  });
});
