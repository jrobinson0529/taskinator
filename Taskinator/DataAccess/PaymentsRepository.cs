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

        internal IEnumerable<Payments> GetPaymentOptionsByAccount(Guid accountNumber)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Payments
                        WHERE accountNumber = @accountNumber";
            var payments = db.Query<Payments>(sql, new { accountNumber });
            return payments;
        }

        internal Payments GetPayment(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM PAYMENTS
                        WHERE id = @id";
            var payment = db.QuerySingleOrDefault<Payments>(sql, new { id });
            return payment;
        }

        internal Payments Add(Payments payment, Guid userId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @$"INSERT INTO Payments(accountNumber, paymentType)
                        OUTPUT INSERTED.id
                        VALUES('{userId}', @paymentType)";
            var id = db.ExecuteScalar<Guid>(sql, payment);
            payment.Id = id;
            return payment;
        }

        internal object Delete(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM Payments
                        OUTPUT DELETED.*
                        WHERE id = @id";
            var deletedPayment = db.QuerySingleOrDefault<Payments>(sql, new { id });
            return deletedPayment;
        }
    }
}