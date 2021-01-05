import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit():void{
    this.taskService.getLists()
    .subscribe((list)=> this.lists=list as any);

    this.route.params.subscribe((params: Params) => {
      const listId = params.listId;
      if (!listId) return;
      this.taskService.getTasks(listId).subscribe((task) => {
        this.tasks = task as any
      
      
    console.log("Tasks");  
      console.log(this.tasks)
      console.log("Tasks");  


    }); 
    });
  }
}