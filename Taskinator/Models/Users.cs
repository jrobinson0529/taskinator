using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class Users
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string BillingAddress { get; set; }
        public bool IsAdmin { get; set; }
    }
}
