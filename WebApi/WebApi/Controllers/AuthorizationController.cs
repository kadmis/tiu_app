using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Services;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthorizationController : ControllerBase
  {
    private readonly IAuthService authService;

    public AuthorizationController(IAuthService authService)
    {
      this.authService = authService;
    }

    [HttpPost("login")]
    public async Task<AuthResult> Login(LoginDTO credentials)
    {
      return await authService.Login(credentials.Username, credentials.Password);
    }
  }
}
