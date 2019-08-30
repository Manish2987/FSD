using AuthApi.Data;
using AuthApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AuthApi.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }        

        public User RegisterUser(User user)
        {
            return _userRepository.RegisterUser(user);
        }

        public User GetUser(string username)
        {
            return _userRepository.GetUser(username);
        }

        public bool IsUserAuthenticated(User user)
        {
            return _userRepository.IsUserAuthenticated(user);
        }
    }
}
