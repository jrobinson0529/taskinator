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
    }
}
