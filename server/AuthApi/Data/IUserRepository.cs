using System.Collections.Generic;
using AuthApi.Entities;

namespace AuthApi.Data
{
    public interface IUserRepository
    {
        User GetUser(string username);
        User RegisterUser(User user);
        bool IsUserAuthenticated(User user);
    }
}