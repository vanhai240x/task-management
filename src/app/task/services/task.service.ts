import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static readonly taskStorageKey = 'taskList';

  constructor(private localStorageService: LocalStorageService) { }
  
  getTaskList() {
    return this.localStorageService.getValue(TaskService.taskStorageKey);
  }
}
