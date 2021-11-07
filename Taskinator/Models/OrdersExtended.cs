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

        public RobotsOrders robotOrder { get; set; }
        public Robots robotsInformation { get; set; }
        public IEnumerable<RobotsOrders> robotOrderInfo { get; set; }
        public IEnumerable<Robots> robotInfo { get; set; }

        public decimal total { get; set; }

        public decimal subTotal { get; set; }
    }
}
