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

        [HttpGet("allOrders/{customerId}")]
        public IActionResult GetAllOrdersFromACustomer(Guid customerId)
        {
            var orders = _ordersRepo.GetAllOrdersFromSpecificCustomer(customerId);
            if (orders.ToList().Count == 0)
            {
                return NotFound($"No order found with {customerId} or the ID is incorrect.");
            }
            return Ok(orders);
        }

        ////Get user and payment info from orderId (add robots info in the future if necessary)
        [HttpGet("detailedOrderInfo/{orderId}")]
        public IActionResult GetDetailedOrderInfo(Guid orderId)
        {
            var order = _ordersRepo.GetDetailedOrder(orderId);
            if (order is null)
            {
                return NotFound($"No order found with {orderId} or the ID is incorrect.");
            }
            return Ok(order);
        }

        // Get subtotal
        [HttpGet("subTotal/{orderId}")]
        public IActionResult GetTotal(Guid orderId)
        {
            var total = _ordersRepo.GetSubTotal(orderId);
            return Ok(total);
        }

        //Get expanded order
        [HttpGet("expandedOrder/{orderId}")]
        public IActionResult GetExpanded(Guid orderId)
        {
            var expandedOrder = _ordersRepo.GetOrderExpanded(orderId);
            return Ok(expandedOrder);
        }

        //Get a single order
        [HttpGet("singleOrder/{orderId}")]
        public IActionResult GetSingleOrder(Guid orderId)
        {
            var order = _ordersRepo.GetSingleOrderFromSpecificOrderId(orderId);
            if (order.ToList().Count == 0)
            {
                return NotFound($"No order found with {orderId} or the ID is incorrect.");
            }
            return Ok(order);
        }


        // Get a cart item (Get an order that are not finalized for payment)
        [HttpGet("cartItem/{customerId}")]
        public IActionResult GetOrderCartItem(Guid customerId)
        {
            var order = _ordersRepo.GetOrdersToPlaceOrderOrDelete(customerId);
            return Ok(order);
        }

        // Create an order in CART
        [HttpPost]
        public IActionResult CreateOrder(CreateOrderCommand command)
        {
            var userToOrder = _usersRepo.GetUserById(command.UserId);
            var paymentToOrder = _paymentsRepo.GetPayment(command.PaymentId);

            if (userToOrder == null)
            {
                return NotFound("There was no matching user in the database");
            }
           
            if (paymentToOrder == null)
            {
                return NotFound("There was no matching payment in the database");
            }

            var order = new Orders
            {
                CustomerId = command.UserId,
                PaymentId = command.PaymentId,
                OrderTotal = command.Total
            };
            _ordersRepo.Add(order);

            return Created($"orders/{order.Id}", order);
        }

        // Update order (only cart item can be updated)
        // Sql does not update items with OrderDate even though success message shows.
        [HttpPut("updateOrder/{orderId}")]
        public IActionResult UpdateOrder(Guid orderId, Orders order)
        {
            var updatedOrder = _ordersRepo.Update(orderId, order);
            return Ok(updatedOrder);
        }

        // Place an order (passing date time to order date)
        // Sql does not update items with OrderDate even though success message shows.
        [HttpPut("placeOrder/{orderId}")]
        public IActionResult FinalizeOrder(Guid orderId, Orders order)
        {
            var finalizedOrder = _ordersRepo.FinalizeOrder(orderId, order);
            return Ok(finalizedOrder);
        }

        // Delete order in CART. 
        // Sql does not update items with OrderDate even though success message shows.
        [HttpDelete("deleteUnplacedOrder/{orderId}")]
        public IActionResult RemoveOrder(Guid orderId)
        {
            _ordersRepo.RemoveCartItem(orderId);
            return Ok();
        }
    }
}
