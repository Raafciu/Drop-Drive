import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {

  private duration = 1500;

  constructor(private snackBar: MatSnackBar) {
  }

  default(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration
    });
  }

  success(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration,
      panelClass: ['notification-success']
    });
  }

  error(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration,
      panelClass: ['notification-error']
    });
  }
}
