using AuthApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Data
{
    public class UserRepository : IUserRepository
    {
        private UserDBContext _userDBContext;
        public UserRepository(UserDBContext userDBContext)
        {
            _userDBContext = userDBContext;
        }

        public User GetUser(string username)
        {
            try
            {
                return _userDBContext.Users.FirstOrDefault(x => x.Username != null && x.Username.Equals(username));
            }
            catch (Exception)
            {
                throw;
            }
        }

        public User RegisterUser(User user)
        {
            try
            {
                _userDBContext.Users.Add(user);
                _userDBContext.SaveChanges();
                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }   
        
        public bool IsUserAuthenticated(User user)
        {
            try
            {
                return _userDBContext.Users.Any(x => x.Username.Equals(user.Username) && x.Password.Equals(user.Password));
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
