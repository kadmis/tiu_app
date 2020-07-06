using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.DTO
{
  public class AuthResult
  {
    public string UserRoles { get; set; }
    public int UserId { get; set; }
    public string Token { get; set; }
    public bool Success { get; set; }
    public string Message { get; set; }
  }
}
