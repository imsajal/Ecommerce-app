package com.blume.ecom.tempo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blume.ecom.tempo.dao.OrdersRepository;
import com.blume.ecom.tempo.entity.Orders;


@Service
public class OrdersServiceImpl implements OrdersService {

	private OrdersRepository ordersRepository;
	
	@Autowired
	public OrdersServiceImpl(OrdersRepository theordersRepository) {
		ordersRepository = theordersRepository;
	}
	
	@Override
	public List<Orders> findAll() {
		return ordersRepository.findAll();
	}

	@Override
	public Orders findById(int theId) {
		Optional<Orders> result = ordersRepository.findById(theId);
		
		Orders theOrders = null;
		
		if (result.isPresent()) {
			theOrders = result.get();
		}
		else {
			// we didn't find the employee
			throw new RuntimeException("Did not find user id - " + theId);
		}
		
		return theOrders;
	}

	@Override
	public void save(Orders theOrders) {
		ordersRepository.save(theOrders);
	}

	

	@Override
	public void deleteById(int theId) {
		ordersRepository.deleteById(theId);
	}

}






