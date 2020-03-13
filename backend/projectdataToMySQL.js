const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("Monthly_BasicReport_Feb.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvData.push(data);
    })
    .on("end", function() {
        // remove the first line: header
        csvData.shift();

        // create a new connection to the database
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Root@123",
            database: "mydata"
        });

        // open the connection
        connection.connect(error => {
            if (error) {
                console.error(error);
            } else {
                let query =
                    "INSERT INTO feb_report (No,EmployeeCode,EmployeeName,01Feb,02Feb,03Feb,04Feb,05Feb,06Feb,07Feb,08Feb,09Feb,10Feb,11Feb,12Feb,13Feb,14Feb,15Feb,16Feb,17Feb,18Feb,19Feb,20Feb,21Feb,22Feb,23Feb,24Feb,25Feb,26Feb,27Feb,28Feb) VALUES ?";
                connection.query(query, [csvData], (error, response) => {
                    console.log(error || response);
                });
            }
        });
    });

stream.pipe(csvStream);