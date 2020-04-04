package io.robomq.ProjectAL;



import java.io.IOException;
import java.util.Calendar;
import java.util.Formatter;
import java.util.List;
import java.util.TimeZone;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import com.andrewthom.microsoft.teams.api.MicrosoftTeams;
import com.andrewthom.microsoft.teams.api.Webhook;
import com.mashape.unirest.http.exceptions.UnirestException;

import io.robomq.ProjectAL.service.AppConfig;

/**
 * Hello world!
 *
 */
public class App 
{
		
    public static void main( String[] args ) throws IOException, UnirestException {
    	AbstractApplicationContext  context = new AnnotationConfigApplicationContext(AppConfig.class);
    	
//        System.out.println( "Hello World!" );
      
    }

   
}