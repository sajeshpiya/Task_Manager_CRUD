import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ɵConsole } from '@angular/core';
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
  listId:string="";
  

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) {  
    this.route.params.subscribe((params: Params) => {
    this.listId = params.listId;
 });
}

  ngOnInit():void{
   
    this.taskService.getLists()
    .subscribe((list)=> this.lists = list as any);

    this.route.params.subscribe((params: Params) => {
      const listId = params.listId;
      if (!listId) return;
      this.taskService.getTasks(listId).subscribe((task) => this.tasks = task as any); 
    });
  }
  onTaskClick( task: Task) {

    this.taskService.setCompleted(this.listId, task)
    .subscribe(() => task.completed = !task.completed);
    }

    deleteTask( task: Task) {
      console.log("Deleting Task");
      console.log(this.listId)

      this.taskService.deleteTask(this.listId, task._id)
      .subscribe(() => this.tasks = this.tasks.filter(t => t._id != task._id));
    }

    deleteList( list: List) {

      this.taskService.deleteList(list._id)
        .subscribe(() => this.lists = this.lists.filter(l => l._id != list._id));

    }

    addTaskClick() {
      if (!this.listId){
       alert("Please select a list to add tasks to");
        return;  
      }
        this.router.navigate(['./new-task'], { relativeTo: this.route });
      }

  }
