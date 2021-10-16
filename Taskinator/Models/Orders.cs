using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class Orders
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public Guid PaymentId { get; set; }
        public decimal OrderTotal { get; set; }
        public DateTime OrderDate { get; set; } 
    }
}
