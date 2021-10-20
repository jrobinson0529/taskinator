using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class RobotsOrders
    {
        public Guid Id { get; set; }
        public Guid RobotId { get; set; }
        public Guid OrderId { get; set; }
        public short DayQuantity { get; set; }
    }
}
