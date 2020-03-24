var http = require("http");
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var cors = require('cors')
var date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
var emp = ['Prabhakar Paliwal', 'Sadase Hanief', 'Imtiaz Hussain', 'Chhavi Jajoo', 'Sagar Rana', 'Kulbir Singh', 'Pappu Ram Kumawat', 'Himanshu Ganglani', 'Anchal Mehta', 'Anushri Agarwal', 'Shikha Kumari', 'Vipin Kumar Sati', 'Apurv Jain', 'Ravi Kumar Choudhary', 'Silpa Jha', 'Rohit Soni', 'Abhimanyu Mathur', 'Harshit Chourasiya', 'Shivam Kumar', 'Anjali Garg', 'Shashank Gehlot', 'Shubham Pansari', 'Shashank Verma', 'Shashank Garg', 'Nikita Gupta', 'Radhika Goyal', 'Juhi Kriplani', 'Muskan Goyal', 'Akshat Mathur', 'Mohd. Haris', 'Harshal Paliwal', 'Kirti Khandelwal', 'Mohit Khemchandani', 'Anjali Poddar', 'Dipanshu Bisht', 'Daulat Singh', 'Priyanshu Sharma', 'Rohsan Kumawat', 'Tushar Sharma', 'Astha Rai', 'Divya Sharma', 'Devansh Aggarwal', 'Suraj Kumar', 'Hitanshu Gupta', 'Arum Mahur', 'Shubham Tak', 'Abhishek Khandelwal', 'Harsh Rawat', 'Simarn Ahuja', 'Noopur Rathore', 'Dixita Mathur', 'Surya Teja', 'Harsh Kasodariya']
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', ' September', 'October', 'November', 'December'];
var absent = 0;
var halfDay = 0;
var fs=require("fs");
var _ = require('lodash')
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Success$132',
    database: 'mydata',
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log("Database connection Succeded");
    else
        console.log("Database connection failed \n Error : " + JSON.stringify(err, undefined, 2));
});

var server = app.listen(3000, "127.0.0.1", function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

});

