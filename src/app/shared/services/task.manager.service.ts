import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  todo: ICard[] = [
    {
      title: 'nome da tarefa 1',
      description: 'descrição do que deve ser feito nessa tarefa',
      owner: 'Miqueias Bastos',
    },
    {
      title: 'nome da tarefa 2',
      description: 'descrição do que deve ser feito nessa tarefa 2',
      owner: 'Miqueias Bastos',
    },
    {
      title: 'nome da tarefa 3',
      description: 'descrição do que deve ser feito nessa tarefa',
      owner: 'Miqueias Bastos',
    },
    {
      title: 'nome da tarefa 4',
      description: 'descrição do que deve ser feito nessa tarefa',
      owner: 'Miqueias Bastos',
    },
  ];
  done: ICard[] = []
  finished: ICard[] = []
  cancelled: ICard[] = []

  constructor() { }

  getTasks() {
    return this.todo
  }

  addTask(body: ICard) {
    this.todo.push(body)
    console.log(this.todo)
  }

  removeTask(item: any) {
    console.log(item)
  }
}
