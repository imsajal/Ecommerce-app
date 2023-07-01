package com.blume.ecom.tempo.test;



import java.util.ArrayList;
import java.util.Arrays;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.any;
import com.blume.ecom.tempo.entity.User;
import com.blume.ecom.tempo.rest.UserRestController;
import com.blume.ecom.tempo.service.UserService;

public class UserRestControllerTest {

	
	
	@Mock
    private UserService userService;
	
	private UserRestController userRestController;

	
	@SuppressWarnings("deprecation")
	@BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
        userRestController=new UserRestController(userService);
        ArrayList<User> users =new ArrayList<User>();
        users.add(new User("john1996","12345",
                "john","1996","123","street","city","state","pincode","phone","role"));
        users.add(new User("john1995","12345",
                "john","1996","123","street","city","state","pincode","phone","role"));
        
        Mockito.doReturn(users).when(userService).findAll();
        Mockito.doNothing().when(userService).save(any());


    }

    @Test
    public void loginTest() {
    	User user =new User();
    	user.setUsername("john1995");
    	user.setPassword("12345");
        User result=userRestController.userLogin(user);
        String username= result.getUsername();
        Assertions.assertEquals("john1995", username);
    }
    
    @Test
    public void getByUsernameTest() {
    	User user =new User();
    	user.setUsername("john1996");
        User result=userRestController.getByUsername(user);
        String username= result.getUsername();
        Assertions.assertEquals("john1996", username);
    }
    
    @Test
    public void registerUserTest() {
    	User user =new User("john1996","12345",
                "john","1996","123","street","city","state","pincode","phone","role");
        String result=userRestController.addUser(user);
       
        Assertions.assertEquals("Successfully Registered", result);
    }
   
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
