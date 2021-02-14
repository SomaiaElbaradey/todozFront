import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoGroupService } from 'src/app/services/todo-group.service';
import { TodoService } from 'src/app/services/todo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  //to get posts for speciific group
  getPosts(e) {
    this.TodoGroupService.allTasks(e).subscribe((response) => {
      console.log(response)
      this.tasks = response;
    });
  }

  //delete one group
  deleteGroup(e) {
    if (confirm(`Are you sure you want to delete the selected group?`)) {
      this.TodoGroupService.deleteGroup(e).subscribe(
        Response => {
          console.log(Response);
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
        Response => {
          console.log(Response);
          this.ngOnInit();
        }),
        err => {
          console.log(err);
        }
    }
  }

  newGroup() {
    this.addGroupFlag = 1;
  }
  validGroup = true;
  myForm = new FormGroup({
    groupTitle: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3)
    ]),
  })

  //create new group
  addGroup(e) {
    if (this.myForm.valid) {
      this.addGroupFlag = 0;
      this.TodoGroupService.addGroup(e.value).subscribe(
        res => {
          console.log(res);
        }),
        err => console.log(err)
      this.ngOnInit();
    }
    this.validGroup = false;
  }

  groupChange: boolean = false;
  closeResult: string;

  //open the edit group modal
  editGroup(group) {
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
  updatedGroup:boolean = false;
  updateGroup(value) {
    if (this.myForm.valid) {
      this.TodoGroupService.updateGroup(value, this.id).subscribe(
        res => {
          console.log(res);
          this.updatedGroup = true;
          this.ngOnInit();
        },
        err => console.log(err)
      )
    }
    this.validGroup = false;
  }

  editMonth(month) {
    this.modalService.open(month, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  updateMonth(e) {
    this.TodoGroupService.specificMonthTasks(e).subscribe(
      res => this.lastMos = res,
      err => console.log(err)
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
