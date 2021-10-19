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

        // Get all the robots from the database
        [HttpGet("unavailable")]
        public IActionResult GetAllRobotsUnavailable()
        {
            var robots = _robotsRepo.GetAllUnavailable();
            return Ok(robots);
        }

        // Get a single robot
        [HttpGet("robots/{id}")]
        public IActionResult GetSingleRobot(Guid id)
        {
            var robot = _robotsRepo.GetRobotById(id);

            if (robot is null) return NotFound($"No robot with id - {id} exists in the database");

            return Ok(robot);
        }

        // Get robots by category
        [HttpGet("{categoryId}/robots")]
        public IActionResult GetRobotsByCategory(Guid categoryId)
        {
            var robot = _robotsRepo.GetRobotsByCategoryId(categoryId);

            if (robot is null) return NotFound($"No robot with categoryId - {categoryId} exists in the database");

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
        [HttpPut("remove/{id}")]
        public IActionResult RemoveSingleRobot(Guid id, Robots robot)
        {
            var robotToRemove = _robotsRepo.GetRobotById(id);
            if (robotToRemove is null) return NotFound($"No robot with id - {id} exists in the database");

            var removedRobot = _robotsRepo.RemoveRobot(id, robotToRemove);
            return Ok(removedRobot);
        }
    }
}
