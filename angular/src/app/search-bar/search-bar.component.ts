import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { SharedService } from '../shared.service';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
interface Month {
  value: string;
  viewValue: string;
}
export interface Table {
  code: number;
  name: string;
  avgPunchIn: string;
  avgPunchOut: string;
  leavesTaken: number;
  halfdayTaken: number;
  PTORemaining: number;
}
const TABLE_DATA : Table[] = [
  {code: 1, name: 'Prabhakar Paliwal', avgPunchIn: '9:35', avgPunchOut: '6:35', leavesTaken: 2, halfdayTaken: 2, PTORemaining: 19},

];

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
  months: Month[] = [
    {value: '1', viewValue: 'January'},
    {value: '2', viewValue: 'February'},
    {value: '3', viewValue: 'March'},
    {value: '4', viewValue: 'April'},
    {value: '5', viewValue: 'May'},
    {value: '6', viewValue: 'June'},
    {value: '7', viewValue: 'July'},
    {value: '8', viewValue: 'August'},
    {value: '9', viewValue: 'September'},
    {value: '10', viewValue: 'October'},
    {value: '11', viewValue: 'November'},
    {value: '12', viewValue: 'December'},
  ];
  displayedColumns: string[] = ['code', 'name', 'avgPunchIn', 'avgPunchOut', 'leavesTaken', 'halfdayTaken', 'PTORemaining'];
  dataSource = TABLE_DATA;

  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
  },
  {
    letter: 'R',
    names: ['Rhode Island']
  }, {
    letter: 'S',
    names: ['South Carolina', 'South Dakota']
  }, {
    letter: 'T',
    names: ['Tennessee', 'Texas']
  }];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private _formBuilder: FormBuilder,public service: SharedService) {}

  ngOnInit() {
    console.log('mmm')
    this.service.getEmpName().subscribe((response) => {
      console.log('emppp',response)
    }, (error) => {
      console.log('Error is :', error);
    })
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
}
