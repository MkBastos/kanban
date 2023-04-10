import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  tasksList = [
    {
      title: 'todo',
      task: [{ tarefa: '1' }, { tarefa: '2' }, { tarefa: '3' }],
    },
    { title: 'done', task: [{ tarefa: '1' }, { tarefa: '2' }] },
    {
      title: 'finished',
      task: [
        { tarefa: '1' },
        { tarefa: '2' },
        { tarefa: '3' },
        { tarefa: '4' },
      ],
    },
    { title: 'cancelled', task: [{ tarefa: '1' }] },
  ];

  users = ['todos', 'teste 1', 'teste 2', 'teste 3'];

  infoGraphic = this.tasksList;

  constructor() {}

  ngOnInit(): void {}
}
