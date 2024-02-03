import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const NotifyType = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
};

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private snackBar: MatSnackBar) {}

  //#region  TOAST
  showToast(message = '', type = '', duration = 3000) {
    switch (type) {
      case NotifyType.Success:
        this.snackBar.open(message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: duration,
          panelClass: NotifyType.Success,
        });
        break;
      case NotifyType.Error:
        this.snackBar.open(message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: duration,
          panelClass: NotifyType.Error,
        });
        break;
      case NotifyType.Warning:
        this.snackBar.open(message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: duration,
          panelClass: NotifyType.Warning,
        });
        break;
      case NotifyType.Info:
        this.snackBar.open(message, '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: duration,
          panelClass: NotifyType.Info,
        });
        break;
      default:
        break;
    }
  }
  //#endregion TOAST
}
