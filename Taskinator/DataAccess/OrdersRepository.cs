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
    public class OrdersRepository
    {
        readonly string _connectionString;
        public OrdersRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        // Get all orders regardless of customer
        internal IEnumerable<Orders> GetAllOrders()
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Orders";
            var orders = db.Query<Orders>(sql);
            return orders;
        }

        // Get all orders from a specific customer
        internal IEnumerable<Orders> GetAllOrdersFromSpecificCustomer(Guid id)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE customerId = @id";
            var order = db.Query<Orders>(sql, new { id });
            return order;
        }

        // Get a single order from order id
        internal IEnumerable<Orders> GetSingleOrderFromSpecificOrderId(Guid orderId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE id = @orderId";
            var order = db.Query<Orders>(sql, new { orderId });
            return order;
        }

        // Get cart item (get orders that are not placed)
        internal IEnumerable<Orders> GetOrdersToPlaceOrderOrDelete(Guid id)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE orderDate is null AND customerId = @id";
            var order = db.Query<Orders>(sql, new { id });
            return order;
        }

        // Post order (this is for cart item)
        internal void Add(Orders order)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Orders(customerId, paymentId, orderTotal)
                        OUTPUT INSERTED.Id
                        VALUES(@customerId, @paymentId, @orderTotal)";

            var parameters = new
            {
                customerId = order.CustomerId,
                paymentId = order.PaymentId,
                orderTotal = order.OrderTotal
            };

            var id = db.ExecuteScalar<Guid>(sql, parameters);

            order.Id = id;
        }

        // Remove Order (only the ones in the cart)
        internal void RemoveCartItem(Guid orderId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Orders
                        WHERE Id = @orderId AND orderDate is null";           

            db.Execute(sql, new { orderId });

        }

        // Update Order 
        internal Orders Update(Guid id, Orders order)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Orders
                        SET CustomerId = @CustomerId, 
                             PaymentId = @PaymentId, 
                             OrderTotal = @OrderTotal
                             OUTPUT inserted.*
                             WHERE Id = @Id AND orderDate is null";
            order.Id = id;
            var updatedOrder = db.QuerySingleOrDefault<Orders>(sql, order);
            return updatedOrder;

        }


        // Finalize order (this is to add datetime to finalize the order)
        internal object FinalizeOrder(Guid id, Orders order)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Orders
                        SET CustomerId = @CustomerId,
                            PaymentId = @PaymentId,
                            OrderTotal = @OrderTotal,
                            DateTime = GETUTCDATE()
                            OUTPUT inserted.*
                            WHERE Id = @Id AND orderDate is null";
            order.Id = id;
            var finalizedOrder = db.QuerySingleOrDefault<Orders>(sql, order);
            return finalizedOrder;
        }

        

    }
}
