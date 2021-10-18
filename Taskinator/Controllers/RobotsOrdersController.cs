using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taskinator.DataAccess;

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

        [HttpGet("{id}")]
        public IActionResult GetRobotsOrdersById(Guid id)
        {
            var robotsOrders = _robotsOrdersRepo.GetByOrderId(id);

            if (robotsOrders == null)
            {
                return NotFound($"No robot order with the id '{id}' was found.");
            }
            return Ok(robotsOrders);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRobotsOrders(Guid id)
        {
            _robotsOrdersRepo.Remove(id);
            return Ok($"Robot order number '{id}' has been deleted.");
        }
    }
}
