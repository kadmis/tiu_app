using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure;
using WebApi.Infrastructure.Entities;

namespace WebApi.DbSeeder
{
  public static class AppDbSeeder
  {
    public static async Task SeedUsers(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
      if(await userManager.FindByEmailAsync("admin@adminowski.pl")==null)
      {
        var admin = new ApplicationUser()
        {
          UserName = "admin",
          Email = "admin@adminowski.pl"
        };

        var result = await userManager.CreateAsync(admin, "admin");

        if(result.Succeeded)
        {
          await userManager.AddToRoleAsync(admin, "Admin");
        }
      }

      if (await userManager.FindByEmailAsync("user@userowski.pl") == null)
      {
        var user = new ApplicationUser()
        {
          UserName = "user",
          Email = "user@userowski.pl"
        };

        var result = await userManager.CreateAsync(user, "user");

        if (result.Succeeded)
        {
          await userManager.AddToRoleAsync(user, "Casual");
        }
      }

      if (await userManager.FindByEmailAsync("superuser@superuserowski.pl") == null)
      {
        var superuser = new ApplicationUser()
        {
          UserName = "superuser",
          Email = "superuser@superuserowski.pl"
        };

        var result = await userManager.CreateAsync(superuser, "superuser");

        if (result.Succeeded)
        {
          await userManager.AddToRoleAsync(superuser, "Casual");
          await userManager.AddToRoleAsync(superuser, "SuperUser");
        }
      }
    }
  }
}
