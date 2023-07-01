package com.blume.ecom.tempo.service;

import java.util.List;

import com.blume.ecom.tempo.entity.Orders;



public interface OrdersService {

	public List<Orders> findAll();
	
	public Orders findById(int theId);
	
	public void save(Orders theOrders);
	
	public void deleteById(int theId);
	
}
