using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;

namespace WebApi.Infrastructure.Services
{
  public interface IPlanetsService
  {
    Task<IEnumerable<PlanetDTO>> GetPlanets();
    Task<PlanetDTO> GetPlanet(int id);
    Task<int> AddPlanet(PlanetDTO planet);
    PlanetDTO UpdatePlanet(PlanetDTO planet);
    void DeletePlanet(int id);
  }
}
