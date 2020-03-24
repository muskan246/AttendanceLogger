import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  ToDate: Date;
  FromDate: Date;
  date1: number;
  month1: number;
  year1: number;
  date2: number;
  month2: number;
  year2: number;
  presentCount: [];
  absentCount: [];
  halfdayCount: [];
  dataLoaded: boolean = false;
    title = "Attendance record from Date1 to Date2";
  type = "LineChart";
  data :any= [
    ["1/2/2020", 35, 10, 8],
    ["2/2/2020", 40, 3, 10],
    ["3/2/2020", 45, 5, 3],
    ["4/2/2020", 50, 1, 2],
    ["5/2/2020", 48, 4, 3]
  ];
  columnNames = ["Dates", "Present", "Absent", "Half Present"];
  options = {
    hAxis: {
      title: "Dates"
    },
    vAxis: {
      title: "Status"
    }
  };
  width = 650;
  height = 440;
//   title:string='Graph';
//   type: string='Some text';
//   data:any=[];
//   columnNames :any= ["Dates", "Present", "Absent", "Half Present"];
//   width:number=650;
//   height:number=400;
//   // cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
// options :any= {
//     hAxis: {
//       title: "Dates"
//     },
//     vAxis: {
//       title: "Status"
//     }
//   };
  //weekOffCount: number;

  constructor(public service: SharedService) {}
  searchFor() {
    // console.log("Came inside searchFor");
    // console.log("fromDate->"+ this.FromDate);
    this.date1 = this.FromDate.getDate();
    this.month1 = this.FromDate.getMonth();
    this.year1 = this.FromDate.getFullYear();
    this.date2 = this.ToDate.getDate();
    this.month2 = this.ToDate.getMonth();
    this.year2 = this.ToDate.getFullYear();
    //console.log('Line',this.ToDate, this.FromDate);

    this.service
      .getLineChartData(
        this.date1,
        this.month1,
        this.year1,
        this.date2,
        this.month2,
        this.year2
      )
      .subscribe(
        response => {
          console.log("response->" + JSON.stringify(response));
          this.dataLoaded = true;
          let resp=response;
          this.data=resp;
          // this.data= [
          //     ["1/2/2020", 35, 10, 8],
          //     ["2/2/2020", 40, 3, 10],
          //     ["3/2/2020", 45, 5, 3],
          //     ["4/2/2020", 50, 1, 2],
          //     ["5/2/2020", 48, 4, 3]
          //   ];
        },
        error => {
          console.log("Error is :", error);
        }
      );
  }

  ngOnInit(): void {}

  // title = "Attendance record from Date1 to Date2";
  // type = "LineChart";
  // data = [
  //   ["1/2/2020", 35, 10, 8],
  //   ["2/2/2020", 40, 3, 10],
  //   ["3/2/2020", 45, 5, 3],
  //   ["4/2/2020", 50, 1, 2],
  //   ["5/2/2020", 48, 4, 3]
  // ];
  // columnNames = ["Dates", "Present", "Absent", "Half Present"];
  // options = {
  //   hAxis: {
  //     title: "Dates"
  //   },
  //   vAxis: {
  //     title: "Status"
  //   }
  // };
  // width = 650;
  // height = 440;
}
