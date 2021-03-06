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
    public class RobotsOrdersRepository
    {
        readonly string _connectionString;
        public RobotsOrdersRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        public IEnumerable<RobotsOrders> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT * FROM Robots_Orders";
            var robotsOrders = db.Query<RobotsOrders>(sql);
            
            return robotsOrders;
        }

        internal object GetBySingleRobotOrderId(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT * FROM Robots_Orders
                        WHERE id = @id";
            var robotsOrders = db.QuerySingleOrDefault<RobotsOrders>(sql, new { id });
            
            return robotsOrders;
        }

        internal object GetByOrderId(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"SELECT * FROM Robots_Orders
                        WHERE orderId = @id";
            var robotsOrders = db.Query<RobotsOrders>(sql, new { id });

            return robotsOrders;
        }

        internal void RemoveRobotOrder(Guid id)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"DELETE
                        FROM Robots_Orders 
                        WHERE Id = @id";
            db.Execute(sql, new { id });
        }

        internal Guid Add(RobotsOrders robotOrder)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO Robots_Orders (dayQuantity, robotId, orderId)
                        OUTPUT INSERTED.id
                        VALUES(@dayQuantity, @robotId, @orderId)";
            var id = db.ExecuteScalar<Guid>(sql, robotOrder);
            robotOrder.Id = id;

            return id;
        }

        internal object Update(Guid id, RobotsOrders robotOrderToUpdate)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @" UPDATE Robots_Orders
                         SET dayQuantity = @dayQuantity
                         OUTPUT INSERTED.*
                         WHERE id = @Id
                        ";
            robotOrderToUpdate.Id = id;
            var updatedRobotOrder = db.QuerySingleOrDefault<RobotsOrders>(sql, robotOrderToUpdate);
            
            return updatedRobotOrder;
        }
    }
}
