var http = require("http");
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var cors = require('cors')
var date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
var emp = ['Prabhakar Paliwal', 'Sadase Hanief', 'Imtiaz Hussain', 'Chhavi Jajoo', 'Sagar Rana', 'Kulbir Singh', 'Pappu Ram Kumawat', 'Himanshu Ganglani', 'Anchal Mehta', 'Anushri Agarwal', 'Shikha Kumari', 'Vipin Kumar Sati', 'Apurv Jain', 'Ravi Kumar Choudhary', 'Silpa Jha', 'Rohit Soni', 'Abhimanyu Mathur', 'Harshit Chourasiya', 'Shivam Kumar', 'Anjali Garg', 'Shashank Gehlot', 'Shubham Pansari', 'Shashank Verma', 'Shashank Garg', 'Nikita Gupta', 'Radhika Goyal', 'Juhi Kriplani', 'Muskan Goyal', 'Akshat Mathur', 'Mohd. Haris', 'Harshal Paliwal', 'Kirti Khandelwal', 'Mohit Khemchandani', 'Anjali Poddar', 'Dipanshu Bisht', 'Daulat Singh', 'Priyanshu Sharma', 'Rohsan Kumawat', 'Tushar Sharma', 'Astha Rai', 'Divya Sharma', 'Devansh Aggarwal', 'Suraj Kumar', 'Hitanshu Gupta', 'Arum Mahur', 'Shubham Tak', 'Abhishek Khandelwal', 'Harsh Rawat', 'Simarn Ahuja', 'Noopur Rathore', 'Dixita Mathur', 'Surya Teja', 'Harsh Kasodariya']

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
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

var sqlPieDate = `SELECT VALUE FROM new_attendance`
mysqlConnection.query(sqlPieDate, function(err, result) {
    if (err) throw err;
    console.log('SELECTED')
    console.log(result)
    for (k = 0; k < emp.length; k++) {
        sqlData = JSON.parse(result[k].VALUE)
    }
});