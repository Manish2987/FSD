using AuthApi.Entities;

namespace AuthApi.Services
{
    public interface IUserService
    {
        User GetUser(string username);
        User RegisterUser(User user);
        bool IsUserAuthenticated(User user);
    }
}