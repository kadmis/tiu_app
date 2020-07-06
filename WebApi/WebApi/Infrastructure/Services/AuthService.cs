using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Entities;
using WebApi.Infrastructure.Helpers;

namespace WebApi.Infrastructure.Services
{
  public class AuthService : IAuthService
  {
    private readonly IUsersService usersService;
    private readonly SignInManager<ApplicationUser> signInManager;
    private readonly AppSettingsHelper helper;

    public AuthService(
      IUsersService usersService,
      SignInManager<ApplicationUser> signInManager,
      AppSettingsHelper helper)
    {
      this.usersService = usersService;
      this.signInManager = signInManager;
      this.helper = helper;
    }
    public async Task<AuthResult> Login(string username, string password)
    {
      var result = new AuthResult
      {
        Success = false
      };

      if(!String.IsNullOrWhiteSpace(username) && !String.IsNullOrWhiteSpace(password))
      {
        var user = await usersService.FindByUsername(username);
        if(user!=null)
        {
          var signInResult = await signInManager.PasswordSignInAsync(user, password, false, false);
          if(signInResult.Succeeded)
          {
            var userRolesNames = await usersService.GetUserRoleNames(user.Id);
            result.Success = true;
            result.Token = GenerateToken(user, userRolesNames);
            result.UserId = user.Id;
            result.Message = "";
            result.UserRoles = String.Join(",",userRolesNames);
          }
          else
            result.Message = "Hasło jest niepoprawne";
        }
        else 
          result.Message = "Użytkownik nie istnieje";
      }
      else
        result.Message = "Nazwa użytkownika i/lub hasło nie mogą być puste";

      return result;
    }

    private string GenerateToken(ApplicationUser user, IEnumerable<string> userRolesNames)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(helper.Secret);      

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
        }),
        Expires = DateTime.UtcNow.AddMinutes(15),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
        Audience = "localhost",
        Issuer = "localhost"
      };

      foreach(var roleName in userRolesNames)
      {
        tokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, roleName));
      }

      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}
