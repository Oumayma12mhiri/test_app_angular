import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../model/employee-dash board.model';
import { ApiService } from '../service/api.service';
import { AuthServiceService } from '../service/auth-service.service';




@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    numMobile: new FormControl(''),
    salary: new FormControl(''),
  })

  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private formbuilber: FormBuilder,
    private api: ApiService,
    public authService:AuthServiceService
  ) { }

  totalLength:any;
  page:number = 1;


  ngOnInit(): void {
    this.getAllEmployee();
  }


clickAddEmploye(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false ;
}
  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.numMobile = this.formValue.value.numMobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => { alert("Something Went wrong") }
      )

  }
  getAllEmployee() {
    this.api.getEmploye()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  deleteEmployee(id: any) {
    this.api.DeleteEmploye(id)
      .subscribe(res => {
        alert("Employee Deleted");
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
  this.showUpdate = true ;
    this.employeeModelObj.id = row.id;
    this.formValue.patchValue({
      name: row.name,
      email: row.email,
      numMobile: row.numMobile,
      salary: row.salary,
    })
  }

  UpdateEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.numMobile = this.formValue.value.numMobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.UpdateEmploye(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

}
