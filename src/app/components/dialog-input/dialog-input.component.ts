import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogInputData} from '../../model/dialogInputData';

@Component({
  selector: 'dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']

})
export class DialogInputComponent {

  name: string;

  constructor(public dialogRef: MatDialogRef<DialogInputComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogInputData) {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
