import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Button } from 'protractor';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  public employees:Employee[];
  public editEmployee:Employee;

  constructor(private employeeService: EmployeeService){}
  ngOnInit(): void {
   this.getEmployees();
  }
  
 

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees=response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message); 
      }
    );
  }

  public onOpenModal(employee:Employee,mode:string): void{
    const contianer=document.getElementById("main-contianer");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute("data-toggle","modal");
    if(mode==='add'){
      button.setAttribute("data-target","#addEmployeeModal");
      
    }
    else if(mode==='edit'){
      this.editEmployee=employee;
        button.setAttribute("data-target","#editEmployeeModal");
    }
    else{
      this.editEmployee=employee;
      button.setAttribute("data-target","#deleteEmployeeModal");
    }
    contianer.append(button);
    button.click();

  }

  public onAddEmployee(addForm:NgForm): void{
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:Employee)=>{
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public updateEmployee(employee:Employee): void{
    document.getElementById('update-employee-form').click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee)=>{
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void)=>{
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployee(key:string):void{
    console.log(key);
    const results:Employee[]=[];
    for(const employee of  this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1||
      employee.email.toLowerCase().indexOf(key.toLowerCase())!==-1||
      employee.phone.toLowerCase().indexOf(key.toLowerCase())!==-1||
      employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1)
      {
        results.push(employee);
      }
      this.employees=results;
      if(results.length===0|| !key){
        this.getEmployees();
      }
    }
  }

}
