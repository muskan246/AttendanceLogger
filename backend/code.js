let csvToJson = require('convert-csv-to-json');
let fileInputName1 = 'feb_mus.csv';
var date = ['1/2/2020', '2/2/2020', '3/2/2020', '4/2/2020', '5/2/2020'];
var anotherData = "";
var anotherData1 = [];
//var str = "";

csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName1);
let json = csvToJson.getJsonFromCsv(fileInputName1);

for (var i = 0; i < json.length; i++) {
    for (var j = 0; j < date.length; j++) {
        if (json[i].Date == date[j] && json[i].EmployeeName === 'Muskan Goyal') {
            anotherData = {
                [JSON.stringify(json[i].Date)]: {
                    [JSON.stringify("Status")]: JSON.stringify(json[i].Status),
                    [JSON.stringify("PunchIn")]: JSON.stringify(json[i].PunchIn),
                    [JSON.stringify("PunchOut")]: JSON.stringify(json[i].PunchOut),
                    [JSON.stringify("Duration")]: JSON.stringify(json[i].Duration)

                }
            }

            anotherData1.push(anotherData)

        }
    }
}

//anotherData = JSON.stringify(anotherData)
console.log(anotherData1)
    // anotherData = anotherData[''].replace(/ /g, '')
    // console.log(newObj)
    //console.log(anotherData1)
    // anotherData1 = JSON.parse(anotherData1)
    //console.log(anotherData1)
    //str = JSON.stringify(anotherData1)
    //console.log(str)

//     //     //console.log(JSON.stringify(anotherData1))
// str = str.replace('\"/g', "")
// str = str.replace(/\\/g, "")
//     // str = str.repl'ace(/\[/g, "")
//     // str = str.replace(/\]/g, "")
//console.log(str)
// str1 = JSON.parse(JSON.parse(str))
// str1 = str.toString();
// console.log(JSON.parse(str1))
//console.log(str1);
// console.log(JSON.parse(str))z