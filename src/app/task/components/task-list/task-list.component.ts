import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotifyType, ShareService } from '../../services/share.service';
import { Filter, Task, TaskStatus, TaskStatusName } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteConfirmComponent } from '../dialog-delete-confirm/dialog-delete-confirm.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  Filter = Filter;
  taskList: Task[] = [];
  filteredTaskList: Task[] = [];
  statusMapping = {
    [TaskStatus.New]: TaskStatusName.New,
    [TaskStatus.InProgress]: TaskStatusName.InProgress,
    [TaskStatus.Done]: TaskStatusName.Done,
  }

  constructor(
    private taskService: TaskService,
    private shareService: ShareService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.taskList = this.taskService.getTaskList();
    this.filteredTaskList = this.taskList.map(x => x);  // Clone deep
  }

  filterChange($event: MatButtonToggleChange) {
    if ($event.value === Filter.All) {
      this.filteredTaskList = this.taskList.map(x => x);
    } else {
      this.filteredTaskList = this.taskList.filter(x => x.taskStatus === $event.value);
    }
  }

  markDone(item: Task) {
    item.taskProgress = 100;
    item.taskStatus = TaskStatus.Done;
    this.localStorageService.setValue(TaskService.taskStorageKey, this.taskList);
    this.shareService.showToast(
      `Task ${item.taskTitle} has been completed`,
      NotifyType.Success
    );
  }

  deleteTask(item: Task, i: number) {
    const dialogRef = this.dialog.open(DialogDeleteConfirmComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.filteredTaskList.splice(i, 1);
        this.taskList.splice(i, 1);
        this.localStorageService.setValue(TaskService.taskStorageKey, this.taskList);
        this.shareService.showToast(
          `Task ${item.taskTitle} has been deleted`,
          NotifyType.Success
        );
      }
    });
  }

}
