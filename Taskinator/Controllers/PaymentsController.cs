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
    public class PaymentsController : ControllerBase
    {
        PaymentsRepository _payments;

        public PaymentsController(PaymentsRepository payments)
        {
            _payments = payments;
        }
        [HttpGet("user/{accountNumber}")]
        public IActionResult GetUserPayments(Guid accountNumber)
        {
            var payments = _payments.GetPaymentOptionsByAccount(accountNumber);
            if (payments == null || payments.Count() == 0) return NoContent();
            return Ok(payments);
        }
        [HttpGet("{id}")]
        public IActionResult GetSinglePayment(Guid id)
        {
            var payment = _payments.GetPayment(id);
            if (payment is null) return NotFound($"No payment was found with id - {id} -");
            return Ok(payment);
        }
        [HttpPost]
        public IActionResult AddPaymentToUser(Payments payment, Guid userId)
        {
            var payments = _payments.GetPaymentOptionsByAccount(userId).ToList();
            var duplicatePayments = payments.Where(p => p.PaymentType == payment.PaymentType);
            // Some logic to prevent duplicate payment types on one account
            if (duplicatePayments.Count() > 0) return BadRequest("Payment already exists");
            
            return Created($"api/[controller]/{payment.Id}", _payments.Add(payment, userId));
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUserPayment(Guid id)
        {
            var deletedPayment = _payments.Delete(id);
            return Ok(deletedPayment);
        }
    }
}
