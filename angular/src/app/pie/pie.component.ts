import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
export interface PeriodicElement {
  employeeStatus: string;
  count: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
  displayedColumns: string[] = ['employeeStatus', 'count'];
  dataSource = ELEMENT_DATA;

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

