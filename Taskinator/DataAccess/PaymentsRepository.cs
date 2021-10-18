using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Taskinator.Models;

namespace Taskinator.DataAccess
{
    public class PaymentsRepository
    {
        readonly string _connectionString;
        public PaymentsRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        internal IEnumerable<Payments> GetPayments(Guid accountNumber)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Payments
                        WHERE accountNumber = @accountNumber";
            var payments = db.Query<Payments>(sql, new { accountNumber });
            return payments;
        }

    }
}