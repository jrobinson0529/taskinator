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
    }
}
