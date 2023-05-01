import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(`${this.URL}/users`);
  }

  public getUserById(user: string): Observable<any> {
    return this.http.get(`${this.URL}/users?user=${user}`)
  }
  public addNewUser(body: any) {
    console.log(`${this.URL}/users`)
    return this.http.post(`${this.URL}/users`, body)
  }

  public getTasks() {
    return this.http.get(`${this.URL}/tasks`);
  }

  public getTasksByUser(user: string): Observable<any> {
    return this.http.get(`${this.URL}/tasks?owner=${user}`);
  }

  public addTask(body: ICard) {
    return this.http.post(`${this.URL}/tasks`, body);
  }

  public updateTask(id: any, body: any) {
    return this.http.patch(`${this.URL}/tasks/${id}`, body);
  }

  public deleteTask(item: any) {
    return this.http.delete(`${this.URL}/tasks/${item.id}`)
  }
}
