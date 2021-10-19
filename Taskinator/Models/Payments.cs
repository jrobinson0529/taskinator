using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Taskinator.Models
{
    public class Payments
    {
        public Guid Id { get; set; }
        public Guid AccountNumber { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PaymentType PaymentType { get; set; }
    }
    public enum PaymentType
    {
        PayPal,
        Visa,
        Mastercard,
        Amex,
        Venmo,
        GooglePay,
    }
}
