using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class UsersExpanded : Users
    {
        public Orders order { get; set; }
        public IEnumerable<Payments> payments { get; set; }
    }
}
