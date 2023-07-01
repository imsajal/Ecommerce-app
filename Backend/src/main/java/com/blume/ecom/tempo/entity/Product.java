package com.blume.ecom.tempo.entity;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class Product {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Lob
	@Column(name="pic")
	private Byte[] pic;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name="price")
	private int price;
	
	
	
	public Product() {
		
	}
    
	
	public Product(Byte[] pic, String name, String description, int price) {
		this.pic = pic;
		this.name = name;
		this.description = description;
		this.price = price;
	}


	/*public Product(String name, String description, int price) {
		this.name = name;
		this.description = description;
		this.price = price;
	}*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
    
	
	public Byte[] getPic() {
		return pic;
	}


	public void setPic(Byte[] pic) {
		this.pic = pic;
	}


	@Override
	public String toString() {
		return "Product [id=" + id + ", pic=" + Arrays.toString(pic) + ", name=" + name + ", description=" + description
				+ ", price=" + price + "]";
	}
     
	



	


	
	

	/*@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price + "]";
	}*/
	
	
	
	
}
