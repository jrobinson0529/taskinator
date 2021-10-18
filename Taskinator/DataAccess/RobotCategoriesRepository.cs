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
    public class RobotCategoriesRepository
    {
        readonly string _connectionString;
        public RobotCategoriesRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        internal IEnumerable<RobotCategories> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Robot_Categories";
            var categories = db.Query<RobotCategories>(sql);
            return categories;
        }

        internal RobotCategories GetSingleCategory(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Robot_Categories
                        WHERE Robot_Categories.id = @id";
            var category = db.QuerySingleOrDefault<RobotCategories>(sql, new { id });
            return category;
        }
    }
}
