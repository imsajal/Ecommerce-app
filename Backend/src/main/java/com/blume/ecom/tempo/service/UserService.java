package com.blume.ecom.tempo.service;

import java.util.List;

import com.blume.ecom.tempo.entity.User;


public interface UserService {

	public List<User> findAll();
	
	public User findById(int theId);
	
	public void save(User theUser);
	
	public void deleteById(int theId);
	
}
