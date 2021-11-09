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
    public class UsersController : ControllerBase
    {

        UsersRepository _usersRepo;
        public UsersController(UsersRepository usersRepo)
        {
            _usersRepo = usersRepo;
        }

        // Get all the users from the database
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_usersRepo.GetAll());
        }
        [HttpGet("deleted")]
        public IActionResult GetAllDeletedUsers()
        {
            return Ok(_usersRepo.GetAllDeleted());
        }
        // Get a single user by the user guid
        [HttpGet("{id}")]
        public IActionResult GetSingleUser(Guid id)
        {
            var user = _usersRepo.GetUserById(id);

            if (user is null) return NotFound($"No user with id - {id} exists in the database");

            return Ok(user);
        }
        [HttpGet("uid/{id}")]
        public IActionResult GetSingleUserByGoogleId(string id)
        {
            var user = _usersRepo.GetUserByGoogleId(id);

            if (user is null) return Ok(null);

            return Ok(user);
        }
        [HttpGet("expanded/{id}")]
        public IActionResult GetUserExpanded(Guid id)
        {
            var expandedUser = _usersRepo.GetExpanded(id);
            if (expandedUser is null) return NotFound($"No user with id - {id} exists in the database");
            return Ok(expandedUser);
        }
        // Add a single user
        [HttpPost]
        public IActionResult AddSingleUser(Users user)
        {
            // We potentially want to add checks here to make sure the relevant user information is filled out such as
            if (string.IsNullOrEmpty(user.Email)) return BadRequest("User must have an email to register");

            _usersRepo.Add(user);
            return Created($"/users/{user.Id}", user);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateUser(Guid id, Users user)
        {
            var userToUpdate = _usersRepo.GetUserById(id);
            if (userToUpdate is null) return NotFound($"No user with id - {id} exists in the database");

            var updatedUser = _usersRepo.Update(id, user);
            return Ok(updatedUser);
        }

        [HttpPut("remove/{id}")]
        public IActionResult RemoveSingleUser(Guid id, Users user)
        {
            var userToRemove = _usersRepo.GetUserById(id);
            if (userToRemove is null) return NotFound($"No user with id - {id} exists in the database");

            var removedUser = _usersRepo.RemoveUser(id, userToRemove);
            return Ok(removedUser);
        }
    }
}
