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
    public class UsersRepository
    {
        readonly string _connectionString;
        public UsersRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("Taskinator");
        }

        internal IEnumerable<Users> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            // Here we are specifying to grab users where there is a username because 'deleted' users will have a null username
            var sql = @"SELECT * FROM Users
                        WHERE Users.username IS NOT NULL";
            var users = db.Query<Users>(sql);
            return users;
        }

        internal IEnumerable<Users> GetAllDeleted()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Users 
                        WHERE Users.username IS NULL";
            var users = db.Query<Users>(sql);
            return users;
        }
        internal Users GetUserById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Users
                        WHERE id = @id";
            var user = db.QuerySingleOrDefault<Users>(sql, new { id });
            return user;
                        
        }

        internal Guid Add(Users user)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Users(imageUrl, username, firstName, lastName, email, billingAddress, isAdmin)
                        OUTPUT INSERTED.id
                        VALUES(@imageUrl, @username, @firstName, @lastName, @email, @billingAddress, @isAdmin)";
            var id = db.ExecuteScalar<Guid>(sql, user);
            user.Id = id;

            return id;

        }

        internal object Update(Guid id, Users userToUpdate)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @" UPDATE Users
                         SET imageUrl = @ImageUrl,
                         username = @Username,
                         firstName = @FirstName,
                         lastName = @LastName,
                         email = @Email,
                         billingAddress = @BillingAddress,
                         isAdmin = @IsAdmin
                         OUTPUT INSERTED.*
                         WHERE id = @Id
                        ";

            userToUpdate.Id = id;
            var updatedUser = db.QuerySingleOrDefault<Users>(sql, userToUpdate);
            return updatedUser;
        }

        internal Users RemoveUser(Guid id, Users userToRemove)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @$" UPDATE Users
                         SET imageUrl = null,
                         username = null,
                         firstName = null,
                         lastName = null,
                         email = '{userToRemove.Email}',
                         billingAddress = null,
                         isAdmin = 0
                         OUTPUT INSERTED.*
                         WHERE id = @Id
                        ";

            userToRemove.Id = id;
            var updatedUser = db.QuerySingleOrDefault<Users>(sql, new { id });
            return updatedUser;
        }
    }
}
