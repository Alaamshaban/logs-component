import { Injector, NgModule } from '@angular/core';
import {  LogsComponent } from './logs-comp.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { PrettyXMLPipe } from './pipes/xml.pipe';
import { MomentDateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableModule
} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LogsBodyComponent } from './logsBody/logs-body/logs-body.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LogsComponent,
    EllipsisPipe,
    PrettyXMLPipe,
    MomentDateTimeFormatPipe,
    LogsBodyComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    AmazingTimePickerModule,
    MatToolbarModule,
    MatToolbarModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule
  ],
  entryComponents: [LogsBodyComponent, EllipsisPipe, PrettyXMLPipe, MomentDateTimeFormatPipe]
})
export class LogsModule {
}
