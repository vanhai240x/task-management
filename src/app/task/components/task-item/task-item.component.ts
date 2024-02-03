import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PageStatus, TaskStatus, TaskStatusName } from "../../models/task";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "../../services/local-storage.service";
import { NotifyType, ShareService } from "../../services/share.service";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  formGroup = this.fb.group({
    id: new Date().getTime(),
    taskTitle: [<string>(null), Validators.required],
    taskDetail: [<string>(null)],
    taskStatus: [TaskStatus.New, Validators.required],
    taskProgress: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern("^[0-9]*$"),
      ],
    ],
  });
  taskStatus = [
    { id: TaskStatus.New, name: TaskStatusName.New },
    { id: TaskStatus.InProgress, name: TaskStatusName.InProgress },
    { id: TaskStatus.Done, name: TaskStatusName.Done },
  ];
  taskId: number = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("id") !== PageStatus.Create) {
      this.taskId = +this.route.snapshot.paramMap.get("id");
      let taskList = this.localStorageService.getValue(
        TaskService.taskStorageKey
      );
      let taskDetail = taskList.find((x) => x.id === this.taskId);
      this.formGroup.patchValue(taskDetail);
    }
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.shareService.showToast(
        "Information is missing or invalid. Please check again!",
        NotifyType.Error
      );
    } else {
      const taskItem = this.formGroup.value;
      let taskList =
        this.localStorageService.getValue(TaskService.taskStorageKey) || [];
      if (this.taskId) {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].id === this.taskId) {
            taskList[i] = taskItem;
          }
        }
        this.localStorageService.setValue(TaskService.taskStorageKey, taskList);
        this.shareService.showToast(
          "Update task successfully!",
          NotifyType.Success
        );
        this.router.navigateByUrl("/");
      } else {
        this.shareService.showToast(
          "Create task successfully!",
          NotifyType.Success
        );
        this.formGroup.patchValue({
          id: new Date().getTime(),
          taskTitle: '',
          taskDetail: null,
          taskStatus: TaskStatus.New,
          taskProgress: 0,
        });
        this.formGroup.markAsUntouched();
        this.localStorageService.setValue(TaskService.taskStorageKey, [
          ...taskList,
          taskItem,
        ]);
      }
    }
  }
}