var nameArray = [];
var feb = month[1];
app.post('/getpiedata', function(req, res) {
    dateFromFrontend = req.body.Date;
    monthFromFrontend = req.body.Month;
    yearFromFrontend = req.body.Year;
    //console.log("pp")
    //console.log('Date', dateFromFrontend)
    //console.log('Month', monthFromFrontend)
    //console.log('Year', yearFromFrontend)
    var present = 0;
    var absent = 0;
    var halfDay = 0;
    var wo = 0;
    var noRecord = 0;
    if (yearFromFrontend == 2020 && (monthFromFrontend == 0 || monthFromFrontend == 1 || monthFromFrontend == 2)) {

        var sqlPieDate = `SELECT VALUE FROM new_attendance`
        mysqlConnection.query(sqlPieDate, function(err, result) {
            if (!err) {
                for (k = 0; k < emp.length; k++) {
                    sqlData = JSON.parse(result[k].VALUE)
                        //console.log(sqlData)
                    x = month[monthFromFrontend]
                        // x = February
                        //console.log(sqlData['Year2020'][monthFromFrontend][x][dateFromFrontend - 1][dateFromFrontend]['Status'])
                    if (sqlData['Year2020'][monthFromFrontend][x][dateFromFrontend - 1][dateFromFrontend]['Status'] === 'P') {
                        //console.log("inside if")
                        present += 1
                    }
                    if (sqlData['Year2020'][monthFromFrontend][x][dateFromFrontend - 1][dateFromFrontend]['Status'] === 'A') {
                        //console.log("inside if")
                        absent += 1
                    }
                    if (sqlData['Year2020'][monthFromFrontend][x][dateFromFrontend - 1][dateFromFrontend]['Status'] === 'HP') {
                        //console.log("inside if")
                        halfDay += 1
                    }

                }
                if (present == 0) {
                    wo = 1;
                    //console.log('Weekly off', wo)
                }
                //console.log('Present', present, 'Absent', absent, 'Half-Day', halfDay, 'Weekly-Off', wo)

                res.end(JSON.stringify({ 'present': present, 'absent': absent, 'halfday': halfDay, 'weeklyOff': wo, 'NoRecord': noRecord }))
            } else {
                //console.log(err);
                res.end(JSON.stringify(err));
            }
        });
    } else {
        noRecord = 1;
        res.end(JSON.stringify({ 'present': present, 'absent': absent, 'halfday': halfDay, 'weeklyOff': wo, 'NoRecord': noRecord }))

    }
})
app.post('/getlinechartdata', function(req, res) {
    dd1 = req.body.Date1;
    mm1 = req.body.Month1;
    yyyy1 = req.body.Year1;
    dd2 = req.body.Date2;
    mm2 = req.body.Month2;
    yyyy2 = req.body.Year2;
    var totPresent = 0;
    var totAbsent = 0;
    var totHalfDay = 0;
    var monthInString;
    var yearString = "Year2020";
    monthInString = month[mm1 - 1];
    var finalArr1 = [];
    if (yyyy1 == 2020 && (mm1 == 0 || mm1 == 1 || mm1 == 2)) {
        var sqlPieDate = `SELECT VALUE FROM new_attendance`;
        mysqlConnection.query(sqlPieDate, function(err, result) {
            if (!err) {
                for (k = 0; k < emp.length; k++) {
                    var tempData1 = JSON.parse(result[k].VALUE);
                    var yearData = tempData1[yearString];
                    var monthData = yearData[mm1 - 1][monthInString];
                    for (var i = 0; i < monthData.length; i++) {
                        totPresent = 0;
                        totAbsent = 0;
                        totHalfDay = 0;
                        var tempRes = monthData[i];
                        for (var j = dd1; j <= dd2; j++) {
                            var tempObj = {};
                            var status = tempRes[j];
                            var tempStatus;
                            if (!status || status == undefined || status == 'undefined' || status == null || status == 'null') {
                                // Do Nothing
                            }
                            else {
                                if (status.Status == 'P') {
                                    totPresent += 1;
                                    tempStatus = 'P';
                                }
                                else if (status.Status == 'A') {
                                    tempStatus = 'A';
                                    totAbsent += 1;
                                }
                                else if (status.Status == 'HP') {
                                    tempStatus = 'HP';
                                    totHalfDay += 1;
                                }
                                else {
        
                                }
                                tempObj.dd = j;
                                tempObj.status = tempStatus;
                                tempStatus = 'NA';
                                finalArr1.push(tempObj);
                                tempObj = {};
                            }
                        }
                    }
                }
                var tempArr = [];
                for (var j = dd1; j <= dd2; j++) {
                    var tempArr10=[];
                    tempArr10.push(j+"/"+ mm1+"/"+ yyyy1);
                    var allPresent = (_.filter(finalArr1, { 'dd': j, 'status': "P" })).length;
                    tempArr10.push(allPresent);
                    var allAbsent = (_.filter(finalArr1, { 'dd': j, 'status': "A" })).length;
                    tempArr10.push(allAbsent);
                    var allHalfDay = (_.filter(finalArr1, { 'dd': j, 'status': "HP" })).length;
                    tempArr10.push(allHalfDay);
                    tempArr.push(tempArr10);
                    tempArr10=[];
                }
                console.log("Exiting Loop");
                res.json(tempArr);
            }
        });
    } else {
       // noRecord = 1;
        //res.end(JSON.stringify({ 'present': present, 'absent': absent, 'halfday': halfDay, 'weeklyOff': wo, 'NoRecord': noRecord }))

    }
})

app.get('/getempname', function(req, res) {
    mysqlConnection.query('SELECT NAME FROM new_attendance ORDER BY Name ASC', (err, results, fields) => {
        if (!err) {
            //console.log(results)
            res.end(JSON.stringify(results))

        } else
        //console.log(err);
            res.end(JSON.stringify(err));
    })

})


