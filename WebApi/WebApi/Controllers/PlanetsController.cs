using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Services;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PlanetsController : ControllerBase
  {
    private readonly IPlanetsService service;

    public PlanetsController(IPlanetsService service)
    {
      this.service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<PlanetDTO>> GetPlanets()
    {
      return await service.GetPlanets();
    }

    [HttpGet("{id}")]
    public async Task<PlanetDTO> GetPlanet(int id)
    {
      return await service.GetPlanet(id);
    }

    [HttpPost("add")]
    public async Task<int> AddPlanet([FromBody]PlanetDTO planet)
    {
      return await service.AddPlanet(planet);
    }

    [HttpPut("update")]
    public PlanetDTO UpdatePlanet([FromBody]PlanetDTO planet)
    {
      return service.UpdatePlanet(planet);
    }

    [HttpDelete("delete/{id}")]
    public void DeletePlanet(int id)
    {
      service.DeletePlanet(id);
    }
  }
}
