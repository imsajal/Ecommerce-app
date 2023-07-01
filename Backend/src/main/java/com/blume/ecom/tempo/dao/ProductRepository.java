package com.blume.ecom.tempo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blume.ecom.tempo.entity.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {


	
}

