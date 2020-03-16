let csvToJson = require('convert-csv-to-json');
let fileInputName1 = 'feb_mus.csv';
var date = ['1/2/2020', '2/2/2020', '3/2/2020', '4/2/2020', '5/2/2020', '6/2/2020', '7/2/2020', '8/2/2020', '9/2/2020', '10/2/2020', '11/2/2020', '12/2/2020', '13/2/2020', '14/2/2020', '15/2/2020', '16/2/2020', '17/2/2020', '18/2/2020', '19/2/2020', '20/2/2020', '21/2/2020', '22/2/2020', '23/2/2020', '24/2/2020', '25/2/2020', '26/2/2020', '27/2/2020', '28/2/2020', '29/2/2020'];

var anotherData;
var anotherData1 = [];
//var str = "";

csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName1);
let json = csvToJson.getJsonFromCsv(fileInputName1);
//console.log("_______", json)

for (var i = 0; i < json.length; i++) {
    for (var j = 0; j < date.length; j++) {
        if (json[i].Date == date[j] && json[i].EmployeeName === 'Harsh Kasodariya') {
            name = json[i].EmployeeName
            anotherData = {
                [json[i].Date]: {
                    Status: json[i].Status,
                    PunchIn: json[i].PunchIn,
                    PunchOut: json[i].PunchOut
                }
            };

            //anotherData = JSON.stringify(anotherData)
            //console.log(anotherData);

            anotherData1.push(anotherData)


        }
    }
}
anotherData1 = JSON.stringify(anotherData1)
console.log(name)
    //console.log(anotherData1)
    // anotherData1.forEach(element => {
    //     console.log(JSON.stringify(Object.keys(element)))

// });

//console.log(Object.keys(anotherData1[0]))


//------imp foor getting status--------
//console.log(Object.values(anotherData1[0])[0].Status)
//---------------------- 


//console.log((Object.values(JSON.stringify(anotherData1[0]).Status)))



//anotherData1 = JSON.stringify(anotherData1) // database
//console.log(anotherData1)
//anotherData1 = JSON.parse(anotherData1)
//console.log((anotherData1[0]))
// str1 = str.toString();
// console.log(JSON.parse(str1))
//console.log(str1);
// console.log(JSON.parse(str))

// var myData = {
//     "2/2/2020": {
//         "Status": "P",
//         "PunchIn": "9:30:00",
//         "PunchOut": "18:30:00",
//         "Duration": "9:00"
//     },
//     "2/2/2020": {
//         "Status": "P",
//         "PunchIn": "9:30:00",
//         "PunchOut": "18:30:00",
//         "Duration": "9:00"
//     }
// }

// ///console.log(Object.keys(myData)[0])
// console.log(myData['2/2/2020'].Status)

// console.log(anotherData1[0]['1/2/2020'].Status)
// console.log(anotherData1[1]['2/2/2020'].Status)
//     // console.log(anotherData1[2]['3/2/2020'].Status)
// console.log(anotherData1[3]['4/2/2020'].Status)
// console.log(anotherData1[4]['5/2/2020'].Status)