using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Data
{
    public class UserDBContext : DbContext, IUserDBContext
    {
        public DbSet<User> Users { get; set; }

        public UserDBContext(DbContextOptions<UserDBContext> options)
            : base(options)
        { }
    }
}
