package com.blume.ecom.tempo.service;

import java.util.List;

import com.blume.ecom.tempo.entity.Product;



public interface ProductService {

	public List<Product> findAll();
	
	public Product findById(int theId);
	
	public void save(Product theProduct);
	
	public void deleteById(int theId);
	
}
