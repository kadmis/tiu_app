using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Services
{
  public interface IUsersService
  {
    Task<ApplicationUser> FindByUsername(string username);
    Task<IEnumerable<string>> GetUserRoleNames(int userId);
  }
}
