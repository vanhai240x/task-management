export interface Task {
  id: number;
  taskTitle: string;
  taskDetail: string;
  taskStatus: string;
  taskProgress: number;
}

export enum TaskStatus {
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}

export enum TaskStatusName {
  New = 'New',
  InProgress = 'In Progress',
  Done = 'Done',
}

export enum PageStatus {
  Create = 'create',
  Update = 'update',
}

export enum Filter {
  All = 'all',
  New = 'new',
  InProgress = 'inProgress',
  Done = 'done',
}
