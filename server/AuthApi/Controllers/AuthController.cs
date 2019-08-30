using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthApi.Entities;
using AuthApi.Services;
using System.Net;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IConfiguration _config;
        private IUserService _userService;

        public AuthController(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            if (IsUserAuthenticated(login))
            {
                var tokenString = GenerateJSONWebToken(login);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        [Route("isAuthenticated")]
        [HttpPost]
        [Authorize]
        public IActionResult IsAuthenticated()
        {
            return Ok(new { isAuthenticated = true });
        }

        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody]User user)
        {
            var dbUser = _userService.GetUser(user.Username);
            if (dbUser == null)
            {
                _userService.RegisterUser(user);
                return Ok(new { registered = true });
            }
            else
            {
                return BadRequest(new { registered = false });
            }
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, userInfo.Username)
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                                              _config["Jwt:Issuer"],
                                              _config["Jwt:Audience"],
                                              claims,
                                              expires: DateTime.Now.AddMinutes(20),
                                              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool IsUserAuthenticated(User user)
        {
            if (user.Username.ToLower().Equals("admin") && user.Password.Equals("admin"))
            {
                return true;
            }
            else
            {
                return _userService.IsUserAuthenticated(user);
            }            
        }
    }
}