using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taskinator.DataAccess;
using Taskinator.Models;

namespace Taskinator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrdersRepository _ordersRepo;
        UsersRepository _usersRepo;
        PaymentsRepository _paymentsRepo;

        public OrdersController(OrdersRepository ordersRepo,
                                UsersRepository userRepo,
                                PaymentsRepository paymentsRepo)
        {
            _ordersRepo = ordersRepo;
            _usersRepo = userRepo;
            _paymentsRepo = paymentsRepo;
        }

        [HttpGet]
        //Get all orders from database (admin function)
        public IActionResult GetAllOrders()
        {
            return Ok(_ordersRepo.GetAllOrders());
        }

        //Get all orders from a specific customer

        [HttpGet("/allOrders/{customerId}")]
        public IActionResult GetAllOrdersFromACustomer(Guid customerId)
        {
            return Ok(_ordersRepo.GetAllOrdersFromSpecificCustomer(customerId));
        }

        // Get a single order
        [HttpGet("/singleOrder/{orderId}")]
        public IActionResult GetSingleOrder(Guid orderId)
        {
            return Ok(_ordersRepo.GetSingleOrderFromSpecificOrderId(orderId));
        }


        // Get a cart item (Get an order that are not finalized for payment)
        [HttpGet("/cartItem/{customerId}")]
        public IActionResult GetOrderCartItem(Guid customerId)
        {
            return Ok(_ordersRepo.GetOrdersToPlaceOrderOrDelete(customerId));
        }

        // Create an order in CART
        [HttpPost]
        public IActionResult CreateOrder(CreateOrderCommand command)
        {
            var userToOrder = _usersRepo.GetUserById(command.UserId);

            if (userToOrder == null)
            {
                return NotFound("There was no matching user in the database");
            }
            // this will be added when Payment method is added from Jesse
            //if (paymentToOrder == null)
            //{
            //    return NotFound("There was no matching payment in the database");
            //}

            var order = new Orders
            {
                CustomerId = command.UserId,
                PaymentId = command.PaymentId,
                OrderTotal = command.Total
            };
            _ordersRepo.Add(order);

            return Created($"/api/orders/{order.Id}", order);
        }

        // Update order (only cart item can be updated, which is controlled by sql)
        [HttpPut("/updateOrder/{orderId}")]
        public IActionResult UpdateOrder(Guid orderId, Orders order)
        {
            var orderToUpdate = _ordersRepo.GetSingleOrderFromSpecificOrderId(orderId);

            if (orderToUpdate == null)
            {
                return NotFound($"No order with {orderId} or you have already made a payment so that you cannot update the order");
            }
            var updatedOrder = _ordersRepo.Update(orderId, order);

            return Ok(updatedOrder);
        }


        // Place an order (assing date time to order date)
        [HttpPut("/placeOrder/{orderId}")]
        public IActionResult FinalizeOrder(Guid orderId, Orders order)
        {
            var orderToUpdate = _ordersRepo.GetSingleOrderFromSpecificOrderId(orderId);
            if (orderToUpdate == null)
            {
                return NotFound($"No order with {orderId} is found or you have already placed an order");
            }
            var finalizedOrder = _ordersRepo.FinalizeOrder(orderId, order);

            return Ok(finalizedOrder);
        }

        // Delete order in CART. Controlled by sql.
        // It shows a success message with any order, but only data without orderDate can be deleted
        [HttpDelete("/deleteUnplacedOrder/{orderId}")]

        public IActionResult RemoveOrder(Guid orderId)
        {
            _ordersRepo.RemoveCartItem(orderId);
            return Ok();
        }

    }
}