app.get('/getempdetails', function(req, res) {
    finalData = []

    mysqlConnection.query('SELECT * FROM new_attendance ', (err, results, fields) => {
        if (!err) {
            //console.log(results)
            for (loopVariable = 0; loopVariable < emp.length; loopVariable++) {
                jsonData = {};
                absent = 0;
                halfDay = 0;
                present = 0;
                totalPTORemaining = 0;
                totalTimePunchIn = 0;
                totalTimePunchOut = 0;
                avgTimePunchIn = 0;
                avgTimePunchOut = 0;
                code = results[loopVariable].Code
                name = results[loopVariable].Name
                    //console.log("CODE", code)
                    //console.log("NAME:", name)
                value = JSON.parse(results[loopVariable].Value)
                    //console.log("Value:", value['Year2020'][0]['January'][0][1]['Status'])
                monthLength = Object.keys(value['Year2020'])
                for (monthkeys = 0; monthkeys < monthLength.length; monthkeys++) {
                    //console.log('Value', (value['Year2020'][monthkeys][month[monthkeys]]))
                    dateLength = Object.keys(value['Year2020'][monthkeys][month[monthkeys]])
                    for (dateKeys = 0; dateKeys < dateLength.length; dateKeys++) {
                        //console.log("Value:", value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['Status'])
                        if (value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['Status'] == 'A') {
                            absent += 1;
                        }
                        if (value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['Status'] == 'HP') {
                            halfDay += 1;
                        }
                        if (value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['Status'] == 'P') {
                            present += 1;
                            punchIn = value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['PunchIn']
                            punchOut = value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['PunchOut']
                                //console.log('Punch In ', value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['PunchIn'])
                                //console.log('Punch Out ', value['Year2020'][monthkeys][month[monthkeys]][dateKeys][dateKeys + 1]['PunchOut'])
                                //console.log('Punch In ', punchIn, 'Punch Out', punchOut);
                            pIN = punchIn.split(":")
                            pIN[0] = parseInt(pIN[0])
                            pIN[1] = parseInt(pIN[1])

                            pOUT = punchOut.split(":")
                            pOUT[0] = parseInt(pOUT[0])
                            pOUT[1] = parseInt(pOUT[1])
                                //console.log(parse(p[0]), p[1])
                                //console.log(typeof(punchIn))
                            totalTimePunchIn = totalTimePunchIn + ((pIN[0] * 60) + pIN[1])
                            avgTimePunchIn = parseInt(totalTimePunchIn / present)
                            hourIN = (avgTimePunchIn / 60)
                            hourDecimalIN = (hourIN.toFixed(2))
                            hourPunchIN = hourDecimalIN.split(".")
                                // hourPunchIN = JSON.stringify(hourPunchIN)


                            totalTimePunchOut = totalTimePunchOut + ((pOUT[0] * 60) + pOUT[1])
                            avgTimePunchOut = parseInt(totalTimePunchOut / present)
                            hourOUT = (avgTimePunchOut / 60)
                            hourDecimalOUT = (hourOUT.toFixed(2))
                            hourPunchOut = hourDecimalOUT.split(".")


                            //console.log("lets", hourDecimalOUT)
                            //console.log('chceing', hourDecimal[0], hourDecimal[2])
                            //timeIn = JSON.stringify(hourDecimal.split("."))
                            //timePunch = timeIn[0] + ":" + timeIn[1]
                            // console.log('punch', timePunch)
                        }

                    }
                }

                totalPTORemaining = 22 - (absent + (halfDay / 2))

                minIN = parseInt(((hourPunchIN[1]) * 60) / 100)
                minOUT = parseInt(((hourPunchOut[1]) * 60) / 100)
                if (minIN < 10)
                    minIN = "0" + minIN
                if (minOUT < 10)
                    minOUT = "0" + minOUT

                //console.log("min", minIN)
                //console.log("max", minOUT)
                finalPunchIn = parseInt(hourPunchIN[0]) + ":" + (minIN)
                finalPunchOut = parseInt(hourPunchOut[0]) + ":" + (minOUT)

                //console.log('Average punch in', finalPunchIn)
                //console.log('Average punch out', finalPunchOut)
                jsonData = { 'Code': code, 'Name': name, 'PunchIn': finalPunchIn, 'PunchOut': finalPunchOut, 'Leaves': absent, 'HalfDay': halfDay, 'PTORemaining': totalPTORemaining }
                finalData.push(jsonData)
                    //console.log("hour", parseInt(hourDecimalOUT[0]), parseInt(hourDecimalOUT[1]), "min", parseInt(hourDecimalOUT[3]) * 6)
                    //res.end(JSON.stringify({ 'Code': code, 'Name': name, 'PunchIn': finalPunchIn, 'PunchOut': finalPunchOut, 'Leaves': absent, 'HalfDay': halfDay, 'PTORemaining': totalPTORemaining }))

            }
            res.end(JSON.stringify(finalData))
                //console.log(finalData)
        } else
        //console.log(err);
            res.end(JSON.stringify(err));
    })
})

