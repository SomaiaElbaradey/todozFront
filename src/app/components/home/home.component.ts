import { Component, OnInit } from '@angular/core';
import { TodoGroupService } from 'src/app/services/todo-group.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../registration/registration.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private TodoGroupService: TodoGroupService,
    private TodoService: TodoService
  ) { }
  edit: string = '/assets/icons/edit.png';
  tasks = [];
  count;
  lastMos = [];
  groups = [];

  allTasks() {
    this.TodoService.allTasks().subscribe(
      (res) => {
        console.log(res);
        this.tasks = res;
        this.count = this.tasks.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTasks() {
    this.allTasks();
  }

  ngOnInit(): void {
    //get all tasks
    this.allTasks();
    //all tasks for prev month
    this.TodoGroupService.lastMonTasks().subscribe(
      (res) => {
        console.log(res);
        this.lastMos = res;
      },
      (err) => {
        console.log(err);
      }
    );
    //get all groups
    this.TodoGroupService.allGroups().subscribe(
      (res) => {
        console.log(res);
        this.groups = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPosts(e) {
    this.TodoGroupService.allTasks(e).subscribe((response) => {
      console.log(response)
      this.tasks = response;
    });

  }

}
