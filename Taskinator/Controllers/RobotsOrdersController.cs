﻿using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
