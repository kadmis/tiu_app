using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Infrastructure.DTO;
using WebApi.Infrastructure.Entities;
using WebApi.Infrastructure.Repositories;

namespace WebApi.Infrastructure.Services
{
  public class PlanetsService : IPlanetsService
  {
    private readonly IPlanetsRepository repository;
    private readonly IMapper mapper;

    public PlanetsService(IPlanetsRepository repository, IMapper mapper)
    {
      this.repository = repository;
      this.mapper = mapper;
    }

    public async Task<int> AddPlanet(PlanetDTO planet)
    {
      return await repository.Add(mapper.Map<Planet>(planet));
    }

    public void DeletePlanet(int id)
    {
      repository.Delete(id);
    }

    public async Task<PlanetDTO> GetPlanet(int id)
    {
      return mapper.Map<PlanetDTO>(await repository.Get(id));
    }

    public async Task<IEnumerable<PlanetDTO>> GetPlanets()
    {
      return mapper.Map<IEnumerable<PlanetDTO>>(await repository.Get());
    }

    public PlanetDTO UpdatePlanet(PlanetDTO planet)
    {
      return mapper.Map<PlanetDTO>(repository.Update(mapper.Map<Planet>(planet)));
    }
  }
}
