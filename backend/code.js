let csvToJson = require('convert-csv-to-json');
let fileInputName1 = 'feb_mus.csv';
var date = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
var emp = ['Prabhakar Paliwal', 'Sadase Hanief', 'Imtiaz Hussain', 'Chhavi Jajoo', 'Sagar Rana', 'Kulbir Singh', 'Pappu Ram Kumawat', 'Himanshu Ganglani', 'Anchal Mehta', 'Anushri Agarwal', 'Shikha Kumari', 'Vipin Kumar Sati', 'Apurv Jain', 'Ravi Kumar Choudhary', 'Silpa Jha', 'Rohit Soni', 'Abhimanyu Mathur', 'Harshit Chourasiya', 'Shivam Kumar', 'Anjali Garg', 'Shashank Gehlot', 'Shubham Pansari', 'Shashank Verma', 'Shashank Garg', 'Nikita Gupta', 'Radhika Goyal', 'Juhi Kriplani', 'Muskan Goyal', 'Akshat Mathur', 'Mohd. Haris', 'Harshal Paliwal', 'Kirti Khandelwal', 'Mohit Khemchandani', 'Anjali Poddar', 'Dipanshu Bisht', 'Daulat Singh', 'Priyanshu Sharma', 'Rohsan Kumawat', 'Tushar Sharma', 'Astha Rai', 'Divya Sharma', 'Devansh Aggarwal', 'Suraj Kumar', 'Hitanshu Gupta', 'Arum Mahur', 'Shubham Tak', 'Abhishek Khandelwal', 'Harsh Rawat', 'Simarn Ahuja', 'Noopur Rathore', 'Dixita Mathur', 'Surya Teja', 'Harsh Kasodariya']
var anotherData;
var anotherData1 = [];
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "mydata"
});
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName1);
let json = csvToJson.getJsonFromCsv(fileInputName1);
for (k = 0; k < emp.length; k++) {
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

    var object = { 'Year2020': { 'January': {}, 'February': {} } };
    object.Year2020.January = anotherData1;
    object.Year2020.February = anotherData1;
    newObject = JSON.stringify(object)
    console.log("@@", name)
    console.log('//////', newObject)
    var sql = `INSERT INTO new_attendance(No,Code,Name,Value) VALUES (${no}, ${code},'${name}', '${newObject}')`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('Inserted')
    });

    //console.log(anotherData1[1]['2/2/2020'].Status)
}
//console.log(name)

newObject = JSON.parse(newObject)
    //console.log(newObject[0])
    //console.log(newObject['Year2020'].January[0]['1'].Status)