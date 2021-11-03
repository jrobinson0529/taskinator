using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class OrdersExtended : Orders
    {
        public Users customerInfo { get; set; }
        public Payments paymentInfo { get; set; }

        public RobotsOrders robotOrderInfo { get; set; }

        public Robots robotInfo { get; set; }
    }
}
