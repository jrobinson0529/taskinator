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

        public IEnumerable<Robots> GetAllUnavailable()
        {
            using var db = new SqlConnection(_connectionString);


            var sql = @"SELECT * FROM Robots
                        WHERE Robots.available = 0";
            var robots = db.Query<Robots>(sql);
            return robots;
        }

        internal IEnumerable<Robots> GetAllAlphabetically()
        {
            using var db = new SqlConnection(_connectionString);


            var sql = @"SELECT * FROM Robots
                        ORDER BY title;";
            var robots = db.Query<Robots>(sql);
            return robots;
        }

        internal Robots GetRobotById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Robots
                        WHERE id = @id";
            var robot = db.QuerySingleOrDefault<Robots>(sql, new { id });
            return robot;

        }

        internal IEnumerable<Robots> GetRandom()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT TOP 12 * FROM [Robots] ORDER BY newid();";
            var robots = db.Query<Robots>(sql);
            return robots;
        }

        internal IEnumerable<Robots> GetRobotsByCategoryId(Guid categoryId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Robots
                        WHERE categoryId = @categoryId";
            var robot = db.Query<Robots>(sql, new { categoryId });
            return robot;

        }

        internal object Update(Guid id, Robots RobotToUpdate)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @" UPDATE Robots
                        SET imageUrl = @imageUrl,
                        title = @title,
                        price = @price,
                        description = @description,
                        available = @available
                        OUTPUT INSERTED.*
                        WHERE id = @Id
                        ";

            RobotToUpdate.Id = id;
            var updatedRobot = db.QuerySingleOrDefault<Robots>(sql, RobotToUpdate);
            return updatedRobot;
        }

        internal Robots RemoveRobot(Guid id, Robots RobotToRemove)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @$" UPDATE Robots
                         SET imageUrl = null,
                         title = null,
                         price = null,
                         description = null,
                         available = null
                         OUTPUT INSERTED.*
                         WHERE id = @Id
                        ";

            RobotToRemove.Id = id;
            var updatedRobot = db.QuerySingleOrDefault<Robots>(sql, new { id });
            return updatedRobot;
        }

        internal Guid Add(Robots robot)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Robots(imageUrl, categoryId, title, price, description, available)
                        OUTPUT INSERTED.id
                        VALUES(@imageUrl, @categoryId, @title, @price, @description, @available)";
            var id = db.ExecuteScalar<Guid>(sql, robot);
            robot.Id = id;

            return id;

        }
    }
    
}
