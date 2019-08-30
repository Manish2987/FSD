using AuthApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Data
{
    public interface IUserDBContext
    {
        DbSet<User> Users { get; set; }
    }
}