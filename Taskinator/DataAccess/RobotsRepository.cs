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
    public class RobotsRepository
    {
        readonly string _connectionString;
        public RobotsRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        public IEnumerable<Robots> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            
            var sql = @"SELECT * FROM Robots
                        WHERE Robots.available = 1";
            var robots = db.Query<Robots>(sql);
            return robots;
        }
    }
    
}
