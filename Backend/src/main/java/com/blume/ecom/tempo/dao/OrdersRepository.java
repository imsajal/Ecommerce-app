package com.blume.ecom.tempo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blume.ecom.tempo.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

	
	
}
