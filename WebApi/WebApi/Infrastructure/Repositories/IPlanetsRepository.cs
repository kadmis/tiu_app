using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;

namespace WebApi.Infrastructure.Repositories
{
  public interface IPlanetsRepository
  {
    Task<IEnumerable<Planet>> Get();
    Task<Planet> Get(int id);
    Task<int> Add(Planet planet);
    Planet Update(Planet planet);
    bool Delete(int id);
    void SaveChanges();
  }
}
