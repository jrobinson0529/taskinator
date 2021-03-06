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

        // Get all orders regardless of customer (maybe needed for admin)
        internal IEnumerable<Orders> GetAllOrders()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Orders";
            var orders = db.Query<Orders>(sql);
            return orders;
        }

        // Get all orders from a specific customer 
        internal IEnumerable<Orders> GetAllOrdersFromSpecificCustomer(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE customerId = @id AND orderDate is not null
                        ORDER BY orderDate DESC";
            var order = db.Query<Orders>(sql, new { id });
            return order;
        }

        //Get detailed order information from order id(add robots info in the future if necessary)
        internal object GetDetailedOrder(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders o
                        JOIN Users u
                        ON o.customerId = u.id
                        JOIN Payments p
                        ON o.paymentId = p.id
                        JOIN Robots_Orders ro
                        ON ro.orderId = o.id
                        JOIN Robots r
                        ON r.id = ro.robotId
                        WHERE o.id = @id";
            
            var results = db.Query<OrdersExtended, Users, Payments, RobotsOrders, Robots, OrdersExtended>(sql, (order, user, payment, robotOrder, robot) =>
            {
                order.customerInfo = user;
                order.paymentInfo = payment;
                order.robotOrder = robotOrder;
                order.robotsInformation = robot;
                order.total = robot.Price * robotOrder.DayQuantity;
                return order;
            }, new { id }, splitOn: "id");

            return results;
        }

        // calculate total
        internal object GetSubTotal(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sumSql = @"SELECT SUM(dayQuantity * price) AS total
                        from Robots_Orders ro
                        join Robots r
                        on ro.robotId = r.id
                        where ro.orderId = @id";
            var subTotal = db.QuerySingleOrDefault(sumSql, new { id });
            return subTotal;
        }

        internal object GetOrderExpanded(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders o
                        JOIN Users u
                        ON o.customerId = u.id
                        JOIN Payments p
                        ON o.paymentId = p.id
                        WHERE o.id = @id";
            var robotSql = @"SELECT *
                            FROM Robots_Orders ro
                            JOIN Robots r
                            ON r.id = ro.robotId
                            WHERE ro.orderId = @id";
            var order = db.QuerySingleOrDefault<OrdersExtended>(sql, new { id });
            order.customerInfo = db.QuerySingleOrDefault<Users>(sql, new { id });
            order.paymentInfo = db.QuerySingleOrDefault<Payments>(sql, new { id });
            order.robotOrderInfo = db.Query<RobotsOrders>(robotSql, new { id });
            order.robotInfo = db.Query<Robots>(robotSql, new { id });

            return order;
        }
        //Get a single order from order id
        internal IEnumerable<Orders> GetSingleOrderFromSpecificOrderId(Guid orderId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE id = @orderId";
            var order = db.Query<Orders>(sql, new { orderId });
            return order;
        }

        // Get cart item (order is not placed yet)
        internal Orders GetOrdersToPlaceOrderOrDelete(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT *
                        FROM Orders
                        WHERE orderDate is null AND customerId = @id";
            var order = db.QuerySingleOrDefault<Orders>(sql, new { id });
            return order;
        }

        // Place order (maybe when "place order" button is clicked)
        internal void Add(Orders order)
        {
            using var db = new SqlConnection(_connectionString);
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

        // Remove Order (only cart item can be removed)
        internal void RemoveCartItem(Guid orderId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE
                        FROM Orders
                        WHERE Id = @orderId AND orderDate is null";           

            db.Execute(sql, new { orderId });
        }

        // Update Order (only cart item can be updated)
        internal Orders Update(Guid id, Orders order)
        {
            using var db = new SqlConnection(_connectionString);
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
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Orders
                        SET CustomerId = @CustomerId,
                            PaymentId = @PaymentId,
                            OrderTotal = @OrderTotal,
                            OrderDate = GETUTCDATE()
                            OUTPUT inserted.*
                            WHERE Id = @Id AND orderDate is null";
            order.Id = id;
            var finalizedOrder = db.QuerySingleOrDefault<Orders>(sql, order);
            return finalizedOrder;
        }     
    }
}
