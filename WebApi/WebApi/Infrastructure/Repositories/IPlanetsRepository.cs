using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.Entities;
using WebApi.Infrastructure.Filters;

namespace WebApi.Infrastructure.Repositories
{
  public interface IPlanetsRepository
  {
    Task<IEnumerable<Planet>> Get();
    IQueryable<Planet> GetFiltered(PlanetFilter filters);
    Task<int> GetTotalCount();
    Task<IEnumerable<Planet>> GetPaginated(IQueryable<Planet> planets, int pageSize, int pageNumber);
    Task<Planet> Get(int id);
    Task<int> Add(Planet planet);
    Planet Update(Planet planet);
    bool Delete(int id);
    void SaveChanges();
  }
}
