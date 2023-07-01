package com.blume.ecom.tempo.rest;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blume.ecom.tempo.entity.User;
import  com.blume.ecom.tempo.service.UserService;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class UserRestController {

	private UserService userService;
	
	@Autowired
	public UserRestController(UserService theUserService) {
		userService = theUserService;
	}
	

	@GetMapping("/users")
	public List<User> findAll() {
		return userService.findAll();
	}

	@PostMapping("/users/login")
	public User userLogin(@RequestBody User theUser) {
		List<User> users = userService.findAll();
		
		for (User temp : users) {
            if (temp.getUsername().equals(theUser.getUsername()) && temp.getPassword().equals(theUser.getPassword())) {
                
                return temp;
            }
        }
		throw new RuntimeException();
	}
	
	@PostMapping("/users/getbyusername")
	public User getByUsername(@RequestBody User theUser) {
		List<User> users = userService.findAll();
		
		for (User temp : users) {
            if (temp.getUsername().equals(theUser.getUsername())) {
                
                return temp;
            }
        }
		throw new RuntimeException();
	}

	
	
	

	
	@GetMapping("/users/{userId}")
	public User getUser(@PathVariable int userId) {
		
		User theUser = userService.findById(userId);
		
		if (theUser == null) {
			throw new RuntimeException("user id not found - " + userId);
		}
		
		return theUser;
	}
	

	
	@PostMapping("/users")
	public String addUser(@RequestBody User theUser ){
		
	
		
		theUser.setId(0);
		
		userService.save(theUser);
		
		return "Successfully Registered";
		
	}
	
	
	
	@PutMapping("/users")
	public User updateUser(@RequestBody User theUser) {
		
		userService.save(theUser);
		
		return theUser;
	}
	

	
	@DeleteMapping("/users/{userId}")
	public String deleteUser(@PathVariable int userId) {
		
		User tempUser = userService.findById(userId);
		

		
		if (tempUser == null) {
			throw new RuntimeException("user id not found - " + userId);
		}
		
		userService.deleteById(userId);
		
		return "Deleted user id - " + userId;
	}
	
}










