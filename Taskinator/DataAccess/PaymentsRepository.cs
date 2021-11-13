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

        // get all available enum
        internal object GetPaymentTypes()
        {
            var item = Enum.GetValues(typeof(PaymentType)).Cast<PaymentType>().ToList();
            return item;
        }

        // find payment with id and paymentType
        internal IEnumerable<Payments> FindPayment(Guid accountNumber, PaymentType paymentType)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"Select *
                        From Payments
                        where accountNumber = @accountNumber AND paymentType = @paymentType";
            var payment = db.Query<Payments>(sql, new { accountNumber, paymentType });
            return payment;
        }

        // trial add payment without id
        internal void AddPayment(Payments payment)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @$"INSERT INTO Payments(accountNumber, paymentType)
                        OUTPUT INSERTED.id
                        VALUES(@accountNumber, @paymentType)";
            var parameters = new
            {
                accountNumber = payment.AccountNumber,
                paymentType = payment.PaymentType
            };
            var id = db.ExecuteScalar<Guid>(sql, parameters);
            payment.Id = id;
        }
    }
}