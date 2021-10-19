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
    public class RobotsOrdersController : ControllerBase
    {
        RobotsOrdersRepository _robotsOrdersRepo;

        public RobotsOrdersController(RobotsOrdersRepository robotsOrdersRepo)
        {
            _robotsOrdersRepo = robotsOrdersRepo;
        }

        [HttpGet]
        public IActionResult GetAllRobotsOrders()
        {
            var robotsOrders = _robotsOrdersRepo.GetAll();

            return Ok(robotsOrders);
        }

        [HttpGet("getSingleRobotOrderById/{id}")]
        public IActionResult GetSingleRobotsOrdersById(Guid id)
        {
            var robotsOrders = _robotsOrdersRepo.GetBySingleRobotsId(id);
            if (robotsOrders == null)
            {
                return NotFound($"No robot order with the id '{id}' was found.");
            }

            return Ok(robotsOrders);
        }

        [HttpGet("getSingleRobotOrderByOrderId/{orderId}")]
        public IActionResult GetSingleRobotsOrdersByOrderId(Guid orderId)
        {
            var robotsOrders = _robotsOrdersRepo.GetByOrderId(orderId);
            if (robotsOrders == null)
            {
                return NotFound($"No robot order with the order id '{orderId}' was found.");
            }

            return Ok(robotsOrders);
        }

        [HttpPost]
        public IActionResult AddRobotOrder(RobotsOrders robotOrder)
        {
            _robotsOrdersRepo.Add(robotOrder);
            return Created($"/robotsOrders/{robotOrder.Id}", robotOrder);
        }

        [HttpDelete("deleteSingleRobotOrderById/{id}")]
        public IActionResult DeleteSingleRobotOrder(Guid id)
        {
            _robotsOrdersRepo.Remove(id);

            return Ok($"Robot order number '{id}' has been deleted.");
        }
    }
}
