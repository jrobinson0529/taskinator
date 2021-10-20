using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class CreateOrderCommand
    {
        public Guid UserId { get; set; }
        public Guid PaymentId { get; set; }
        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; }
    }

}
