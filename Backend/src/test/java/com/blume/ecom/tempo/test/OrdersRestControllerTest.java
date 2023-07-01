package com.blume.ecom.tempo.test;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.any;
import com.blume.ecom.tempo.entity.Orders;
import com.blume.ecom.tempo.rest.OrdersRestController;
import com.blume.ecom.tempo.service.OrdersService;
import static org.mockito.ArgumentMatchers.anyInt;


public class OrdersRestControllerTest {

	
	
	@Autowired
    private OrdersService ordersService;
	
	private OrdersRestController ordersRestController;

	
	@SuppressWarnings("deprecation")
	@BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
        ordersRestController=new OrdersRestController(ordersService);
        
        Orders order1 = new Orders("john1996",7,3,"placed");
        Orders order2 = new Orders("john1996",9,5,"cancelled");
        ArrayList<Orders> orders =new ArrayList<Orders>();
        orders.add(order2);
        orders.add(order1);
        order1.setId(1);
        Mockito.doReturn(orders).when(ordersService).findAll();
        Mockito.doReturn(order1).when(ordersService).findById(anyInt());
  


    }

    @Test
    public void myOrdersTest() {
    	Orders order1 = new Orders("john1996",7,3,"placed");
    	 List<Orders> userOrders=ordersRestController.myOrders(order1);

        Assertions.assertEquals("cancelled", userOrders.get(0).getStatus());
    }
    
    @Test
    public void getOrderTest() {
    	
    	 Orders order=ordersRestController.getOrder(1);

        Assertions.assertEquals(3, order.getQuantity() );
    }
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
