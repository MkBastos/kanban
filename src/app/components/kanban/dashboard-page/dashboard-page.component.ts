import { TaskManagerService } from 'src/app/shared/services/task.manager.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  @Input() showDash = true;

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
    }
  ];
  users!: any[];
  showGraphic = true;
  tasksGraphic = this.tasksList;
  averageGraphic = true;

  constructor(private service: TaskManagerService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers().subscribe((next) => {
      this.users = next;
    });
  }

  filterByUser(user: string) {
    this.showGraphic = false;
    let userName = user.split(' ')
    let owner = userName[0]
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
        this.tasksGraphic = this.tasksList;
        this.showGraphic = true;
    });
  }
}
