import { Component, OnInit } from '@angular/core';
import {faCalendarCheck, faCalendarAlt, faEdit, faTrash, faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  edit = faCalendarCheck;
  edit2 = faCalendarAlt;
  edit3 = faEdit;
  delete= faTrash;
  add= faCalendarPlus;
  // task object to use in crud
  taskObj: Task = new Task();
  // store all tasks
  taskArr: Task[] = [];
  // to store value of the task that will be givin to the crud service to add (two ways binding)
  addTaskValue: string = '';
  editTaskValue: string = '';
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask(){
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get all tasks");
    });
  }
  // add task to the taskArr
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    });
}

  // edit task from the taskArr
  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Unable to edit task");
    });
  }

// delete task from the taskArr
deleteTask(etask: Task) {
  this.crudService.deleteTask(etask).subscribe(res => {
    this.ngOnInit();
  }, err => {
    alert("Unable to Delete Task");
  });
}

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
