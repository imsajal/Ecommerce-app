package com.blume.ecom.tempo.rest;

import java.util.ArrayList;
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

import com.blume.ecom.tempo.entity.Orders;

import  com.blume.ecom.tempo.service.OrdersService;
@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class OrdersRestController {

	private OrdersService ordersService;
	
	@Autowired
	public OrdersRestController(OrdersService theOrdersService) {
		ordersService = theOrdersService;
	}
	
	
	@GetMapping("/orders")
	public List<Orders> findAll() {
		return ordersService.findAll();
	}
     
	@PostMapping("/orders/myorders")
	public List<Orders> myOrders(@RequestBody Orders theorder) {
        List<Orders> orders = ordersService.findAll();
        List<Orders> myorders=new ArrayList<Orders>();
		for (Orders temp : orders) {
            if (temp.getUsername().equals(theorder.getUsername())) {
                
                myorders.add(temp);
            }
        }
		return myorders;
	}

	
	@GetMapping("/orders/{OrderId}")
	public Orders getOrder(@PathVariable int OrderId) {
		
		Orders theOrder = ordersService.findById(OrderId);
		
		if (theOrder == null) {
			throw new RuntimeException("Order id not found - " + OrderId);
		}
		
		return theOrder;
	}
	

	
	@PostMapping("/orders")
	public Orders addOrders(@RequestBody Orders theOrders) {
		
	
		
		theOrders.setId(0);
		
		ordersService.save(theOrders);
		
		return theOrders;
	}
	
	
	
	@PostMapping("/orders/status")
	public Orders updateStatus(@RequestBody Orders theOrder) {
		
		Orders order=ordersService.findById(theOrder.getId());
		order.setStatus(theOrder.getStatus());
		ordersService.save(order);
		return order;
	}
	
	@PutMapping("/orders")
	public Orders updateOrders(@RequestBody Orders theOrders) {
		
		ordersService.save(theOrders);
		
		return theOrders;
	}
	
	
	
	@DeleteMapping("/orders/{ordersId}")
	public String deleteUser(@PathVariable int ordersId) {
		
		Orders tempOrders = ordersService.findById(ordersId);
		
		
		
		if (tempOrders == null) {
			throw new RuntimeException("Order id not found - " + ordersId);
		}
		
		ordersService.deleteById(ordersId);
		
		return "Deleted order id - " + ordersId;
	}
	
}










