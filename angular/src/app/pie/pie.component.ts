import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
export interface AttendanceElement {
  employeeStatus: string;
  count: number;
}

const ATTENDANCE_DATA: AttendanceElement[] = [
  {employeeStatus: 'Present', count: 47},
  {employeeStatus: 'Absent', count: 4},
  {employeeStatus: 'Half-Day', count: 2},

];

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  startDate: Date;

  searchFor() {
   console.log('Pie',this.startDate);
   };
  displayedColumns: string[] = ['employeeStatus', 'count'];
  dataSource = ATTENDANCE_DATA;

  constructor() { }


  ngOnInit() {


}
title = 'Attendance Record of Today';
 type = 'PieChart';
 data = [
 ['Present', 47],
 ['Absent', 4],
 ['Half-Day', 2],

 ];
 columnNames = ['Employee Status', 'Count'];
 options = {
 is3D: true,
 };

}

