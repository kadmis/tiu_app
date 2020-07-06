using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;
using WebApi.Infrastructure.Filters;

namespace WebApi.Infrastructure.Repositories
{
  public class PlanetsRepository : IPlanetsRepository
  {
    private readonly ApplicationDbContext context;

    public PlanetsRepository(ApplicationDbContext context)
    {
      this.context = context;
    }

    public async Task<IEnumerable<Planet>> Get()
    {
      return await context.Planets.OrderBy(p=>p.PlanetNumber).ToListAsync();
    }

    public IQueryable<Planet> GetFiltered(PlanetFilter filters)
    {
      var planets = context.Planets.AsQueryable();
      if(!String.IsNullOrWhiteSpace(filters.PlanetName))
      {
        planets = planets.Where(p => p.Name.ToLower().Contains(filters.PlanetName.ToLower()));
      }
      if(filters.PlanetNumberFrom > 0 && (filters.PlanetNumberFrom < filters.PlanetNumberTo))
      {
        planets = planets.Where(p => p.PlanetNumber >= filters.PlanetNumberFrom);
      }
      if (filters.PlanetNumberTo > 0 && (filters.PlanetNumberTo > filters.PlanetNumberFrom))
      {
        planets = planets.Where(p => p.PlanetNumber <= filters.PlanetNumberTo);
      }

      switch(filters.OrderBy.ToLower())
      {
        case "name":
          planets = filters.Order=="asc" ? planets.OrderBy(p => p.Name) : planets.OrderByDescending(p => p.Name);
          break;
        case "planetnumber":
          planets = filters.Order=="asc" ? planets.OrderBy(p => p.PlanetNumber) : planets.OrderByDescending(p => p.PlanetNumber);
          break;
      }

      return planets;
    }

    public async Task<Planet> Get(int id)
    {
      return await context.Planets.FindAsync(id);
    }

    public async Task<int> Add(Planet planet)
    {
      await context.Planets.AddAsync(planet);
      SaveChanges();
      return planet.Id;
    }

    public Planet Update(Planet planet)
    {
      context.Planets.Update(planet);
      SaveChanges();
      return planet;
    }

    public bool Delete(int id)
    {
      var entityToRemove = context.Planets.Find(id);
      if (entityToRemove != null) 
      {
        context.Planets.Remove(entityToRemove);
        SaveChanges();
        return true;
      }  
      return false;
    }

    public void SaveChanges()
    {
      context.SaveChanges();
    }

    public async Task<int> GetTotalCount()
    {
      return await context.Planets.CountAsync();
    }

    public async Task<IEnumerable<Planet>> GetPaginated(IQueryable<Planet> planets, int pageSize, int pageNumber)
    {
      return await planets.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
    }
  }
}
