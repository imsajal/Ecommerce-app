package com.blume.ecom.tempo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blume.ecom.tempo.dao.ProductRepository;
import com.blume.ecom.tempo.entity.Product;


@Service
public class ProductServiceImpl implements ProductService {

	private ProductRepository productRepository;
	
	@Autowired
	public ProductServiceImpl(ProductRepository theproductRepository) {
		productRepository = theproductRepository;
	}
	
	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}
    
	@Override
	public Product findById(int theId) {
		Optional<Product> result = productRepository.findById(theId);
		
		Product theProduct = null;
		
		if (result.isPresent()) {
			theProduct = result.get();
		}
		else {
		
			throw new RuntimeException("Did not find user id - " + theId);
		}
		
		return theProduct;
	}

	@Override
	public void save(Product theProduct) {
		productRepository.save(theProduct);
	
	}

	

	@Override
	public void deleteById(int theId) {
		productRepository.deleteById(theId);
	}

}






