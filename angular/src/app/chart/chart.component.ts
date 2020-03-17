import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'Attendance record from Date1 to Date2';
   type = 'LineChart';
   data = [
      ["1/2/2020",  35, 10, 8],
      ["2/2/2020",  40, 3, 10],
      ["3/2/2020",  45,  5, 3],
      ["4/2/2020",  50, 1, 2],
      ["5/2/2020",  48, 4, 3]
   ];
   columnNames = ["Dates", "Present", "Absent","Half Present"];
   options = {
      hAxis: {
         title: 'Dates'
      },
      vAxis:{
         title: 'Status'
      },
   };
   width = 650;
   height = 400;

}
