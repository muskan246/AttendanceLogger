let csvToJson = require('convert-csv-to-json');
let fileInputName1 = 'feb_march.csv';
var date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
var emp = ['Prabhakar Paliwal', 'Sadase Hanief', 'Imtiaz Hussain', 'Chhavi Jajoo', 'Sagar Rana', 'Kulbir Singh', 'Pappu Ram Kumawat', 'Himanshu Ganglani', 'Anchal Mehta', 'Anushri Agarwal', 'Shikha Kumari', 'Vipin Kumar Sati', 'Apurv Jain', 'Ravi Kumar Choudhary', 'Silpa Jha', 'Rohit Soni', 'Abhimanyu Mathur', 'Harshit Chourasiya', 'Shivam Kumar', 'Anjali Garg', 'Shashank Gehlot', 'Shubham Pansari', 'Shashank Verma', 'Shashank Garg', 'Nikita Gupta', 'Radhika Goyal', 'Juhi Kriplani', 'Muskan Goyal', 'Akshat Mathur', 'Mohd. Haris', 'Harshal Paliwal', 'Kirti Khandelwal', 'Mohit Khemchandani', 'Anjali Poddar', 'Dipanshu Bisht', 'Daulat Singh', 'Priyanshu Sharma', 'Rohsan Kumawat', 'Tushar Sharma', 'Astha Rai', 'Divya Sharma', 'Devansh Aggarwal', 'Suraj Kumar', 'Hitanshu Gupta', 'Arum Mahur', 'Shubham Tak', 'Abhishek Khandelwal', 'Harsh Rawat', 'Simarn Ahuja', 'Noopur Rathore', 'Dixita Mathur', 'Surya Teja', 'Harsh Kasodariya']
var mysql = require('mysql');
var anotherData;
var anotherData1 = [];
var sqlData;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "mydata"
});
csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName1);
let json = csvToJson.getJsonFromCsv(fileInputName1);

var sql1 = `SELECT VALUE FROM new_attendance`
con.query(sql1, function(err, result) {
    if (err) throw err;
    console.log('SELECTED')
        //console.log(result)

    for (k = 0; k < emp.length; k++) {
        sqlData = JSON.parse(result[k].VALUE)
            //console.log("////", sqlData)
        anotherData1 = []
        anotherData = {}
        for (var i = 0; i < json.length; i++) {
            for (var j = 0; j < date.length; j++) {
                if (json[i].Date == date[j] && json[i].EmployeeName === emp[k]) {
                    no = json[i].No
                    name = json[i].EmployeeName
                    code = json[i].EmployeeCode
                    anotherData = {
                        [json[i].Date]: {
                            Status: json[i].Status,
                            PunchIn: json[i].PunchIn,
                            PunchOut: json[i].PunchOut
                        }
                    };
                    anotherData1.push(anotherData)

                }
            }
        }
        anotherData2 = { 'March': anotherData1 }
        sqlData.Year2020.push(anotherData2)
        newsqlData = JSON.stringify(sqlData)
        console.log(newsqlData)
        var sql = `UPDATE new_attendance SET No = ${no}, Name = '${name}',Value = '${newsqlData}' WHERE Code = ${code}`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log('Updated successfully')
        });

    }

});