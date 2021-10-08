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
    }
}
