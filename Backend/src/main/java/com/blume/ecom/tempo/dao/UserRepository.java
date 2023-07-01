package com.blume.ecom.tempo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blume.ecom.tempo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {


	
}

