import { Component, OnInit } from '@angular/core';
import {faCalendarCheck, faCalendarAlt, faEdit, faTrash, faCalendarPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchText:any;
  edit = faCalendarCheck;
  edit2 = faCalendarAlt;
  edit3 = faEdit;
  delete= faTrash;
  add= faCalendarPlus;
  search2 = faSearch;
  // task object to use in crud
  taskObj: Task = new Task();
  // store all tasks
  taskArr: Task[] = [];
  // to store value of the task that will be givin to the crud service to add (two ways binding)
  addTaskValue: string = '';
  editTaskValue: string = '';
  searchTaskValue: string = '';
    search = new FormControl('');
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
    // make validation for empty task and task already exist
    if (this.addTaskValue == '') {
      alert("Task cannot be empty");
    } else if (this.taskArr.find(x => x.task_name == this.addTaskValue)) {
      alert("Task already exist");
    } else {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    });
  }
}

  // edit task from the taskArr
  editTask(){
    // make validation for empty task and task already exist
    if (this.editTaskValue == '') {
      alert("Task cannot be empty");
    } else if (this.taskArr.find(x => x.task_name == this.editTaskValue)) {
      alert("Task already exist");
    } else {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Unable to edit task");
    });
  }
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
  // search feature
  searchTask(){
    this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.crudService.searchTask(res).subscribe(res => {
        this.taskArr = res;
      }, err => {
        alert("Unable to search task");
      });
    });
  }
}


// adding search feature
// import { Component, OnInit } from '@angular/core';
// import {faCalendarCheck, faCalendarAlt, faEdit, faTrash, faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
// import { Task } from 'src/app/model/task';
// import { CrudService } from 'src/app/service/crud.service';
// import { FormControl } from '@angular/forms';
// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
//
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//
//   edit = faCalendarCheck;
//   edit2 = faCalendarAlt;
//   edit3 = faEdit;
//   delete= faTrash;
//   add= faCalendarPlus;
//   // task object to use in crud
//   taskObj: Task = new Task();
//   // store all tasks
//   taskArr: Task[] = [];
//   // to store value of the task that will be givin to the crud service to add (two ways binding)
//   addTaskValue: string = '';
//   editTaskValue: string = '';
//   search = new FormControl('');
//   constructor(private crudService: CrudService) { }
//
//   ngOnInit(): void {
//     this.editTaskValue = '';
//     this.addTaskValue = '';
//     this.taskObj = new Task();
//     this.taskArr = [];
//     this.getAllTask();
//   }
//   getAllTask(){
//     this.crudService.getAllTask().subscribe(res => {
//       this.taskArr = res;
//     }, err => {
//       alert("Unable to get all tasks");
//     });
//   }
//   // add task to the taskArr
//   addTask() {
//     // make validation for empty task and task already exist
//     if (this.addTaskValue == '') {
//       alert("Task cannot be empty");
//     } else if (this.taskArr.find(x => x.task_name == this.addTaskValue)) {
//       alert("Task already exist");
//     } else {
//     this.taskObj.task_name = this.addTaskValue;
//     this.crudService.addTask(this.taskObj).subscribe(res => {
//       this.ngOnInit();
//       this.addTaskValue = '';
//     }, err => {
//       alert(err);
//     });
//   }
// }
//
//   // edit task from the taskArr
//   editTask(){
//     // make validation for empty task and task already exist
//     if (this.editTaskValue == '') {
//       alert("Task cannot be empty");
//     } else if (this.taskArr.find(x => x.task_name == this.editTaskValue)) {
//       alert("Task already exist");
//     } else {
//     this.taskObj.task_name = this.editTaskValue;
//     this.crudService.editTask(this.taskObj).subscribe(res => {
//       this.ngOnInit();
//     }, err => {
//       alert("Unable to edit task");
//     });
//   }
//   }
//
//   // delete task from the taskArr
//   deleteTask(etask: Task) {
//     this.crudService.deleteTask(etask).subscribe(res => {
//       this.ngOnInit();
//     }, err => {
//       alert("Unable to Delete Task");
//     });
//   }
//
//   call(etask: Task) {
//     this.taskObj = etask;
//     this.editTaskValue = etask.task_name;
//   }
//
//   // search feature
//   searchTask(){
//     this.search.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
//       this.crudService.searchTask(res).subscribe(res => {
//         this.taskArr = res;
//       }, err => {
//         alert("Unable to search task");
//       });
//     });
//   }
// }
//
//
//
//
//
//
