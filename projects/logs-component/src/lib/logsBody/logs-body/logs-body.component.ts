import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'lib-logs-body',
  templateUrl: './logs-body.component.html',
  styleUrls: ['./logs-body.component.css']
})
export class LogsBodyComponent implements OnInit {
  content;
  constructor(
    public dialogRef: MatDialogRef<LogsBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.content = data;
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    const elm = document.getElementById('textarea') as HTMLTextAreaElement;
    elm.focus();
  }

  // tslint:disable-next-line: typedef
  copy() {
    const elm = document.getElementById('textarea') as HTMLTextAreaElement;
    elm.focus();
    elm.select();
    document.execCommand('copy');
    elm.blur();
    this.dialogRef.close();
  }

}

