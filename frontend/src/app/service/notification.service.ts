import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {

  private duration = 1500;

  constructor(private snackBar: MatSnackBar) {
  }

  warning(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration,
      panelClass: ['notification-warning'],
      horizontalPosition: 'center'
    });
  }

  success(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration,
      panelClass: ['notification-success'],
      horizontalPosition: 'center'
    });
  }

  error(message: string) {
    this.snackBar.open(message, null, {
      duration: this.duration,
      panelClass: ['notification-error'],
      horizontalPosition: 'center'
    });
  }
}
