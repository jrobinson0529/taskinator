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
        OrdersRepository _ordersRepository;

        public OrdersController(OrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }


        [HttpGet]
        //Get all orders from database (admin function?)
        public IActionResult GetAllOrders()
        {
            return Ok(_ordersRepository.GetAllOrders());
        }

        //Get all orders from a specific customer

        [HttpGet("/allOrders/{id}")]
        public IActionResult GetAllOrdersFromACustomer(Guid id)
        {
            return Ok(_ordersRepository.GetAllOrdersFromSpecificCustomer(id));
        }

        // Get a single order
        [HttpGet("/singleOrders/{orderId}")]
        public IActionResult GetSingleOrderFromCustomer(Guid orderId)
        {
            return Ok(_ordersRepository.GetSingleOrderFromSpecificCustomer(orderId));
        }
        
    }
}
