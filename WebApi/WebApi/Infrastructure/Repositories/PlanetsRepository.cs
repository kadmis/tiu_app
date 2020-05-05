using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Repositories
{
  public class PlanetsRepository : IPlanetsRepository
  {
    private readonly PlanetsContext context;

    public PlanetsRepository(PlanetsContext context)
    {
      this.context = context;
    }

    public async Task<IEnumerable<Planet>> Get()
    {
      return await context.Planets.ToListAsync();
    }

    public async Task<Planet> Get(int id)
    {
      return await context.Planets.FindAsync(id);
    }

    public async Task<int> Add(Planet planet)
    {
      await context.Planets.AddAsync(planet);
      return planet.Id;
    }

    public Planet Update(Planet planet)
    {
      context.Planets.Update(planet);
      return planet;
    }

    public void Delete(int id)
    {
      var entityToRemove = context.Planets.Find(id);
      if (entityToRemove != null)
          context.Planets.Remove(entityToRemove);
    }
  }
}
