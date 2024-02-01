import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskComponent } from './services/task/task.component';
import { LocalStorageComponent } from './services/local-storage/local-storage.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    TaskComponent,
    LocalStorageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TaskModule { }
