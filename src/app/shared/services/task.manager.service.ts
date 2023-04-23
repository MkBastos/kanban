import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly URL = 'http://localhost:3000';
  todo: ICard[] = [];
  execution: ICard[] = [];
  finished: ICard[] = [];
  cancelled: ICard[] = [];

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${this.URL}/tasks`);
  }

  getTasksByUser(user: string): Observable<any> {
    return this.http.get(`${this.URL}/tasks?owner=${user}`);
  }

  addTask(body: ICard) {
    return this.http.post(`${this.URL}/tasks`, body);
  }

  updateTask(id: any, body: any) {
    console.log(body)
    return this.http.patch(`${this.URL}/tasks/${id}`, body);
  }

  removeTask(item: any) {
    console.log(item);
  }
}
