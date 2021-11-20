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
    [ApiController]
    public class RobotsController : ControllerBase
    {
        RobotsRepository _robotsRepo;
        public RobotsController(RobotsRepository robotsRepo)
        {
            _robotsRepo = robotsRepo;
        }

        // Get all the robots from the database
        [HttpGet]
        public IActionResult GetAllRobots()
        {
            var robots = _robotsRepo.GetAll();
            return Ok(robots);
        }
        [Authorize]
        [HttpGet("all")]
        public IActionResult GetAllRobotsAlphabetically()
        {
            var robots = _robotsRepo.GetAllAlphabetically();
            return Ok(robots);
        }
        // Get all the robots from the database
        [HttpGet("unavailable")]
        public IActionResult GetAllRobotsUnavailable()
        {
            var robots = _robotsRepo.GetAllUnavailable();
            return Ok(robots);
        }

        // Get a single robot
        [HttpGet("{id}")]
        public IActionResult GetSingleRobot(Guid id)
        {
            var robot = _robotsRepo.GetRobotById(id);

            if (robot is null) return NotFound($"No robot with id - {id} exists in the database");

            return Ok(robot);
        }
        [HttpGet("connections/{id}")]
        public IActionResult GetRobotConnections(Guid id)
        {
            var connections = _robotsRepo.GetConnections(id);

         

            return Ok(connections);
        }
        // Return 12 random robots
        [HttpGet("random")]
        public IActionResult GetTwelveRobots()
        {
            var robots = _robotsRepo.GetRandom();
            return Ok(robots);
        }
        // Get robots by category
        [HttpGet("{categoryId}/robots")]
        public IActionResult GetRobotsByCategory(Guid categoryId)
        {
            var robot = _robotsRepo.GetRobotsByCategoryId(categoryId);

            if (robot is null) return Ok(null);

            return Ok(robot);
        }

        // Add a single robot
        [HttpPost]
        public IActionResult AddSingleRobot(Robots robot)
        {
            _robotsRepo.Add(robot);
            return Created($"/robots/{robot.Id}", robot);
        }

        // Update a robot
        [HttpPut("{id}")]
        public IActionResult UpdateRobot(Guid id, Robots robot)
        {
            var robotToUpdate = _robotsRepo.GetRobotById(id);
            if (robotToUpdate is null) return NotFound($"No robot with id - {id} exists in the database");

            var updatedRobot = _robotsRepo.Update(id, robot);
            return Ok(updatedRobot);
        }

        // Soft Delete a robot
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteSingleRobot(Guid id)
        {
            var robotToRemove = _robotsRepo.GetRobotById(id);
            if (robotToRemove is null) return NotFound($"No robot with id - {id} exists in the database");

            return Ok(_robotsRepo.RemoveRobot(id));
        }
    }
}
