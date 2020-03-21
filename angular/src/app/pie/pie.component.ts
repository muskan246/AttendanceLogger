import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { SharedService } from '../shared.service';
export interface AttendanceElement {
  employeeStatus: string;
  count: number;
}

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  startDate: Date;
  date: number;
  month: number;
  year: number;
  presentCount: number;
  absentCount: number;
  halfdayCount: number;
  weekOffCount: number;
  noRecord: number;
  ATTENDANCE_DATA: AttendanceElement[]=[
  {employeeStatus: 'Present', count: 48},
  {employeeStatus: 'Absent', count: 4},
  {employeeStatus: 'Half-Day', count: 1}];

  displayedColumns = ['employeeStatus', 'count'];
  dataSource = this.ATTENDANCE_DATA;
  constructor(public service: SharedService) { }

  searchFor() {
    this.date = this.startDate.getDate();
    this.month = this.startDate.getMonth();
    this.year = this.startDate.getFullYear();
    console.log('Pie', this.date, this.month, this.year);

    this.service.getPieChartData(this.date, this.month, this.year).subscribe((response) => {
      this.presentCount = response['present']
      this.absentCount = response['absent']
      this.halfdayCount = response['halfday']
      this.weekOffCount = response['weeklyOff']
      this.noRecord = response['NoRecord']
      this.ATTENDANCE_DATA[0].count = this.presentCount
      this.ATTENDANCE_DATA[1].count = this.absentCount
      this.ATTENDANCE_DATA[2].count = this.halfdayCount

    console.log('inside function ',this.ATTENDANCE_DATA[0].count)
      console.log('IN TS file Present',this.presentCount, 'Absent', this.absentCount, 'Half-Day', this.halfdayCount, 'Weekly-Off', this.weekOffCount);

    }, (error) => {
      console.log('Error is :', error);
    }
    );
  }

  ngOnInit() {
    this.presentCount = 48
    this.absentCount = 4
    this.halfdayCount = 1
    this.weekOffCount = 0
    this.ATTENDANCE_DATA[0].count = this.presentCount

   console.log(this.ATTENDANCE_DATA[0].count)


}
title = 'Attendance Record of Today';
 type = 'PieChart';
 pdata = [];
 options = {
 is3D: true,
 };

}

