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
    public class RobotsController : ControllerBase
    {
        RobotsRepository _robotsRepo;
        public RobotsController(RobotsRepository robotsRepo)
        {
            _robotsRepo = robotsRepo;
        }
        [HttpGet]
        public IActionResult GetAllRobots()
        {
            var robots = _robotsRepo.GetAll();
            return Ok(robots);
        }
    }
}
