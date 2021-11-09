using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [ApiController]
    public class RobotsOrdersController : ControllerBase
    {
        RobotsOrdersRepository _robotsOrdersRepo;

        public RobotsOrdersController(RobotsOrdersRepository robotsOrdersRepo, OrdersRepository ordersRepo)
        {
            _robotsOrdersRepo = robotsOrdersRepo;
        }

        // gets all the robot orders
        [HttpGet]
        public IActionResult GetAllRobotsOrders()
        {
            var robotsOrders = _robotsOrdersRepo.GetAll();

            return Ok(robotsOrders);
        }

        // gets a single robot order by its specific id
        [HttpGet("getSingleRobotOrderById/{id}")]
        public IActionResult GetSingleRobotsOrdersById(Guid id)
        {
            var robotsOrders = _robotsOrdersRepo.GetBySingleRobotOrderId(id);
            if (robotsOrders == null)
            {
                return NotFound($"No robot order with the id '{id}' was found.");
            }

            return Ok(robotsOrders);
        }

        // gets a robot order or orders by its order id
        [HttpGet("getRobotOrderByOrderId/{orderId}")]
        public IActionResult GetRobotsOrdersByOrderId(Guid orderId)
        {
            var robotsOrders = _robotsOrdersRepo.GetByOrderId(orderId);
            if (robotsOrders == null)
            {
                return NotFound($"No robot order with the order id '{orderId}' was found.");
            }

            return Ok(robotsOrders);
        }

        // creates a new robot order
        [HttpPost]
        public IActionResult AddRobotOrder(RobotsOrders robotOrder)
        {
            _robotsOrdersRepo.Add(robotOrder);
            return Created($"/robotsOrders/{robotOrder.Id}", robotOrder);
        }

        // deletes a robot order by its id
        [HttpDelete("deleteSingleRobotOrderById/{id}")]
        public IActionResult DeleteSingleRobotOrder(Guid id)
        {
            var robotOrderToRemove = _robotsOrdersRepo.GetBySingleRobotOrderId(id);

            if (robotOrderToRemove is null) return NotFound($"No robot order with id '{id}' has been found.");
            _robotsOrdersRepo.RemoveRobotOrder(id);

            return Ok($"Robot order number '{id}' has been deleted.");
        }

        // update robot order day quantity by id
        [HttpPut("updateRobotOrder/{id}")]
        public IActionResult UpdateRobotOrderDayQuantity(Guid id, RobotsOrders robotOrder)
        {
            var robotOrderToUpdate = _robotsOrdersRepo.GetBySingleRobotOrderId(id);

            if (robotOrderToUpdate is null) return NotFound($"No robot order with id '{id}' has been found.");
            var updatedRobotOrder = _robotsOrdersRepo.Update(id, robotOrder);

            return Ok(updatedRobotOrder);
        }
    }
}
