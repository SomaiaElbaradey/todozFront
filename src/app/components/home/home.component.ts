import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoGroupService } from 'src/app/services/todo-group.service';
import { TodoService } from 'src/app/services/todo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../registration/registration.component.css']
})

export class HomeComponent implements OnInit, OnChanges {

  constructor(
    private TodoGroupService: TodoGroupService,
    private TodoService: TodoService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  edit: string = '/assets/icons/edit.png';
  delete: string = '/assets/icons/dele.png';
  tasks = [];
  count;
  lastMos = [];
  groups = [];
  addGroupFlag = 0;
  filter = "Recent";
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

  allTasks() {
    this.TodoService.allTasks().subscribe(
      (res) => {
        this.tasks = res;
        this.count = this.tasks.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTasks() {
    this.id = null;
    this.allTasks();
  }

  ngOnInit(): void {
    console.clear();
    this.filter = "Recent";
    //get all tasks
    this.allTasks();
    this.err = null;
    //all tasks for prev month
    this.TodoGroupService.lastMonTasks().subscribe(
      (res) => this.lastMos = res,
      (err) => {
        console.log(err);
      }
    );
    //get all groups
    this.TodoGroupService.allGroups().subscribe(
      (res) => {
        this.groups = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //to get posts for speciific group
  getPosts(e) {
    this.TodoGroupService.allTasks(e).subscribe((response) => {
      this.tasks = response;
    });
  }

  //delete one group
  deleteGroup(e) {
    if (confirm(`Are you sure you want to delete the selected group?`)) {
      this.TodoGroupService.deleteGroup(e).subscribe(
        Response => {
          this.ngOnInit();
        }),
        err => {
          console.log(err);
        }
    }
  }

  //delete task
  deleteTask(e) {
    if (confirm(`Are you sure you want to delete the selected task?`)) {
      this.TodoService.deleteTask(e).subscribe(
        () => this.ngOnInit()),
        err => {
          console.log(err);
        }
    }
  }

  //allow add new group
  newGroup() {
    this.addGroupFlag = 1;
  }
  validGroup = true;
  //group validation
  groupForm = new FormGroup({
    groupTitle: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3)
    ]),
  })

  //create new group
  addGroup(e) {
    if (this.groupForm.valid) {
      this.addGroupFlag = 0;
      this.TodoGroupService.addGroup(e.value).subscribe(),
        err => console.log(err)
      this.ngOnInit();
    }
    this.validGroup = false;
  }

  groupChange: boolean = false;
  closeResult: string;

  //open the edit group modal
  editGroup(group) {
    this.validGroup = true;
    this.modalService.open(group, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  id: string;
  title: string;
  getId(group) {
    this.updatedGroup = false;
    this.id = group._id;
    this.title = group.groupTitle;
  }
  //update the group via http req
  updatedGroup: boolean = false;
  updateGroup(value) {
    if (this.groupForm.valid) {
      this.TodoGroupService.updateGroup(value, this.id).subscribe(
        res => {
          this.updatedGroup = true;
          this.ngOnInit();
        },
        err => console.log(err)
      )
    }
    this.validGroup = false;
  }

  //edit for recent todoz section
  editMonth(month) {
    this.modalService.open(month, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateMonth(e) {
    const month = e.month.value;
    const date = e.date.value;
    const status = e.status.value;
    if (month) {
      this.TodoGroupService.specificMonthTasks(month).subscribe(
        res => {
          this.lastMos = res;
          this.filter = this.months[month - 1]
        },
        err => console.log(err)
      )
    }

    else if (date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      this.TodoGroupService.specificDateTasks(year, month, day).subscribe(
        res => {
          this.lastMos = res;
          this.filter = `${day} ${this.months[month - 1]}`
        },
        err => console.log(err)
      )
    }

    else if (status) {
      this.TodoGroupService.specificStatus(status).subscribe(
        res => {
          this.lastMos = res;
          this.filter = `${status}`
        },
        err => console.log(err)
      )
    }
  }

  //task validation
  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3)
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
  })

  //add new task
  validTask: boolean = true;
  addTodo(task) {
    this.err = null;
    this.modalService.open(task, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  err = null;
  addTask(e) {
    if (this.taskForm.valid) {
      this.validTask = true;
      this.err = null;
      let title = e.title.value;
      let body = e.body.value;
      let status = "to-do";
      if (e.status.value != '') status = e.status.value;
      console.log(status)
      let tags = [];
      if (e.tags.value) {
        tags = e.tags.value.split(" ");
      }
      this.TodoService.addTodo(title, body, status, tags, this.id).subscribe(
        res => {
          this.ngOnInit();
          this.err = false
        },
        err => this.err = err.error
      )
    }
    this.validTask = false;
  }

  //update existing task
  //update validator
  taskUpdateForm = new FormGroup({
    title: new FormControl('', [
      Validators.maxLength(20),
      Validators.minLength(3)
    ]),
    body: new FormControl('', [
      Validators.minLength(10)
    ]),
  })
  //get to do task to be updated
  task = null;
  todoId(task) {
    this.task = task;
  }
  //open the form 
  openEditTodo(task) {
    this.err = null;
    this.modalService.open(task, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateTask(e) {
    this.err = null;
    let title = e.title.value || this.task.title;
    let body = e.body.value || this.task.body;
    let status = this.task.status;
    if (e.status.value != '') status = e.status.value;
    let tags = this.task.tags;
    if (e.tags.value) {
      tags = tags.concat(e.tags.value.split(" "));
    }
    this.TodoService.updateTodo(title, body, status, tags, this.task._id).subscribe(
      res => {
        this.ngOnInit();
        this.err = false
      },
      err => this.err = err.error
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}