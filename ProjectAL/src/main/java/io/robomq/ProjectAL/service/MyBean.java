package io.robomq.ProjectAL.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Calendar;
import java.util.Formatter;
import java.util.List;
import java.util.TimeZone;

import org.json.simple.parser.JSONParser;
import org.springframework.scheduling.annotation.Scheduled;

import com.andrewthom.microsoft.teams.api.MicrosoftTeams;
import com.andrewthom.microsoft.teams.api.Webhook;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.exceptions.UnirestException;

import io.robomq.ProjectAL.AbsenceData;
import io.robomq.ProjectAL.EmpMonth;
import io.robomq.ProjectAL.EmployeeData;

public class MyBean {
	Connection con;
	String message;
	Statement stat;
	ResultSet res;
	int emp;
	String[] employee = { "Prabhakar Paliwal", "Sadase Hanief", "Imtiaz Hussain", "Chhavi Jajoo", "Sagar Rana",
			"Kulbir Singh", "Pappu Ram Kumawat", "Himanshu Ganglani", "Anchal Mehta", "Anushri Agarwal",
			"Shikha Kumari", "Vipin Kumar Sati", "Apurv Jain", "Ravi Kumar Choudhary", "Silpa Jha", "Rohit Soni",
			"Abhimanyu Mathur", "Harshit Chourasiya", "Shivam Kumar", "Anjali Garg", "Shashank Gehlot",
			"Shubham Pansari", "Shashank Verma", "Shashank Garg", "Nikita Gupta", "Radhika Goyal", "Juhi Kriplani",
			"Muskan Goyal", "Akshat Mathur", "Mohd. Haris", "Harshal Paliwal", "Kirti Khandelwal", "Mohit Khemchandani",
			"Anjali Poddar", "Dipanshu Bisht", "Daulat Singh", "Priyanshu Sharma", "Rohsan Kumawat", "Tushar Sharma",
			"Astha Rai", "Divya Sharma", "Devansh Aggarwal", "Suraj Kumar", "Hitanshu Gupta", "Arum Mahur",
			"Shubham Tak", "Abhishek Khandelwal", "Harsh Rawat", "Simarn Ahuja", "Noopur Rathore", "Dixita Mathur",
			"Surya Teja", "Harsh Kasodariya" };

	public MyBean() {
		try {

			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydata", "root", "Success$132");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Scheduled(cron = "0 05 12 * * ?")
	public void getData() {
		try {
			// Creates query object for database connected through con object
			stat = con.createStatement();
			// Executes SQL Select Query and returns data as ResultSet Object
			res = stat.executeQuery("select * from mydata.new_attendance");
			JSONParser parser = new JSONParser();

			while (res.next()) {
				message = res.getString("Name");
				String str = (String) res.getObject("Value");

				JsonObject jsonObject = new Gson().fromJson(str, JsonObject.class);
				setUp(jsonObject);
			}
		} catch (Exception e) {

			e.printStackTrace();
		}

	}

	private void setUp(JsonObject jsonObject) throws UnirestException, IOException {

		Calendar calendar = Calendar.getInstance(TimeZone.getDefault());
		String day = "" + calendar.get(Calendar.DATE);
		String year = "Year" + calendar.get(Calendar.YEAR);
		Formatter fmt = new Formatter();
		String month = fmt.format("%tB", calendar).toString();
		//System.out.println("Hello test " + jsonObject.has(year));

		if (jsonObject.has(year)) {
			JsonArray jsonElemMonth = jsonObject.get("Year2020").getAsJsonArray();
			for (int i = 0; i < jsonElemMonth.size(); i++) {
				JsonObject jsonMonthObject = jsonElemMonth.get(i).getAsJsonObject();
				if (jsonMonthObject.has(month)) {
					JsonArray jsonMonthArray = jsonMonthObject.get(month).getAsJsonArray();
					//System.out.println("once again" + jsonMonthArray);
					for (int j = 0; j < jsonMonthArray.size(); j++) {
						JsonObject jsonStatus = jsonMonthArray.get(j).getAsJsonObject();
						//System.out.println("anything" + jsonStatus);
						if (jsonStatus.has(day)) {
							// System.out.println("mesaage "+jsonStatus);

							message = message + jsonStatus.toString();
							// System.out.println("TEST message"+message);
						}
					}
				}
			}
		}

		MicrosoftTeams.forUrl(new Webhook() {
			public String getUrl() {
				return "https://outlook.office.com/webhook/be8962d4-1556-4688-afc2-73b9972ceb88@5cd004ac-6552-40dd-8213-33766dc0b059/IncomingWebhook/e4df937e87864e0b8d731f8b03fd14ab/c6f287b9-ae50-41d1-ad83-0c17980c5629";
			}
		}).sendMessage(message);
	}

}
