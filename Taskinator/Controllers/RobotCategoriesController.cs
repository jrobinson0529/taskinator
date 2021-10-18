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
    public class RobotCategoriesController : ControllerBase
    {

        RobotCategoriesRepository _categoriesRepo;

        public RobotCategoriesController(RobotCategoriesRepository categoriesRepo)
        {
            _categoriesRepo = categoriesRepo;
        }
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _categoriesRepo.GetAll();
            return Ok(categories);
        }
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(Guid id)
        {
            var category = _categoriesRepo.GetSingleCategory(id);
            if (category is null) return NotFound($"A category with id - {id} - was not found");
            return Ok(category);
        }
    }
}
