using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Services
{
  public class UsersService : IUsersService
  {
    private readonly ApplicationDbContext context;

    public UsersService(ApplicationDbContext context)
    {
      this.context = context;
    }
    public async Task<ApplicationUser> FindByUsername(string username)
    {
      return await context.Users.FirstOrDefaultAsync(u => u.UserName.Equals(username));
    }

    public async Task<IEnumerable<string>> GetUserRoleNames(int userId)
    {
      var userRolesIds = context.UserRoles.Where(ur => ur.UserId == userId).Select(r => r.RoleId);
      var roles = context.Roles.Where(r => userRolesIds.Contains(r.Id)).Select(r=>r.Name);
      return await roles.ToListAsync();
    }
  }
}
