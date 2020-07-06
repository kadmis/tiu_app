using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Services
{
  public interface IAuthService
  {
    Task<AuthResult> Login(string username, string password);
  }
}
