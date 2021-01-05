import { Injectable } from '@angular/core';
import Task from './models/task';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebService: WebService) { }

  getLists(){
    return this.WebService.get('lists');
  }

  createLists(title: string){
    return this.WebService.post('lists', { title });
  }

  getTasks(listId: string){
    return this.WebService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string){
    return this.WebService.post(`lists/${listId}/tasks`, { title });
  }

  deleteList(listId: string) {
    return this.WebService.delete(`lists/${listId}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.WebService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  setComplete(listId: string, task: Task) {
    return this.WebService.patch(`lists/${listId}/tasks/${task._id}`, { completed: !task.completed })
  }

}