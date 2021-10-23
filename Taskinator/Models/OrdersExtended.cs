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

        //something to add in the future if necessary
        //public RobotsOrders robotOrderInfo { get; set; }
    }
}
