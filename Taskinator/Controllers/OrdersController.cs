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
        //Get all orders from database (admin function?)
        public IActionResult GetAllOrders()
        {
            return Ok(_ordersRepo.GetAllOrders());
        }

        //Get all orders from a specific customer

        [HttpGet("/allOrders/{customerId}")]
        public IActionResult GetAllOrdersFromACustomer(Guid id)
        {
            return Ok(_ordersRepo.GetAllOrdersFromSpecificCustomer(id));
        }

        // Get a single order
        [HttpGet("/singleOrder/{orderId}")]
        public IActionResult GetSingleOrderFromCustomer(Guid orderId)
        {
            return Ok(_ordersRepo.GetSingleOrderFromSpecificCustomer(orderId));
        }


        // Get a cart item (Get an order that are not finalized for payment)
        [HttpGet("/cartItem/{customerId}")]
        public IActionResult GetOrderCartItem(Guid id)
        {
            return Ok(_ordersRepo.GetOrdersToPlaceOrderOrDelete(id));
        }

        // Create an order (in cart)
        [HttpPost]
        public IActionResult CreateOrder(CreateOrderCommand command)
        {
            var userToOrder = _usersRepo.GetUserById(command.UserId);

            if (userToOrder == null)
            {
                return NotFound("There was no matching user in the database");
            }
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

        // Update order

        // Place an order (assing date time to order date)

        // Delete order (that is not placed yet)
        [HttpDelete("/deleteUnplacedOrder/{orderId}")]

        public IActionResult RemoveOrder(Guid orderId)
        {
            _ordersRepo.RemoveCartItem(orderId);
        }

    }
}
