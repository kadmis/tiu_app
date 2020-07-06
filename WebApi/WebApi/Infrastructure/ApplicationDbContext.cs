using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure
{
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
  {
    public DbSet<Planet> Planets { get; set; }
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Planet>()
        .HasKey(p => p.Id);
      modelBuilder.Entity<Planet>()
        .Property(p => p.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<Planet>().HasData(
        new Planet() { Id = 1, PlanetNumber = 3, Name = "Ziemia", Description = "Trzecia, licząc od Słońca, oraz piąta pod względem wielkości planeta Układu Słonecznego.", ImagePath = "assets/earth.jpg" },
        new Planet() { Id = 2, PlanetNumber = 2, Name = "Wenus", Description = "Druga pod względem odległości od Słońca planeta Układu Słonecznego.", ImagePath = "assets/venus.jpg" },
        new Planet() { Id = 3, PlanetNumber = 1, Name = "Merkury", Description = "Najmniejsza i najbliższa Słońca planeta Układu Słonecznego.",ImagePath = "assets/mercury.jpg" },
        new Planet() { Id = 4, PlanetNumber = 8, Name = "Neptun", Description = "Ósma, najdalsza od Słońca planeta w Układzie Słonecznym, czwarta pod względem średnicy i trzecia pod względem masy", ImagePath = "assets/neptune.jpg" },
        new Planet() { Id = 5, PlanetNumber = 4, Name = "Mars", Description = "Czwarta od Słońca planeta Układu Słonecznego.", ImagePath = "assets/mars.jpg" },
        new Planet() { Id = 6, PlanetNumber = 5, Name = "Jowisz", Description = "Piąta w kolejności od Słońca i największa planeta Układu Słonecznego", ImagePath = "assets/jupiter.jpg" },
        new Planet() { Id = 7, PlanetNumber = 6, Name = "Saturn", Description = "Szósta planeta Układu Słonecznego pod względem odległości od Słońca, druga po Jowiszu pod względem masy i wielkości", ImagePath = "assets/saturn.jpg" },
        new Planet() { Id = 8, PlanetNumber = 7, Name = "Uran", Description = "Siódma od Słońca planeta Układu Słonecznego, trzecia pod względem wielkości i czwarta pod względem masy.", ImagePath = "assets/uranus.jpg" }
      );

      modelBuilder.Entity<ApplicationRole>().HasData(
        new ApplicationRole { Id = 1, Name = "Casual", NormalizedName = "CASUAL"},
        new ApplicationRole { Id = 2, Name = "SuperUser", NormalizedName = "SUPERUSER" },
        new ApplicationRole { Id = 3, Name = "Admin", NormalizedName = "ADMIN"}
      );
    }
  }
}
