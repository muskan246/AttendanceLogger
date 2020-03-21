import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _urlapi = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }

  getPieChartData(date, month, year) {
    console.log('service', date, month);
    return this.http.post('http://127.0.0.1:3000/getpiedata', {'Date': date,'Month': month,'Year': year});

  }

  getEmpName() {
    console.log('service of getEmpData');
    return this.http.get('http://127.0.0.1:3000/getempname');
  }

  getEmpDetails() {
    console.log('service of getEmpDetails');
    return this.http.get('http://127.0.0.1:3000/getempdetails');
  }

  getParticularEmpDetails(name, month) {
    console.log('service of getParticularEmpDetails');
    return this.http.post('http://127.0.0.1:3000/getparticularempdetails', {'Name': name, 'Month' : month});

  }
}
