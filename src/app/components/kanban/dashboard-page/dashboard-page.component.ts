import { TaskManagerService } from 'src/app/shared/services/task.manager.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnChanges {

  @Input() showDash!: boolean;

  tasksList = [
    {
      title: 'backlog',
      task: [],
    },
    {
      title: 'execution',
      task: [],
    },
    {
      title: 'finished',
      task: [],
    },
  ];
  users!: any[];
  showGraphic = true;
  tasksGraphic = this.tasksList;
  averageGraphic = true;

  constructor(private service: TaskManagerService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.showDash) {
      this.tasksList = [
        {
          title: 'backlog',
          task: [],
        },
        {
          title: 'execution',
          task: [],
        },
        {
          title: 'finished',
          task: [],
        },
      ];
      this.tasksGraphic = this.tasksList
      this.showGraphic = false;

        setTimeout(() => {
          this.showGraphic = true
        }, 100)
      }

  }

  getUsers() {
    this.service.getUsers().subscribe((next) => {
      this.users = next;
    });
  }

  filterByUser(user: string) {
    this.showGraphic = false;
    let owner = this.users.filter((res: { name: string }) => res.name == user);
    owner = owner[0].user;
    this.service.getTasksByUser(owner).subscribe((next) => {
      this.tasksList = [
        {
          title: 'backlog',
          task: next.filter(
            (task: { status: string }) => task.status == 'backlog'
          ),
        },
      ];
      this.tasksList.push({
        title: 'execution',
        task: next.filter(
          (task: { status: string }) => task.status == 'in execution'
        ),
      }),
        this.tasksList.push({
          title: 'finished',
          task: next.filter(
            (task: { status: string }) => task.status == 'finished'
          ),
        }),
        (this.tasksGraphic = this.tasksList);
      this.showGraphic = true;
    });
  }
}
