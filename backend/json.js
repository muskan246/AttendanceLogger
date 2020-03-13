let csvToJson = require('convert-csv-to-json');
var chilkat = require('@chilkat/ck-node11-linux64');
let fileInputName1 = 'Monthly_BasicReport_Feb.csv';
let fileOutputName = 'myOutputFile.json';
let fileInputName2 = 'feb_mus.csv';
var myData = new Object;
var anotherData = new Object;
var json1 = new chilkat.JsonObject();
var success1;
var date = ['1/2/2020', '2/2/2020', '3/2/2020', '4/2/2020', '5/2/2020'];
var index = -1;

//csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName1);
csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName2);

let json = csvToJson.getJsonFromCsv(fileInputName1);
let anotherjson = csvToJson.getJsonFromCsv(fileInputName2);
//console.log(anotherjson[27])
for (var i = 0; i < anotherjson.length; i++) {
    for (var j = 0; j < date.length; j++) {
        //console.log("hh")
        //console.log(i)
        if (anotherjson[i].Date == date[j] && anotherjson[i].EmployeeName === 'Muskan Goyal') {
            // Let's create the Detail JSON object:
            success1 = json1.AddObjectAt(-1, "Detail");
            var detail = json1.ObjectAt(json.Size - 1);
            success1 = detail.AddStringAt(-1, "Status", "P");
            json1.EmitCompact = false;
            console.log(json1.Emit());

            // anotherData = {
            //     [JSON.stringify("status")]: anotherjson[i].Status,
            //     [JSON.stringify("PunchIn")]: anotherjson[i].PunchIn,
            //     [JSON.stringify("PunchOut")]: anotherjson[i].PunchOut,
            //     [JSON.stringify("Duration")]: anotherjson[i].Duration

            // }
            // newData = {
            //     [JSON.stringify(anotherjson[i].Date)]: anotherData
            // }

            //console.log(newData);
            // myData.status = anotherjson[i].Status;
            // myData.PunchIn = anotherjson[i].PunchIn;
            // myData.PunchOut = anotherjson[i].PunchOut;
            // myData.Duration = anotherjson[i].Duration;

            //console.log(myData)
            console.log(newData)


        }
    }

}
//console.log("length", anotherjson.length)
// for (var i = 0; i < anotherjson.length; i++) {
//     for (var j = 0; j < date.length; j++) {
//         console.log("i", i)
//         console.log("j", j)
//         if (anotherjson[i].Date == date[i]) {
//             console.log(i);
//             console.log(date)
//             console.log(">>", anotherjson[i].EmployeeName)
//             date = anotherjson[i].Date;
//             punchIn = anotherjson[i].PunchIn;
//             punchOut = anotherjson[i].PunchOut;
//             duration = anotherjson[i].Duration;
//             status = anotherjson[i].Status;



//         }
//     }
// }
// // for (let i = 0; i < 2; i++) {
// //     if (json[i].EmployeeCode == '1') {
// //         statusOfIdOfEmp1ofFeb1 = json[i][++i]
// //             //console.log(json[i].Feb01)
// //     }

// // }
// // console.log(statusOfIdOfEmp1ofFeb1)
// // for (let i = 0; i < anotherjson.length; i++) {
// //     if (anotherjson[i].EmployeeCode == '1') {
// //         IntimeOfIdOfEmp1ofFeb1 = anotherjson[i].PunchIn
// //         OuttimeOfIdOfEmp1ofFeb1 = anotherjson[i].PunchOut
// //         DurationOfIdOfEmp1ofFeb1 = anotherjson[i].InDuration

// //         //console.log(json[i].Feb01)
// //     }

// // }
// // console.log(IntimeOfIdOfEmp1ofFeb1)
// myData.Status = status;
// myData.PunchIn = punchIn;
// myData.PunchOut = punchOut;
// myData.Duration = duration;

// //console.log(">>>", myData) ;
// newData = { '1/2/2020': myData }
// console.log(newData)
// // json.forEach(element => {
// //     if (element.No == '53') {

// //         console.log(Object.keys(element))
// //     }
// // });