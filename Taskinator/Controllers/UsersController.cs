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
    public class UsersController : ControllerBase
    {

        UsersRepository _usersRepo;

        public UsersController(UsersRepository usersRepo)
        {
            _usersRepo = usersRepo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_usersRepo.GetAll());
        }
    }
}
