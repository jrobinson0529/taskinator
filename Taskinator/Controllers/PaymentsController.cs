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
    public class PaymentsController : ControllerBase
    {
        PaymentsRepository _payments;

        public PaymentsController(PaymentsRepository payments)
        {
            _payments = payments;
        }
        [HttpGet]
        public IActionResult GetUserPayments(Guid accountNumber)
        {
            var payments = _payments.GetPayments(accountNumber);
            return Ok(payments);
        }
    }
}