app.post('/getparticularempdetails', function(req, res) {
    nameForEmp = req.body.Name;
    monthForEmp = req.body.Month;
    absent = 0;
    present = 0;
    halfpresent = 0;
    totalPTORemaining = 0;
    totalTimePunchIn = 0;
    totalTimePunchOut = 0;
    finalData = [];
    console.log('particular', req.body.Name, req.body.Month)
    if (monthForEmp == 0 || monthForEmp == 1 || monthForEmp == 2) {
        mysqlConnection.query('SELECT * FROM new_attendance WHERE `Name`=?', [nameForEmp], function(err, results, fields) {
            if (!err) {
                name = (results[0].Name)
                code = (results[0].Code)
                value = JSON.parse(results[0].Value);
                console.log(value['Year2020'][monthForEmp][month[monthForEmp]])
                dateLength = Object.keys(value['Year2020'][monthForEmp][month[monthForEmp]])
                for (dateKeys = 0; dateKeys < dateLength.length; dateKeys++) {
                    //console.log("Value:", value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['Status'])
                    if (value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['Status'] == 'A') {
                        absent += 1;
                    }
                    if (value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['Status'] == 'HP') {
                        halfpresent += 1;
                    }
                    if (value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['Status'] == 'P') {
                        present += 1;
                        punchIn = value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['PunchIn']
                        punchOut = value['Year2020'][monthForEmp][month[monthForEmp]][dateKeys][dateKeys + 1]['PunchOut']

                        pIN = punchIn.split(":")
                        pIN[0] = parseInt(pIN[0])
                        pIN[1] = parseInt(pIN[1])

                        pOUT = punchOut.split(":")
                        pOUT[0] = parseInt(pOUT[0])
                        pOUT[1] = parseInt(pOUT[1])

                        totalTimePunchIn = totalTimePunchIn + ((pIN[0] * 60) + pIN[1])
                        avgTimePunchIn = parseInt(totalTimePunchIn / present)
                        hourIN = (avgTimePunchIn / 60)
                        hourDecimalIN = (hourIN.toFixed(2))
                        hourPunchIN = hourDecimalIN.split(".")

                        totalTimePunchOut = totalTimePunchOut + ((pOUT[0] * 60) + pOUT[1])
                        avgTimePunchOut = parseInt(totalTimePunchOut / present)
                        hourOUT = (avgTimePunchOut / 60)
                        hourDecimalOUT = (hourOUT.toFixed(2))
                        hourPunchOut = hourDecimalOUT.split(".")

                    }

                }
                minIN = parseInt(((hourPunchIN[1]) * 60) / 100)
                minOUT = parseInt(((hourPunchOut[1]) * 60) / 100)
                if (minIN < 10)
                    minIN = "0" + minIN
                if (minOUT < 10)
                    minOUT = "0" + minOUT

                finalPunchIn = parseInt(hourPunchIN[0]) + ":" + (minIN)
                finalPunchOut = parseInt(hourPunchOut[0]) + ":" + (minOUT)


                totalPTORemaining = 22 - (absent + (halfpresent / 2))
                console.log('Absent', absent)
                console.log('Present', present)
                console.log('Half-Day', halfpresent)
                console.log('Total PTO Remaining', totalPTORemaining)
                console.log('Average punch in', finalPunchIn)
                console.log('Average punch out', finalPunchOut)
                jsonData = { 'Code': code, 'Name': name, 'PunchIn': finalPunchIn, 'PunchOut': finalPunchOut, 'Leaves': absent, 'HalfDay': halfpresent, 'PTORemaining': totalPTORemaining }
                finalData.push(jsonData)

                console.log(finalData)
                res.end(JSON.stringify(finalData))
                    //res.end(JSON.stringify({ 'Code': code, 'Name': name, 'PunchIn': finalPunchIn, 'PunchOut': finalPunchOut, 'Leaves': absent, 'HalfDay': halfpresent, 'PTORemaining': totalPTORemaining }))
            } else
                console.log(err);
        })
    } else {
        jsonData = { 'Code': '', 'Name': '', 'PunchIn': '', 'PunchOut': 'No records found!', 'Leaves': '', 'HalfDay': '', 'PTORemaining': '' }
        finalData.push(jsonData)

        res.end(JSON.stringify(finalData))
    }


})