using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Filters;

namespace WebApi.Infrastructure.Services
{
  public interface IPlanetsService
  {
    Task<IEnumerable<PlanetDTO>> GetPlanets();
    Task<FilteringAndPagingResult> GetPlanetsFilteredPaginated(PlanetFilter filters);
    Task<PlanetDTO> GetPlanet(int id);
    Task<int> AddPlanet(PlanetDTO planet);
    PlanetDTO UpdatePlanet(PlanetDTO planet);
    bool DeletePlanet(int id);
  }
}
