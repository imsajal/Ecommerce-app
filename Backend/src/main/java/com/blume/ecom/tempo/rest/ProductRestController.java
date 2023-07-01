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

import com.blume.ecom.tempo.entity.Product;

import  com.blume.ecom.tempo.service.ProductService;
@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class ProductRestController {

	private ProductService productService;
	
	@Autowired
	public ProductRestController(ProductService theProductService) {
		productService = theProductService;
	}
	
	
	@GetMapping("/products")
	public List<Product> findAll() {
		return productService.findAll();
	}

	

	
 
	
	@GetMapping("/products/{productId}")
	public Product getProduct(@PathVariable int productId) {
		
		Product theProduct = productService.findById(productId);
		
		if (theProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}
		
		return theProduct;
	}
	

	

	
	@PostMapping("/products")
	public Product addProduct(@RequestParam("pic") MultipartFile pic, @RequestParam("name") String name,@RequestParam("description") String description,@RequestParam("price") int price) throws IOException {
		
	
		Byte[] byteobj = new Byte[pic.getBytes().length];
		int i=0;
		for(byte b: pic.getBytes()) {
			byteobj[i++]=b;
		}
		
		Product theProduct= new Product(byteobj,name,description,price);
		productService.save(theProduct);
		
		return theProduct;
		
	}
	

	
	@PutMapping("/products")
	public Product updateProduct(@RequestBody Product theProduct) {
		
		productService.save(theProduct);
		
		return theProduct;
	}
	

	
	@DeleteMapping("/products/{productId}")
	public String deleteProduct(@PathVariable int productId) {
		
		Product tempProduct = productService.findById(productId);
		
	
		
		if (tempProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}
		
		productService.deleteById(productId);
		
		return "Deleted product id - " + productId;
	}
	
}










