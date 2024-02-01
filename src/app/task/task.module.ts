import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: ':id',
    component: TaskItemComponent,
  },
];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class TaskModule { }
