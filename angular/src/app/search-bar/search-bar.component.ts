import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { MatTableDataSource } from '@angular/material/table';

interface Month {
  value: string;
  viewValue: string;
}
export interface Table {
  Code: number;
  Name: string;
  PunchIn: string;
  PunchOut: string;
  Leaves: number;
  HalfDay: number;
  PTORemaining: number;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  //dataSource= [{"Code":1,"Name":"Prabhakar Paliwal","PunchIn":"9:48","PunchOut":"18:51","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":3,"Name":"Sadase Hanief","PunchIn":"9:33","PunchOut":"18:31","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":4,"Name":"Imtiaz Hussain","PunchIn":"9:31","PunchOut":"18:37","Leaves":0,"HalfDay":7,"PTORemaining":18.5},{"Code":5,"Name":"Chhavi Jajoo","PunchIn":"10:01","PunchOut":"18:48","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":6,"Name":"Sagar Rana","PunchIn":"9:36","PunchOut":"18:37","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":7,"Name":"Kulbir Singh","PunchIn":"9:13","PunchOut":"19:13","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":8,"Name":"Pappu Ram Kumawat","PunchIn":"9:43","PunchOut":"18:28","Leaves":31,"HalfDay":6,"PTORemaining":-12},{"Code":9,"Name":"Himanshu Ganglani","PunchIn":"9:43","PunchOut":"19:04","Leaves":13,"HalfDay":3,"PTORemaining":7.5},{"Code":10,"Name":"Anchal Mehta","PunchIn":"9:48","PunchOut":"18:55","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":11,"Name":"Anushri Agarwal","PunchIn":"9:46","PunchOut":"18:31","Leaves":9,"HalfDay":3,"PTORemaining":11.5},{"Code":12,"Name":"Shikha Kumari","PunchIn":"9:45","PunchOut":"19:03","Leaves":3,"HalfDay":3,"PTORemaining":17.5},{"Code":13,"Name":"Vipin Kumar Sati","PunchIn":"9:48","PunchOut":"18:54","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":14,"Name":"Apurv Jain","PunchIn":"9:34","PunchOut":"19:22","Leaves":6,"HalfDay":3,"PTORemaining":14.5},{"Code":15,"Name":"Ravi Kumar Choudhary","PunchIn":"9:40","PunchOut":"18:22","Leaves":3,"HalfDay":0,"PTORemaining":19},{"Code":19,"Name":"Silpa Jha","PunchIn":"9:52","PunchOut":"18:28","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":21,"Name":"Rohit Soni","PunchIn":"9:42","PunchOut":"18:40","Leaves":3,"HalfDay":0,"PTORemaining":19},{"Code":23,"Name":"Abhimanyu Mathur","PunchIn":"9:37","PunchOut":"18:49","Leaves":9,"HalfDay":0,"PTORemaining":13},{"Code":24,"Name":"Harshit Chourasiya","PunchIn":"9:37","PunchOut":"19:03","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":25,"Name":"Shivam Kumar","PunchIn":"9:45","PunchOut":"19:10","Leaves":6,"HalfDay":18,"PTORemaining":7},{"Code":27,"Name":"Anjali Garg","PunchIn":"9:49","PunchOut":"18:48","Leaves":3,"HalfDay":3,"PTORemaining":17.5},{"Code":31,"Name":"Shashank Gehlot","PunchIn":"9:34","PunchOut":"19:12","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":32,"Name":"Shubham Pansari","PunchIn":"9:37","PunchOut":"18:39","Leaves":0,"HalfDay":6,"PTORemaining":19},{"Code":33,"Name":"Shashank Verma","PunchIn":"9:57","PunchOut":"18:57","Leaves":15,"HalfDay":0,"PTORemaining":7},{"Code":34,"Name":"Shashank Garg","PunchIn":"9:51","PunchOut":"19:16","Leaves":0,"HalfDay":6,"PTORemaining":19},{"Code":35,"Name":"Nikita Gupta","PunchIn":"9:33","PunchOut":"18:33","Leaves":3,"HalfDay":0,"PTORemaining":19},{"Code":36,"Name":"Radhika Goyal","PunchIn":"9:28","PunchOut":"18:33","Leaves":3,"HalfDay":6,"PTORemaining":16},{"Code":37,"Name":"Juhi Kriplani","PunchIn":"9:42","PunchOut":"18:33","Leaves":6,"HalfDay":3,"PTORemaining":14.5},{"Code":38,"Name":"Muskan Goyal","PunchIn":"9:31","PunchOut":"18:33","Leaves":15,"HalfDay":0,"PTORemaining":7},{"Code":39,"Name":"Akshat Mathur","PunchIn":"9:39","PunchOut":"18:31","Leaves":9,"HalfDay":0,"PTORemaining":13},{"Code":40,"Name":"Mohd. Haris","PunchIn":"9:25","PunchOut":"18:34","Leaves":9,"HalfDay":3,"PTORemaining":11.5},{"Code":41,"Name":"Harshal Paliwal","PunchIn":"9:36","PunchOut":"18:33","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":42,"Name":"Kirti Khandelwal","PunchIn":"9:37","PunchOut":"18:31","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":43,"Name":"Mohit Khemchandani","PunchIn":"9:37","PunchOut":"18:31","Leaves":13,"HalfDay":0,"PTORemaining":9},{"Code":44,"Name":"Anjali Poddar","PunchIn":"9:37","PunchOut":"18:33","Leaves":9,"HalfDay":3,"PTORemaining":11.5},{"Code":45,"Name":"Dipanshu Bisht","PunchIn":"9:31","PunchOut":"18:31","Leaves":3,"HalfDay":0,"PTORemaining":19},{"Code":46,"Name":"Daulat Singh","PunchIn":"9:33","PunchOut":"17:52","Leaves":18,"HalfDay":6,"PTORemaining":1},{"Code":47,"Name":"Priyanshu Sharma","PunchIn":"9:36","PunchOut":"18:31","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":48,"Name":"Rohsan Kumawat","PunchIn":"9:30","PunchOut":"18:33","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":49,"Name":"Tushar Sharma","PunchIn":"9:40","PunchOut":"18:31","Leaves":0,"HalfDay":3,"PTORemaining":20.5},{"Code":50,"Name":"Astha Rai","PunchIn":"9:34","PunchOut":"18:31","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":51,"Name":"Divya Sharma","PunchIn":"9:30","PunchOut":"18:31","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":52,"Name":"Devansh Aggarwal","PunchIn":"9:31","PunchOut":"18:33","Leaves":3,"HalfDay":6,"PTORemaining":16},{"Code":53,"Name":"Suraj Kumar","PunchIn":"9:31","PunchOut":"18:31","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":54,"Name":"Hitanshu Gupta","PunchIn":"9:31","PunchOut":"18:31","Leaves":6,"HalfDay":0,"PTORemaining":16},{"Code":55,"Name":"Arum Mahur","PunchIn":"9:31","PunchOut":"18:31","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":56,"Name":"Shubham Tak","PunchIn":"9:30","PunchOut":"18:33","Leaves":9,"HalfDay":0,"PTORemaining":13},{"Code":57,"Name":"Abhishek Khandelwal","PunchIn":"9:36","PunchOut":"18:31","Leaves":9,"HalfDay":0,"PTORemaining":13},{"Code":58,"Name":"Harsh Rawat","PunchIn":"9:40","PunchOut":"18:31","Leaves":6,"HalfDay":0,"PTORemaining":16},{"Code":59,"Name":"Simarn Ahuja","PunchIn":"9:36","PunchOut":"18:31","Leaves":10,"HalfDay":0,"PTORemaining":12},{"Code":60,"Name":"Noopur Rathore","PunchIn":"9:31","PunchOut":"18:27","Leaves":9,"HalfDay":0,"PTORemaining":13},{"Code":61,"Name":"Dixita Mathur","PunchIn":"9:33","PunchOut":"18:33","Leaves":0,"HalfDay":0,"PTORemaining":22},{"Code":62,"Name":"Surya Teja","PunchIn":"9:39","PunchOut":"18:31","Leaves":9,"HalfDay":3,"PTORemaining":11.5},{"Code":63,"Name":"Harsh Kasodariya","PunchIn":"9:40","PunchOut":"18:31","Leaves":3,"HalfDay":0,"PTORemaining":19}]
  displayedColumns = ['Code', 'Name', 'PunchIn', 'PunchOut', 'Leaves', 'HalfDay', 'PTORemaining'];
  selectedName;
  selectedMonth;
  names;
  details;
  dataElement: number;
  TABLE_DATA;
  dataSource;


