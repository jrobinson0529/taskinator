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
    }
}