  months: Month[] = [
    {value: '0', viewValue: 'January'},
    {value: '1', viewValue: 'February'},
    {value: '2', viewValue: 'March'},
    {value: '3', viewValue: 'April'},
    {value: '4', viewValue: 'May'},
    {value: '5', viewValue: 'June'},
    {value: '6', viewValue: 'July'},
    {value: '7', viewValue: 'August'},
    {value: '8', viewValue: 'September'},
    {value: '9', viewValue: 'October'},
    {value: '10', viewValue: 'November'},
    {value: '11', viewValue: 'December'},
  ];

  constructor(private _formBuilder: FormBuilder,public service: SharedService) {}
getDetails()
{
  console.log('selected name', this.selectedName)
  console.log('selected month', this.selectedMonth)
  if(this.selectedMonth && this.selectedName){
  this.service.getParticularEmpDetails(this.selectedName, this.selectedMonth).subscribe((response)=>{
    console.log('checking for particular', response)
    this.dataSource = response;
    console.log("checking for table empty", this.dataSource.length)
  }, (error) => {
    console.log('Error is : ',error)
  })

}
else{

  console.log("noo")
}
}
  ngOnInit() {

    this.service.getEmpName().subscribe((response) => {
      this.names = (response);
    }, (error) => {
      console.log('Error is :', error);
    })

    this.service.getEmpDetails().subscribe((response) => {
      //console.log('component ts response',response)
      this.details = response;
      this.dataSource = response;
      console.log("datasource", this.dataSource)


    }, (error) => {
      console.log('Error is :', error);
    })
  }

}
